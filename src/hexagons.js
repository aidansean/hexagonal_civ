function hexagon(a,b,type='ocean'){
  this.a = a ;
  this.b = b ;
  this.city = 0 ;
  this.units = new Array() ;
  this.set_type = function(type){
    this.type = type ;
    switch(this.type){
      case 'ocean': this.color = 'blue'  ; break ;
      case 'grass': this.color = 'green' ; break ;
      default : this.color = 'gray' ; break ;
    }
  }
  this.set_type(type) ;
  this.draw = function(options, ctx=context, x0=0, y0=0){
    var color = this.color ;
    //if(this.units.length>0) color = 'purple' ;
    draw_hexagon_ab(this.a,this.b,options,color,x0,y0,ctx) ;
    if(this.units.length>0){
      var has_active_unit = false ;
      for(var i=0 ; i<this.units.length ; i++){
        if(this.units[i]==active_unit){
          has_active_unit = true ;
          break ;
        }
      }
      if(has_active_unit){
        var unit = get_unit_by_uid(active_unit) ;
        if(update_counter%2==0) unit.draw() ;
      }
      else{
        for(var i=0 ; i<this.units.length ; i++){
          var unit = get_unit_by_uid(this.units[i]) ;
          unit.draw() ;
        }
      }
    }
    //if(this.city!=0){
    //  var city = get_city_by_uid(this.city) ;
    //  city.draw() ;
    //}
  }
  this.adjacent_coords = function(){
    var results = new Array() ;
    // Both odd and even
    var a = this.a ;
    var b = this.b ;
    if(b>0     ) results.push([a,b-1]) ;
    if(b<nRow-1) results.push([a,b+1]) ;
    if(a%2==0){ // even
      if(b>0){
        if(a>0     ) results.push([a-1,b-1]) ;
        if(a<nCol-1) results.push([a+1,b-1]) ;
      }
      if(a>0   ) results.push([a-1,b]) ;
      if(a<nCol) results.push([a+1,b]) ;
    }
    else{ // odd
      if(a>0     ) results.push([a-1,b]) ;
      if(a<nCol-1) results.push([a+1,b]) ;
      if(b<nRow-1){
        if(a>0     ) results.push([a-1,b+1]) ;
        if(a<nCol-1) results.push([a+1,b+1]) ;
      }
    }
    return results ;
  }
  this.adjacent_coords2 = function(){
    var results = new Array() ;
    // Distance up to 2 away
    // Both odd and even
    var a = this.a ;
    var b = this.b ;
    if(b>0     ) results.push([a,b-1]) ;
    if(b<nRow-1) results.push([a,b+1]) ;
    if(b>1     ) results.push([a,b-2]) ;
    if(b<nRow-2) results.push([a,b+2]) ;
    
    if(a>1     ){
      results.push([a-2,b  ]) ;
      if(b>0     ) results.push([a-2,b-1]) ;
      if(b<nRow-1) results.push([a-2,b+1]) ;
    }
    if(a<nCol-2){
      results.push([a+2,b  ]) ;
      if(b>0     ) results.push([a+2,b-1]) ;
      if(b<nRow-1) results.push([a+2,b+1]) ;
    }
    if(a%2==0){ // even
      if(b>0){
        if(a>0     ) results.push([a-1,b-1]) ;
        if(a<nCol-1) results.push([a+1,b-1]) ;
      }
      if(a>0   ) results.push([a-1,b]) ;
      if(a<nCol) results.push([a+1,b]) ;
      if(b>1){
        if(a>0     ) results.push([a-1,b-2]) ;
        if(a<nCol-1) results.push([a+1,b-2]) ;
      }
      if(b<nRow-1){
        if(a>0     ) results.push([a-1,b+1]) ;
        if(a<nCol-1) results.push([a+1,b+1]) ;
      }
    }
    else{ // odd
      if(a>0     ) results.push([a-1,b]) ;
      if(a<nCol-1) results.push([a+1,b]) ;
      if(b<nRow-1){
        if(a>0     ) results.push([a-1,b+1]) ;
        if(a<nCol-1) results.push([a+1,b+1]) ;
      }
      if(b>1){
        if(a>0     ) results.push([a-1,b-1]) ;
        if(a<nCol-1) results.push([a+1,b-1]) ;
      }
      if(b<nRow-1){
        if(a>0     ) results.push([a-1,b+2]) ;
        if(a<nCol-1) results.push([a+1,b+2]) ;
      }
    }
    return results ;
  }
  this.add_unit = function(uid){
    for(var i=0 ; i<this.units.length ; i++){
      if(this.units[i]==uid) return false ;
    }
    this.units.push(uid) ;
    return true ;
  }
  this.remove_unit = function(uid){
    for(var i=0 ; i<this.units.length ; i++){
      if(this.units[i]==uid){
        this.units.splice(i,1) ;
        return false ;
      }
    }
    return false ;
  }
}

