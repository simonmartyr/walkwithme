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
	
	
	ExistingMap.prototype.drawRoute = function (route){
	  for(var i = 0; i < route.length; i++){
		if(i + 1 != route.length){
	      var toDraw = [[route[i]["latitude"], route[i]["longitude"]],  [route[i +1]["latitude"], route[i+1]["longitude"]]];
		  draw(toDraw);
		 }
	  }
	  function draw(path){
		 mapOptions.drawPolyline 
		({ 
			path: path ,
			strokeColor: '#131540',
			strokeOpacity: 0.6,
			strokeWeight: 4
		});
	  }
	};
	
	 ExistingMap.prototype.sizeChange =  function() //change of resoultion fill up screen area. 
	{
    mapOptions.refresh();
	};
	

  return ExistingMap;
}) ();