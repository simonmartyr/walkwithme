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
	  var countSymbols = 0 ; //marker each 5% of the route. 
	  var fivePer = Math.round(route.length / Math.round(route.length * 0.02) );
	  for(var i = 0; i < route.length; i++){
		if(i + 1 != route.length){
	      var toDraw = [[route[i]["latitude"], route[i]["longitude"]],  [route[i +1]["latitude"], route[i+1]["longitude"]]];
		  draw(toDraw);
		 }
		 countSymbols++;
	  }
	  function draw(path){
	    if(countSymbols %  fivePer == 0){
			var lineSymbol = {
				path : google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
				strokeColor: '#B22222',
				 scale: 2,
				strokeOpacity:  1
			};
		}
		else
		{
		  var lineSymbol = ""; 
		}
		 mapOptions.drawPolyline 
		({ 
			path: path ,
			strokeColor: '#202BAD',
			strokeOpacity: 0.4, 
			icons: [{ 
				icon: lineSymbol,
				offset: '50%'
				}],
			click: function(e) { alert("click");}
		});
	  }
	  
	};
	
	 ExistingMap.prototype.sizeChange =  function() //change of resoultion fill up screen area. 
	{
    mapOptions.refresh();
	};
	

  return ExistingMap;
}) ();