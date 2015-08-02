function are_adjacent(ab1,ab2){
  if(ab1[0]==ab2[0]){
    if(ab1[1]-1==ab2[1]) return true ;
    if(ab1[1]+1==ab2[1]) return true ;
    return false ;
  }
  if(ab1[0]%2==0 && ab2[0]%2==1){
    if(ab1[0]-1==ab2[0] && ab1[1]-1==ab2[1]) return true ;
    if(ab1[0]+1==ab2[0] && ab1[1]-1==ab2[1]) return true ;
    if(ab1[0]-1==ab2[0] && ab1[1]  ==ab2[1]) return true ;
    if(ab1[0]+1==ab2[0] && ab1[1]  ==ab2[1]) return true ;
    return false ;
  }
  else{
    if(ab1[0]-1==ab2[0] && ab1[1]  ==ab2[1]) return true ;
    if(ab1[0]+1==ab2[0] && ab1[1]  ==ab2[1]) return true ;
    if(ab1[0]-1==ab2[0] && ab1[1]+1==ab2[1]) return true ;
    if(ab1[0]+1==ab2[0] && ab1[1]+1==ab2[1]) return true ;
    return false ;
  }
  return false ;
}

function move_unit_to_ab(uid,ab){
  var unit = get_unit_by_uid(uid) ;
  var h_out = hexagons[unit.a][unit.b] ;
  var h_in  = hexagons[ab[0]][ab[1]] ;
  for(var i=0 ; i<h_out.units.length ; i++){
    if(h_out.units[i]==uid){
      h_out.units.splice(i,1) ;
      break ;
    }
  }
  h_in.units.push(uid) ;
  unit.a = ab[0] ;
  unit.b = ab[1] ;
  unit.moves_this_turn-- ;
  
  // Change update to make transition smoother
  if(update_counter%2==1) update_counter++ ;
  heartbeat() ;
  kill_heartbeat = true ; // Kill existing heartbeat
  
  if(unit.moves_this_turn<=0){
    unit.status = 'asleep' ;
    pick_next_unit() ;
  }
}

function try_move_unit(uid,ab){
  var unit = get_unit_by_uid(uid) ;
  if(unit.moves_this_turn<=0) return ;
  var h_in  = hexagons[ab[0]][ab[1]] ;
  
  var h_out = hexagons[unit.a][unit.b] ;
  var valid_terrain = false ;
  if(h_in.units.length==0 && unit.can_traverse(h_in.type)) valid_terrain = true ;
  if(valid_terrain){
    // This case is easy!
    move_unit_to_ab(uid,ab) ;
  }
  else{
    // Check to see if there's a friendly unit on the target
    if(h_in.units.length>0){
      var unit_in = get_unit_by_uid(h_in.units[0]) ;
      if(unit_in.player_index==1){
        move_unit_to_ab(uid,ab) ;
      }
      else{
        var success = run_conflict() ;
        if(success){
          // Destroy all enemy units
          for(var i=0 ; i<h_in.units.length ; i++){
            kill_unit(h_in.units[i]) ;
          }
          move_unit_to_ab(uid,ab) ;
        }
        else{
          kill_unit(uid) ;
          active_unit = 0 ;
          pick_next_unit() ;
        }
      }
    }
  }
}