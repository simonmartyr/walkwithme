

var Map = (function(){

 var mapOptions;

function Map(tracker) //settup Gmaps within the correct div - start co-ods
{
	tracker.getCurrentPosition(function(position){
		var startLocation    = [position.coords.latitude, position.coords.longitude];
		
	  mapOptions = new GMaps({
		div: '#map',
		disableDefaultUI: true,
		lat: startLocation[0],
		lng: startLocation[1],
		});
	  mapOptions.addMarker({
		lat: startLocation[0],
		lng: startLocation[1]
		});
	 mapOptions.setZoom(17); // default 15 
 
 });
};

 Map.prototype.route = function(path)
 {
   mapOptions.drawPolyline 
		({ 
			path: path ,
			strokeColor: '#131540',
			strokeOpacity: 0.6,
			strokeWeight: 6
		});
 };
 
 Map.prototype.center= function(lat, lon)
 {
   mapOptions.setCenter(lat, lon);
 };

return Map;

}) ();

