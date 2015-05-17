// Very simple model!
function run_conflict(){
  return true ;
  var attack  = 6 ;
  var defence = 6 ;
  return (Math.floor(Math.random()*(attack+defence)>defence)) ;
}

