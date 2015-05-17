var dirs = ['NW','N','NE','SW','S','SE'] ;

var key_codes = new Array() ;
key_codes['NW'] = [55,73,103] ;
key_codes[ 'N'] = [56,73,104] ;
key_codes['NE'] = [57,73,105] ;
key_codes['SW'] = [49,73, 97] ;
key_codes[ 'S'] = [50,73, 98] ;
key_codes['SE'] = [51,73, 99] ;
key_codes['compass'] = new Array() ;
key_codes['wait'  ] = [87] ;
key_codes['sentry'] = [83] ;
key_codes['pass'  ] = [32] ;

for(var id=0 ; id<dirs.length ; id++){
  for(var i=0 ; i<key_codes[dirs[id]] ; i++) key_codes['compass'].push(key_codes[dirs[id]][i]) ;
}

function match_keycode(keyDownID,category){
  for(var i=0 ; i<key_codes[category].length ; i++){
    if(keyDownID==key_codes[category][i]) return true ;
  }
  return false ;
}

function keyDown(evt){
  var keyDownID = window.event ? event.keyCode : (evt.keyCode != 0 ? evt.keyCode : evt.which) ;
  switch(keyDownID){
    case 224:
    case 82:
      break ;
    default:
      evt.preventDefault() ;
      break ;
  }
  var ab = [-999,-999] ;
  var unit = get_unit_by_uid(active_unit) ;
  var a_out = unit.a ;
  var b_out = unit.b ;
  if(active_unit!=0){
    var move = false ;
    for(var i_dir=0 ; i_dir<dirs.length ; i_dir++){
      for(var i=0 ; i<key_codes[dirs[i_dir]].length ; i++){
        if(keyDownID==key_codes[dirs[i_dir]][i]){
          ab = compass(dirs[i_dir],a_out,b_out) ;
          move = true ;
        }
      }
    }
    if(move) try_move_unit(active_unit,ab) ;
    if(match_keycode(keyDownID,'wait')){
      unit.wait() ;
      pick_next_unit() ;
    }
    if(match_keycode(keyDownID,'sentry')){
      unit.sentry() ;
      pick_next_unit() ;
    }
    if(match_keycode(keyDownID,'pass')){
      unit.pass() ;
      pick_next_unit() ;
    }
  }
}

function ab_from_mouse(evt){
  var X = evt.pageX - evt.target.offsetLeft ;
  var Y = evt.pageY - evt.target.offsetTop  ;
  var uv = uv_from_xy(X,Y) ;
  var ab = ab_from_uv(uv[0],uv[1]) ;
  return ab ;
}

function map_mouseDown(evt){
  // Is it a right click?
  var rightclick;
  if(!evt) var evt = window.event ;
  if(evt.which) rightclick = (evt.which==3) ;
  else if(evt.button) rightclick = (evt.button==2) ;
  
  var ab = ab_from_mouse(evt) ;
  
  if(rightclick){
    var h = hexagons[ab[0]][ab[1]] ;
    var X = evt.pageX - evt.target.offsetLeft ;
    var Y = evt.pageY - evt.target.offsetTop  ;
    var string = '' ;
    string = string + '(a,b) = ' + ab[0] + ',' + ab[1] ;
    string = string + '\n'
    string = string + '(x,y) = ' +X + ',' + Y ;
    string = string + '\n'
    string = string + 'units: ' + h.units.length + ' [' + h.units + ']' ;
    alert(string) ;
  }
  else{
    // Work out where the user has clicked
    tmp_gc['a'] = ab[0] ; tmp_gc['b'] = ab[1] ;
  }
  return ;
}

function map_mouseUp(evt){
  // Work out where the user has clicked
  var ab = ab_from_mouse(evt) ;
  var same_hexagon = (ab[0]==tmp_gc['a'] && ab[1]==tmp_gc['b']) ;
  var adjacent_hexagons = false ;
  
  var n = hexagons[ab[0]][ab[1]].adjacent_coords() ;
  for(var i=0 ; i<n.length ; i++){
    if(n[i][0]==tmp_gc['a'] && n[i][1]==tmp_gc['b']){
      adjacent_hexagons = true ;
      break ;
    }
  }
  if(same_hexagon==true){
    var h = hexagons[ab[0]][ab[1]] ;
    if(h.units.length!=0){
      var unit = get_unit_by_uid(h.units[0]) ;
      if(unit.player_index==1) active_unit = h.units[0] ;
    }
  }
  else if(adjacent_hexagons==true){
    // User has dragged from one hex to another
    // First check to see if movement is possible (land->land)
    var h_out = hexagons[tmp_gc['a']][tmp_gc['b']] ;
    var h_in  = hexagons[ab[0]][ab[1]] ;
    if(h_out.type!='grass' || h_in.type!='grass') return ;
    // Okay, we're definitely land to land now
    var units_in  = h_in.units  ;
    var units_out = h_out.units ;
    try_move_unit(units_out[0],ab) ;
  }
  else{
  }
}
