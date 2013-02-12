

var Routes = (function(){ //object loading all routes and locating distance from user. 
  var allRoutes = [];
  var userLocation;
  var routesClose;
  var routesTenMiles;
  var routesFar;
  var  database = new  Firebase('https://walkwithme.firebaseio.com/'); 
	
  function Routes(location)
  {
	userLocation = location;
  };
  
  Routes.prototype.getAllRoutes = function()
  {
  
  };
  
  Routes.prototype.getRoutesTen = function()
  {
  
  };
  
  Routes.prototype.getRoutesFar = function()
  {
  
  };
  
  Routes.prototype.calculateDistances = function()
  {
	allRoutes = database.child("routes");
	console.log(allRoutes);
  
  };
  
  
  function distanceCalculation(path)
  {
    //constant calc of after each successful snapshots
	//Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
	var R = 3958.7558657440545; // Radius of earth in Miles 
	var dLat = toRad(path[1][0]-path[0][0]);
	var dLon = toRad(path[1][1]-path[0][1]); 
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
					Math.cos(toRad(path[0][0])) * Math.cos(toRad(path[1][0])) * 
					Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	var d = covertToMiles(d);
			 
	function toRad(Value) {
	/** Converts numeric degrees to radians */
	  return Value * Math.PI / 180;
	}	
	
	function covertToMiles(value){
		return value * 0.62137; 
	}
	
	return d;
  };
  
  return Routes;

}) ();
