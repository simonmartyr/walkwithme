//existing locator less functions just to find user
var ExistingLocator  = (function(){
	var location; //user location
	var tracker; //geolocation
	function ExistingLocator ()
	{
	  tracker = navigator.geolocation;	
	  if (!tracker) 
	    alert("Geolocation services are not supported by your web browser.");	
		getLocation();
		return true;
	};
	
	ExistingLocator.prototype.getLocation = function()
	{
		return location;
	};
	
	function getLocation()
	{
      tracker.getCurrentPosition(function(position){
		  location = [position.coords.latitude, position.coords.longitude];
		},   function(){ alert("gps error") },   {enableHighAccuracy: true});
	};


	return ExistingLocator ;
}) ();