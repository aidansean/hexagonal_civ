// Status:
// alive:   awaiting orders
// waiting: sent to the back to the queue, but still awaiting orders
// asleep:  exhausted its movement for this turn
// dead:    defeated or disbanded

var unit_uid_counter = 1 ;
var active_unit = 1 ;

var units = new Array() ;

function unit(a,b,species,player){
  this.a = a ;
  this.b = b ;
  this.species = species ;
  this.uid = unit_uid_counter ;
  this.attack   = 6 ;
  this.defence  = 6 ;
  this.movement = 3 ;
  this.moves_this_turn = this.movement ;
  unit_uid_counter++ ;
  this.player_index = player ;
  this.status = 'alive' ;
  var h = hexagons[a][b] ;
  if(h) h.add_unit(this.uid) ;
  this.draw = function(){
    var xy = xy_from_ab(this.a,this.b) ;
    context.beginPath() ;
    context.arc(xy[0], xy[1], unit_radius, 0, 2*Math.PI, true) ;
    context.fillStyle = (this.player_index==1) ? 'cyan' : 'yellow' ;
    context.fill() ;
  }
  this.can_traverse = function(type){
    if(type=='grass') return true ;
    return false ;
  }
  this.wait     = function(){ if(this.status=='alive' ) this.status = 'waiting' ; }
  this.pass     = function(){ if(this.status=='alive' ) this.status = 'asleep'  ; }
  this.sentry   = function(){ if(this.status=='alive' ) this.status = 'sentry'  ; }
  this.unsentry = function(){ if(this.status=='sentry') this.status = 'alive'   ; }
  this.wakeup   = function(){ if(this.status=='asleep') this.status = 'alive'   ; }
}

units.push(new unit(5,6,'militia',1)) ;
units.push(new unit(6,6,'militia',1)) ;
units.push(new unit(7,8,'militia',2)) ;

function place_units(){
  for(var i=0 ; i<units.length ; i++){
    hexagons[units[i].a][units[i].b].add_unit(units[i].uid) ;
  }
}

function get_unit_by_uid(uid){
  if(uid==0) return false ; // Save time when there is no active unit
  for(var i=0 ; i<units.length ; i++){
    if(units[i].uid==uid) return units[i] ;
  }
  return false ;
}
function kill_unit(uid){
  var unit = get_unit_by_uid(uid) ;
  unit.status = 'dead' ;
  var h = hexagons[unit.a][unit.b] ;
  h.remove_unit(uid) ;
}
function pick_next_unit(){
  var n_waiting = 0 ;
  for(var i=0 ; i<units.length ; i++){
    if(units[i].status=='waiting' && units[i].player_index==1) n_waiting++ ;
    if(units[i].status=='alive'   && units[i].player_index==1){
      active_unit = units[i].uid ;
      return true ;
    }
  }
  if(n_waiting>0){
    for(var i=0 ; i<units.length ; i++){
      if(units[i].status=='waiting' && units[i].player_index==1){
        units[i].status = 'alive' ;
      }
    }
    var result = pick_next_unit() ;
    if(result==true) return true ;
  }
  active_unit = 0 ;
  return false ;
}
