

var Routes = (function(){ //object loading all routes and locating distance from user. 
  var allRoutes;
  var userLocation = [];
  var routesClose = [];
  var routesTenMiles = [];
  var routesFar = [];
  var database = new Firebase('https://walkwithme.firebaseio.com/routes/'); 
	
  function Routes()
  {
    calculateDistances ();
  };
  
  /*** get Route functions populate lists ****/
  Routes.prototype.getAllRoutes = function()
  {
		$(".menu > ul").html("");
		allRoutes = database.limit(20);
		allRoutes.on('child_added', function (snapshot) { //real time updating list. 
	    var content = snapshot.val();
			var start = content.start;
			var fromUser = [[start[0], start[1]], [userLocation [0], userLocation[1]]];
			fromUser = distanceCalculation(fromUser);
			$(".menu > ul").append("<li onclick='routes.getRoute(\""+content.name+"\")'> " +fromUser+" Miles aways "+content.name+" <span>></span></li>");
		});
  };
  
  Routes.prototype.getRoutesTen = function()
  {
    $(".menu > ul").html("");
	 if(routesTenMiles.length == 0){
			$(".menu > ul").html("nothing here"); //no routes
			return; 
		}
	 for(var i = 0; i < routesTenMiles.length; i++){
	   $(".menu > ul").append("<li onclick='routes.getRoute(\""+routesTenMiles[i].name+"\")'> Distance:"+covertToMiles(routesTenMiles[i].distance)+" Miles "+routesTenMiles[i].name+" <span>></span></li>");
		if(i  == 20){ //limit to 20
	   break;
	   }
	 }
  };
  
  Routes.prototype.getRoutesFar = function()
  {
    $(".menu > ul").html("");
	if(routesFar.length == 0){
			$(".menu > ul").html("nothing here"); //no routes
			return;
		}
     for(var i = 0; i < routesFar.length; i++){
	   $(".menu > ul").append("<li onclick='routes.getRoute(\""+routesFar[i].name+"\")'>"+routesFar[i].name+" Distance:"+covertToMiles(routesFar[i].distance)+" Miles<span>></span></li>");
		if(i == 20){ //limit to 20
	   break;
	   }
	}
  };
  
    Routes.prototype.getRoutesClose = function()
  {
		$(".menu > ul").html("");
		if(routesClose.length == 0){
			$(".menu > ul").html("nothing here");  //no routes
			return;
		}
		 for(var i = 0; i < routesClose.length ; i++){
		   $(".menu > ul").append("<li onclick='routes.getRoute(\""+routesClose[i].name+"\")'>"+routesClose[i].name+"  Distance:"+covertToMiles(routesClose[i].distance)+" Miles <span>></span></li>");
		   if(i == 20){ //limit to 20
			break;
		   }
		 }
  };
  /*** distance calulation ****/
   function calculateDistances ()
  {
		 tracker = navigator.geolocation;	
		 tracker.getCurrentPosition(function(position){
		    userLocation = [];
			userLocation.push(position.coords.latitude);
			userLocation.push(position.coords.longitude);
			allRoutes = database.limit(100);
			allRoutes.on('child_added', function(data){
				var content = data.val();
				var start = content.start;
				var fromUser = [[start[0], start[1]], [userLocation [0], userLocation[1]]];
				fromUser = distanceCalculation(fromUser);
				if(fromUser < 10)
				{
					routesClose.push(content);
				}
				else{
					if(fromUser < 25 && fromUser > 10)
					{
						routesTenMiles.push(content);
					}
					else
					{
					  routesFar.push(content);
					}
				}
			});
		});
  };
	
	Routes.prototype.getRoute = function(name)
	{
		var requestedRoute = new Firebase('https://walkwithme.firebaseio.com/routes/'+name+'/');
		requestedRoute.once('value', function(data){
			var selectedRoute = data.val();
			showRoute(selectedRoute);
		});
	};
  
  
  function distanceCalculation(path)
  {
    //constant calc of after each successful snapshots
	//Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
	var R = 6371; // Radius of earth in KM
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
	return d;
  };
  
  function covertToMiles(value){
		  value = value * 0.6214; 
		return value = Math.round(value * 10)/10;
	};
  
  return Routes;

}) ();
