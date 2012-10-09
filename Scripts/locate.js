/*
	Location snapshot script
	by Simon Martyr - 2012
	
	key:
	coords.latitude
	coords.longitude
	.timestamp
 */
 
 /**********Global *******************/
 
 var routeJSON = [];
 var repeater;
 var repeaterTime = 30; // in seconds
 var locate;
 var map;
 var startLocation;
				

$(document).ready(function() 
{
	createNew();
});
 
 /********** Binds   ****************/
//$(document).on("click","#make",createNew()); //create route
//$(document).on("click","#snap",snapLocation());  //snapshot to current route
//$(document).on("click","#save",saveRoute());	//save current route

function createNew() //Clear array start afresh
{ 
  routeJSON = [];
  startLocation = "";
  settupLocator();
  snapLocation();
  mapSettup();
}
	
function mapSettup() //settup Gmaps within the correct div - start co-ods
{
  if(startLocation == "") {
    setTimeout(mapSettup, 50); //wait 50 millisecnds then recheck
    return;
  }
  map = new GMaps({
    div: '#map',
	disableDefaultUI: true,
    lat: startLocation[0],
    lng: startLocation[1],
    });
  map.addMarker({
    lat: startLocation[0],
    lng: startLocation[1]
    });
  map.setZoom(17); // default 15 
}

function toggle ()
{
  if ($(".toggle").text() == "start"){
	  $(".toggle").text("save"); 
	  snapRepeater();
	}
	else{
	  saveRoute();
	}
}

function settupLocator () //check if geolocation enabled or use google. 
{
  try 
  {
    if (typeof navigator.geolocation === 'undefined')
      locate = google.gears.factory.create('beta.geolocation'); 
    else 
      locate = navigator.geolocation;		
  } 
  catch(e) {}
  if (!locate) 
  alert("Geolocation services are not supported by your web browser.");	
}

function snapRepeater (repeaterTime) //start has been pressed
{
	snapLocation ();
  repeater = setTimeout('snapRepeater()' , 2000);
}
 
function snapLocation () //take the snapshot insert into array
{ 
  locate.getCurrentPosition(savePosition, displayError);			
}

function savePosition(position)   //take data Put in local json
{ 
  var locationToSave = 
  {  
    "time" : position.timestamp , 
    "latitude" : position.coords.latitude ,
    "longitude" : position.coords.longitude 
  };		
  if(startLocation  == "") //first time settup
  {
    startLocation = [position.coords.latitude, position.coords.longitude];
    routeJSON.push(locationToSave);
  }
  else
  {
	  map.setCenter(position.coords.latitude, position.coords.longitude)
    routeJSON.push(locationToSave);
    drawRoute();
  }
}

function drawRoute() // as we snapshot we draw
{
  var lastIndex = routeJSON.length - 1;
	var path = [[routeJSON[lastIndex - 1]["latitude"], routeJSON[lastIndex - 1]["longitude"]] , [routeJSON[lastIndex]["latitude"], routeJSON[lastIndex]["longitude"]]];
  map.drawPolyline //redraw
  ({ 
    path: path ,
		strokeColor: '#131540',
    strokeOpacity: 0.6,
    strokeWeight: 6
	});
	
}

function saveRoute() // the JSON array will be commited to the database here
{ 
  clearTimeout(repeater);
	$(".toggle").text("start");
}
 
function displayError(positionError) 
{ //error handle
  alert("Location failed to snapshot");
}