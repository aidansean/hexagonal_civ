// Coodinates
// xy are coorindates in the canvas
// ab are hexagon coordinates
// uv are coorindates on the map
// s_ux is the scale going from x to u
// ie DeltaU = s_ux*DeltaX
var u_0 = 0 ;
var v_0 = 0 ;
var s_ux = 1 ;
var s_vy = 1 ;
var s_ua = h_w ;
var s_vb = h_h ;
var u_0_city = 0 ;
var v_0_city = 0 ;

var gc      = new Array() ; // Global coordinates object
var old_gc  = new Array() ; // Previous global coordinates object
var next_gc = new Array() ; // Next global coordinates object
var tmp_gc  = new Array() ; // Temporary coordinates between mouseDown and mouseUp
gc['a'] = 5 ;
gc['b'] = 3 ;
tmp_gc['a'] = -999 ;
tmp_gc['b'] = -999 ;

function uv_from_xy(x,y){ return [u_0+s_ux*x  , v_0+s_vy*y ] ; }
function xy_from_uv(u,v){ return [(u-u_0)/s_ux,(v-v_0)/s_vy] ; }
function uv_from_ab(a,b){
  if(a%2==0){
    return [a*1.5*s_ua*0.5,b*s_vb] ;
  }
  else{
    return [s_ua*(0.75+1.5*(a-1)*0.5),s_vb*(b+0.5)] ;
  }
}
function xy_from_ab(a,b){
  var uv = uv_from_ab(a,b) ;
  return xy_from_uv(uv[0],uv[1]) ;
}
function ab_from_xy(x,y){
  var uv = uv_from_xy(x,y) ;
  return ab_from_uv(uv[0],uv[1]) ;
}
function ab_from_uv(u,v){
  // Find out which hexagons this point is between
  // Then choose the closest center
  // In case of ambiguity, move clockwise from North
  var a_even = 2*Math.floor(2*u/(3*s_ua)) ;
  var b_even = Math.floor(v/(s_vb)) ;

  var a_odd = 1+2*Math.floor(2*(u-0.75)/(3*s_ua)) ;
  var b_odd = Math.floor((v-0.5)/(s_vb)) ;

  var best_a  = 999 ;
  var best_b  = 999 ;
  var best_d2 = 1e6 ;
  for(var a=a_even-2 ; a<=a_even+2 ; a+=2){
    for(var b=b_even-1 ; b<=b_even+1 ; b++){
      var uv = uv_from_ab(a,b) ;
      var d2 = (uv[0]-u)*(uv[0]-u)+(uv[1]-v)*(uv[1]-v) ;
      if(d2<best_d2){
        best_d2 = d2 ;
        best_a = a ;
        best_b = b ;
      }
    }
  }
  for(var a=a_odd-2 ; a<=a_odd+2 ; a+=2){
    for(var b=b_odd-1 ; b<=b_odd+1 ; b++){
      var uv = uv_from_ab(a,b) ;
      var d2 = (uv[0]-u)*(uv[0]-u)+(uv[1]-v)*(uv[1]-v) ;
      if(d2<best_d2){
        best_d2 = d2 ;
        best_a = a ;
        best_b = b ;
      }
    }
  }
  return [best_a,best_b] ;
}

function  N(a,b){ return [a+0,b-1] ; }
function  S(a,b){ return [a+0,b+1] ; }
function NW(a,b){ return (a%2==0) ? [a-1,b-1] : [a-1,b+0] ; }
function NE(a,b){ return (a%2==0) ? [a+1,b-1] : [a+1,b+0] ; }
function SW(a,b){ return (a%2==0) ? [a-1,b+0] : [a-1,b+1] ; }
function SE(a,b){ return (a%2==0) ? [a+1,b+0] : [a+1,b+1] ; }
function compass(dir,a,b){
  if(dir=='NW') return NW(a,b) ;
  if(dir=='N' ) return  N(a,b) ;
  if(dir=='NE') return NE(a,b) ;
  if(dir=='SW') return SW(a,b) ;
  if(dir=='S' ) return  S(a,b) ;
  if(dir=='SE') return SE(a,b) ;
  return [a,b] ;
}