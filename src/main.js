var update_counter = 0 ;
var kill_heartbeat = 0 ;
var pi = Math.PI ;
var twopi = 2*pi ;

function heartbeat(){
  if(kill_heartbeat==true){
    kill_heartbeat = false ;
    return ;
  }
  if(active_unit){
    var unit = get_unit_by_uid(active_unit) ;
    var a = unit.a ;
    var b = unit.b ;
    var color = (update_counter%2==0) ? 'red' : 'black' ;
    draw_hexagon_ab(a,b,'sf',color) ;
  }
  update_counter++ ;
  draw_all() ;
  window.setTimeout(heartbeat,update_interval,false) ;
}

function next_turn(){
  for(var i=0 ; i<units.length ; i++){
    var unit = units[i] ;
    if(unit.player_index==1){
      if(unit.status=='asleep') unit.status = 'alive' ;
      unit.moves_this_turn = unit.movement ;
    }
  }
  pick_next_unit() ;
}
