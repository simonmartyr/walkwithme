
var Locator = (function(){

  var tracker; //geolocation
  var routeJSON = []; //whole route 
  var startLocation="";
  var snappy="";
  var watchId = null;  //contain the watch data inorder to stop. 
	var distance = 0;
   
   //constructor 
	function Locator() //check if geolocation enabled or use google. 
	{
      settupTracker();
	};
	
	
	function settupTracker () {
	  tracker = navigator.geolocation;	
		// try 
	  // {
		// if (typeof navigator.geolocation === 'undefined')
		  // tracker = navigator.geolocation;	
		// else 
		  // tracker = google.gears.factory.create('beta.geolocation'); 	
	  // } 
	  // catch(e) {}
	  if (!tracker) 
	  alert("Geolocation services are not supported by your web browser.");	
	  
	  return true;
	};

	Locator.prototype.snapLocation = function () //one time snap shot of location
	{ 
	    tracker.getCurrentPosition(function(position){
		   snappy = [position.coords.latitude, position.coords.longitude];
		});

	};
   
   Locator.prototype.getTracker = function()
   {
     return tracker;
   }
   
	Locator.prototype.getStart = function()
	{
	   if(snappy == "") {
	     return 1;
		}
	   return snappy; 
	};

	Locator.prototype.watchLocation = function () //will capture the users movement
	{ 
	    watchId = tracker.watchPosition(this.savePosition,  this.displayError, {enableHighAccuracy:true, timeout:10000, frequency: 15000, maximumAge:30000 });			
	};
	
	Locator.prototype.clearWatch = function() //stop the watch location. 
	{
	  if (watchId != null) {
		tracker.clearWatch(watchId);
		watchId = null;
		};
	};
	
	Locator.prototype.savePosition = function (position )   //data from geolocation saved
	{ 
	  if(position.coords.accuracy <= 200){
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
			 
			 distance(path);

		   
		}
		else{
			console.log("poor signal");
		}
	};
	
	function distance(path){ //constant calc of after each successful snapshots
		var R = 3958.7558657440545; // Radius of earth in Miles 
		var dLat = toRad(path[1][0]-path[0][0]);
		var dLon = toRad(path[1][1]-path[0][1]); 
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
							Math.cos(toRad(path[0][0])) * Math.cos(toRad(path[1][0])) * 
							Math.sin(dLon/2) * Math.sin(dLon/2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;
		distance = distance + d;
		console.log(distance);
			 
		function toRad(Value) {
			/** Converts numeric degrees to radians */
			return Value * Math.PI / 180;
		 }	
	}
	
	
	Locator.prototype.displayError = function(positionError) 
	{ //error handle
		alert("GPS related error.");
	};
	
	Locator.prototype.distance = function(first, second)
	{
	
    //Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
    
	}

	return Locator;
}) ();