var hexagons = new Array() ;
for(var i=0 ; i<=nCol ; i++){
  hexagons[i] = new Array() ;
  for(var j=0 ; j<=nRow ; j++){
    var type = 'grass' ;
    if(i==0 || i==right || j==0 || j==bottom) type = 'ocean' ;
    hexagons[i].push(new hexagon(i,j,type)) ;
  }
}

function draw_hexagon_ab(a,b,options,color,x0=0,y0=0,ctx=context){
  var xy = xy_from_ab(a,b) ;
  draw_hexagon_xy(xy[0]-x0,xy[1]-y0,options,color,ctx) ;
}
function draw_hexagon_xy(x,y,options='',color='',ctx=context){
  ctx.beginPath() ;
  ctx.strokeStyle = '#aaaaaa' ;
  ctx.moveTo(x-h_w/2.0,y        ) ;
  ctx.lineTo(x-h_w/4.0,y+h_h/2.0) ;
  ctx.lineTo(x+h_w/4.0,y+h_h/2.0) ;
  ctx.lineTo(x+h_w/2.0,y        ) ;
  ctx.lineTo(x+h_w/4.0,y-h_h/2.0) ;
  ctx.lineTo(x-h_w/4.0,y-h_h/2.0) ;
  ctx.lineTo(x-h_w/2.0,y        ) ;
  if(options.contains('f')){
    ctx.fillStyle = 'white' ;
    if(color!='') ctx.fillStyle = color ;
    ctx.fill() ;
  }
  if(options.contains('s')) ctx.stroke() ;

  if(options.contains('p')){
    ctx.beginPath() ;
    ctx.moveTo(x-1,y) ;
    ctx.lineTo(x+1,y) ;
    ctx.stroke() ;

    ctx.beginPath() ;
    ctx.moveTo(x,y-1) ;
    ctx.lineTo(x,y+1) ;
    ctx.stroke() ;
  }
  if(options.contains('t')){
    var ab = ab_from_xy(x,y) ;
    ctx.strokeText(ab[0]+','+ab[1],x,y) ;
  }
}
function draw_hexagon_border_xy(x,y,options='',color='',sides=[1,1,1,1,1,1], ctx=context){
  ctx.beginPath() ;
  if(true){
    var r = 0.5*h_w-1.5 ;
    var t = -2*twopi/6 ;
    for(var i=0 ; i<6 ; i++){
      if(sides[i]==0) continue ;
      ctx.moveTo(x+r*cos(t+twopi*(i+0)/6),y+r*sin(t+twopi*(i+0)/6)) ;
      ctx.lineTo(x+r*cos(t+twopi*(i+1)/6),y+r*sin(t+twopi*(i+1)/6)) ;
    }
    ctx.lineWidth = 2 ;
    ctx.lineCap = 'round' ;
  }
  else{
    ctx.moveTo(x-h_w/2.0+2,y          ) ;
    ctx.lineTo(x-h_w/4.0+2,y+h_h/2.0-1) ;
    ctx.lineTo(x+h_w/4.0-2,y+h_h/2.0-1) ;
    ctx.lineTo(x+h_w/2.0-2,y          ) ;
    ctx.lineTo(x+h_w/4.0-2,y-h_h/2.0+1) ;
    ctx.lineTo(x-h_w/4.0+2,y-h_h/2.0+1) ;
    ctx.lineTo(x-h_w/2.0+2,y          ) ;
  }
  var c = ctx.strokeStyle ;
  ctx.strokeStyle = color ;
  ctx.stroke() ;
  ctx.strokeStyle = c ;
  ctx.lineWidth = 1 ;
}

function common_border(a1,b1,a2,b2){
  // If (a1,b1) share a border, return the border between them from the point of view of a1
  // Measure clockwise from the North
  // 1=N, 2=NE, 3=SE, 4=S, 5=SW, 6=NW
  // 0 = no common border
  if(a1==a2 && b2==b1-1) return 1 ;
  if(a1==a2 && b2==b1+1) return 4 ;
  if(a1%2==0){ // even
    if(a2==a1+1 && b2==b1-1) return 2 ;
    if(a2==a1+1 && b2==b1  ) return 3 ;
    if(a2==a1-1 && b2==b1  ) return 5 ;
    if(a2==a1-1 && b2==b1-1) return 6 ;
  }
  else if(a1%2==1){ // even
    if(a2==a1+1 && b2==b1  ) return 2 ;
    if(a2==a1+1 && b2==b1+1) return 3 ;
    if(a2==a1-1 && b2==b1+1) return 5 ;
    if(a2==a1-1 && b2==b1  ) return 6 ;
  }
  return 0 ;
}

function cos(x){ return Math.cos(x) ; }
function sin(x){ return Math.sin(x) ; }
