function draw_all(){
  for(var i=0 ; i<nCol ; i++){
    for(var j=0 ; j<nRow ; j++){
      hexagons[i][j].draw('sf') ;
    }
  }
  for(var i=0 ; i<cities.length ; i++){
    cities[i].draw() ;
  }
}
