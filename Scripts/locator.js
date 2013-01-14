
var Locator = (function(){

  var tracker; //geolocation
  var routeJSON = []; //whole route 
  var startLocation="";
  var snappy="";
  var watchId = null;  //contain the watch data inorder to stop. 
   
   //constructor 
	function Locator() //check if geolocation enabled or use google. 
	{
      this.settupTracker();
	};
	
	Locator.prototype.settupTracker = function() {
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
		   this.savePosition(position);
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
	    watchId = tracker.watchPosition(this.savePosition,  this.displayError, {enableHighAccuracy:true, timeout:1000, frequency: 3000, maximumAge:30000 });			
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
		
	};
	
	
	
	Locator.prototype.displayError = function(positionError) 
	{ //error handle
		alert("GPS related error.");
	};
	
	return Locator;
}) ();