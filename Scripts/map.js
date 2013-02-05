

var Map = (function(){

 var mapOptions;
 var startLocation;

function Map(start) //settup Gmaps within the correct div - start co-ods
{	
	  mapOptions = new GMaps({
		div: '#map',
		disableDefaultUI: true,
		lat: start[0],
		lng: start[1],
		});
	 mapOptions.setZoom(17); // default 15 
};

 Map.prototype.route = function(path)
 {
   mapOptions.drawPolyline 
		({ 
			path: path ,
			strokeColor: '#131540',
			strokeOpacity: 0.6,
			strokeWeight: 4
		});
 };
 
 Map.prototype.center= function(lat, lon)
 {
   mapOptions.setCenter(lat, lon);
 };

 Map.prototype.sizeChange= function()
 {
   mapOptions.refresh();
 };
 
 
return Map;

}) ();

