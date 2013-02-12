// existing map drawer

var ExistingMap = (function(){
  var mapOptions;
  var startLocation;
  var options =  true;
	
  function ExistingMap (start)
	{
	  mapOptions = new GMaps({
		div: '#route',
		disableDefaultUI:  options,
		lat: start[0],
		lng: start[1],
		});
	  mapOptions.setZoom(17); // default 15 
	};

  return ExistingMap;
}();