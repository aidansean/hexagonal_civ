var city_uid_counter = 1 ;

function city(name, a, b, player_index, color){
  this.name = name ;
  this.a = a ;
  this.b = b ;
  this.player_index = player_index ;
  this.size = 1 ;
  this.uid = city_uid_counter ;
  this.color = color ;
  city_uid_counter++ ;
  var h = hexagons[a][b] ;
  h.city = this.uid
  this.population_rostser = new Array() ;
  // Order for population rosters:
  // 0: Raw
  // 1: After martial law
  // 2: 
  this.surrounding_hexagons = new Array() ;
  this.owned_hexagons = new Array() ;
  var adjacent_hexes = h.adjacent_coords2() ;
  for(var i=0 ; i<adjacent_hexes.length ; i++){
    this.surrounding_hexagons.push(adjacent_hexes[i]) ;
    var ab = adjacent_hexes[i] ;
    if(ab[0]==7 && ab[1]==8) continue ;
    var escape = false ;
    for(var j=0 ; j<cities.length ; j++){
      for(var k=0 ; k<cities[j].owned_hexagons.length ; k++){
        var ab2 = cities[j].owned_hexagons[k] ;
        if(ab2[0]==ab[0] && ab2[1]==ab[1]) escape = true ;
      }
    }
    if(escape) continue ;
    this.owned_hexagons.push(adjacent_hexes[i]) ;
  }
  adjacent_hexes = h.adjacent_coords2() ;
  for(var i=0 ; i<adjacent_hexes.length ; i++){
    var ab = adjacent_hexes[i] ;
    if(ab[0]==7 && ab[1]==8) continue ;
    var escape = false ;
    for(var j=0 ; j<cities.length ; j++){
      for(var k=0 ; k<cities[j].owned_hexagons.length ; k++){
        var ab2 = cities[j].owned_hexagons[k] ;
        if(ab2[0]==ab[0] && ab2[1]==ab[1]) escape = true ;
      }
    }
    if(escape) continue ;
    this.owned_hexagons.push(adjacent_hexes[i]) ;
  }
  
  this.draw = function(options='fsno'){
    draw_hexagon_ab(this.a,this.b,'fs',this.color) ;
    if(options.contains('o')){
      for(var i=0 ; i<this.owned_hexagons.length ; i++){
        var a1 = this.owned_hexagons[i][0] ;
        var b1 = this.owned_hexagons[i][1] ;
        var xy = xy_from_ab(a1,b1) ;
        
        // 1 = no common border, 0 = common border
        var common_sides = [1,1,1,1,1,1] ;
        for(var j=0 ; j<this.owned_hexagons.length ; j++){
          if(i==j) continue ;
          var a2 = this.owned_hexagons[j][0] ;
          var b2 = this.owned_hexagons[j][1] ;
          var border = common_border(a1,b1,a2,b2) ;
          if(border>0) common_sides[border-1] = 0 ;
        }
        var border = common_border(a1,b1,this.a,this.b) ;
        if(border>0) common_sides[border-1] = 0 ;
        //alert(a1+','+b1+' '+common_sides) ;
        draw_hexagon_border_xy(xy[0],xy[1],'',this.color, common_sides) ;
      }
    }
    if(options.contains('n')){
      var xy = xy_from_ab(this.a,this.b) ;
      context.textAlign = 'center' ;
      context.fillStyle = 'white' ;
      context.font = font_size + 'px arial' ;
      context.fillText(this.name, xy[0], xy[1]+0.75*h_h) ;
    }
  }
  this.assess_population = function(){
    
  }
  this.population_row = function(name, string, first_th=''){
    var tr ;
    var th ;
    var td ;
    tr = Create('tr') ;
    th = Create('th') ;
    th.innerHTML = first_th ;
    tr.appendChild(th) ;
    
    td = Create('td') ;
    td.innerHTML = name ;
    tr.appendChild(td) ;
    
    td = Create('td') ;
    td.className = 'city_currency' ;
    td.innerHTML = string ;
    tr.appendChild(td) ;
    
    return tr ;
  }
  this.make_DOM = function(){
    var div = Create('div') ;
    
    // Heading ;
    var h2  = Create('h2') ;
    h2.innerHTML = this.name ;
    div.appendChild(h2) ;
    
    // Population table
    var table = Create('table') ;
    var tbody = Create('tbody') ;
    tbody.appendChild(this.population_row('Raw'       , 'CCCCCUU', 'Population:')) ;
    tbody.appendChild(this.population_row('Luxuries'  , 'HHHCCUU')) ;
    tbody.appendChild(this.population_row('Marial law', 'HHHCCCU')) ;
    tbody.appendChild(this.population_row('Amenities' , 'HHHHCCC')) ;
    tbody.appendChild(this.population_row('Wonders'   , 'HHHHHHC')) ;
    table.appendChild(tbody) ;
    div.appendChild(table) ;
    
    // Local map
    var city_canvas  = Create('canvas') ;
    city_canvas.id = 'Crewe_canvas' ;
    city_canvas.width  = 250 ;
    city_canvas.height = 270 ;
    div.appendChild(city_canvas) ;
    var city_context = city_canvas.getContext('2d') ;
    u_0_city = this.a ;
    v_0_city = this.b ;
    
    var Dx = (this.a%2==0) ? (this.a/2)*(1.5*h_w) : ((this.a-1)/2)*(1.5*h_w)+h_w ;
    var Dy = (this.a%2==0) ? this.b*h_h      : (this.b+1/2)*h_h ;
    Dx = Dx - 2.3*h_w   ;
    Dy = Dy - 2.5*h_h ;
    for(var i=0 ; i<this.surrounding_hexagons.length ; i++){
      var ab = this.surrounding_hexagons[i] ;
      var h = hexagons[ab[0]][ab[1]] ;
      h.draw('fs',city_context,Dx,Dy) ;
    }
    
    // Append to city_view div
    var d = Get('city_view') ;
    while(d.firstChild){ d.removeChild(d.firstChild) ; }
    d.appendChild(div) ;
    
    return div ;
  }
}
var cities = new Array() ;
cities.push(new city('Crewe'   , 9, 8, 1, 'cyan') ) ;
cities.push(new city('Nantwich',12, 5, 1, 'cyan') ) ;
cities.push(new city('York'    ,14, 9, 1, 'cyan') ) ;
cities.push(new city('Bristol' , 7, 4, 1, 'pink') ) ;
cities.push(new city('London'  ,10, 1, 1, 'cyan') ) ;
cities.push(new city('Cardiff' , 5, 2, 1, 'cyan') ) ;

function get_city_by_uid(uid){
  for(var i=0 ; i<cities.length ; i++){
    if(cities[i].uid==uid) return cities[i] ;
  }
  return false ;
}
