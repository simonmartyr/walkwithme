
var Locator = (function(){

  var tracker; //geolocation
  var routeJSON = []; //whole route 
  var startLocation= "";
  var watchId = null;  //contain the watch data inorder to stop. 
	var distance = 0;
   
   //constructor 
	function Locator() //check if geolocation enabled or use google. 
	{
    tracker = navigator.geolocation;	
	  if (!tracker) 
	  alert("Geolocation services are not supported by your web browser.");	
	  
		snapLocation();
	  return true;
	};
	
	/*********General Position functions*************/
	
	Locator.prototype.watchLocation = function () //will capture the users movement
	{ 
	    watchId = tracker.watchPosition(savePosition,  displayError, {enableHighAccuracy:true, timeout:10000, frequency: 15000, maximumAge:30000 });			
	};
	
	Locator.prototype.clearWatch = function() //stop the watch location. 
	{
	  $("#signal").css("visibility", "hidden");
	  if (watchId != null) {
		tracker.clearWatch(watchId);
		watchId = null;
		};
	};
	
	/*********General functions*************/

	Locator.prototype.getStart = function()
	{
	   if(startLocation == "") {
	     return 1;
		}
	   return startLocation; 
	};
	
	Locator.prototype.getDistance = function()
	{
	   if(distance == 0) {
	     return 1;
		}
	   return distance; 
	};
	
	Locator.prototype.getRoute = function()
	{
	   if(routeJSON == []) {
	     return 1;
		}
	   return routeJSON; 
	};
	/*********General Private functions*************/
	
	function snapLocation() // find our user
	{
		 tracker.getCurrentPosition(function(position){
		   startLocation = [position.coords.latitude, position.coords.longitude];
		});
	};
	
	function savePosition(position)   //data from geolocation saved
	{ 
	  if(position.coords.accuracy  <= 200){
			$("#signal").attr("src", "Images/tick.png").css("visibility", "visible"); // display that gps is good
			var locationToSave = 
			{  
			"time"             : position.timestamp , 
			"latitude"      : position.coords.latitude ,
			"longitude"  : position.coords.longitude ,
			"heading"     : position.coords.heading,
			"speed"          : position.coords.speed
			};		
			routeJSON.push(locationToSave);
			
			map.center(position.coords.latitude, position.coords.longitude);
			var lastIndex = routeJSON.length - 1;
			if(lastIndex == 0){
				return;
			}
			var path = [[routeJSON[lastIndex - 1]["latitude"], routeJSON[lastIndex - 1]["longitude"]] , [routeJSON[lastIndex]["latitude"], routeJSON[lastIndex]["longitude"]]];
			map.route(path);
			calcDistance(path);		   
		}
		else{
			$("#signal").attr("src", "Images/gpssignal.gif").css("visibility", "visible"); // poor signal icon
		}
	};
	
	function displayError(positionError) 
	{ //error handle
		alert("GPS related error.");
	};
	
	function calcDistance(path){ //constant calc of after each successful snapshots
	//Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
		var R = 6371; // Radius of earth in Miles 
		var dLat = toRad(path[1][0]-path[0][0]);
		var dLon = toRad(path[1][1]-path[0][1]); 
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
							Math.cos(toRad(path[0][0])) * Math.cos(toRad(path[1][0])) * 
							Math.sin(dLon/2) * Math.sin(dLon/2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;
		distance = distance + d;
			 
		function toRad(Value) {
			/** Converts numeric degrees to radians */
			return Value * Math.PI / 180;
		 }	
	};

	return Locator;
}) ();