

var Map = (function(){

 var mapOptions;
 var options =  true;

function Map() //settup Gmaps within the correct div - start co-ods
{	//make map object into div #maps
	tracker = navigator.geolocation;	
	 tracker.getCurrentPosition(function(position){
		  mapOptions = new GMaps({
			div: '#map',
			disableDefaultUI:  options,
			lat: position.coords.latitude,
			lng: position.coords.longitude,
			});
		 mapOptions.setZoom(17); // default 15 
	}, function() { alert("gps error") },   {enableHighAccuracy: true} ); //force gps
};

 Map.prototype.route = function(path) //draw route onto map
 {
   mapOptions.drawPolyline 
		({ 
			path: path ,
			strokeColor: '#131540',
			strokeOpacity: 0.6,
			strokeWeight: 4
		});
 };
 
 Map.prototype.center =  function(lat, lon) //bring focus of the map to this point
 {
    mapOptions.setCenter(lat, lon);
 };

 Map.prototype.sizeChange =  function() //change of resoultion fill up screen area. 
 {
    mapOptions.refresh();
 };
 
 Map.prototype.clearRoute = function() // clear the route being tracked 
 {
	mapOptions.removePolylines();
 };
 
 Map.prototype.zoom = function(zoom) //  set zoom amount int between  1 -20
 {
   mapOptions.setZoom(zoom);
};
 
 Map.prototype.options = function()
 {
	options = !options;
	mapOptions.setOptions({disableDefaultUI : options});
 }
 
return Map;

}) ();

