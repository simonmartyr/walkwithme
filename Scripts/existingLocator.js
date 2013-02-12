//existing locator less functions just to find user
var ExistingLocator  = (function(){
	var location; //user location
	var tracker; //geolocation
	function ExistingLocator ()
	{
	  tracker = navigator.geolocation;	
	  if (!tracker) 
	    alert("Geolocation services are not supported by your web browser.");	
	};
	
	ExistingLocator.prototype.getLocation = function()
	{
		 tracker.getCurrentPosition(function(position){
		   var location = [position.coords.latitude, position.coords.longitude];
		});
		return location;
	};


	return ExistingLocator ;
}) ();