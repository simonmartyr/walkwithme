//main javascript for existing routes. 

//var locator = new ExistingLocator();
var routes;
var map;
var currentRoute;

/*** loads ****/

$(window).load(function() {
	  setupRoutes();
});


/*** Binds ****/


$(document).on("click tap", ".settingsButton[type='fullscreen']", function() //full screen toggle
	{
	  if ($(".settingsButton[type='fullscreen']").attr('full') != undefined){
		  $('#route , #change').removeAttr('style');
			$(".settingsButton[type='fullscreen'], .settingsButton[type='fullscreen'] > img ").removeAttr('style');
			$('#change').css('position' , 'relative');
			$(".settingsButton[type='fullscreen']").removeAttr('full');
			map.sizeChange();
		}
		else{
		  $("#route , #change").css({ 
			  position: 'absolute', 
				top: 0, 
				left: 0, 
				'z-index': 1000
				});
				
			$(".settingsButton[type='fullscreen']").attr('full', 1);
				
			$("#route , #change").animate({height: '100%', width: '100%'}, 500, function(){
		    map.sizeChange();
			  });
				
			$(".settingsButton[type='fullscreen'], .settingsButton[type='fullscreen'] > img").css({
				position: 'absolute',
				top: 0, 
				left: 0,
				'z-index': 1005});
		}	
	});



/*** functions ***/

 function setupRoutes(){
	routes = new Routes();
	if(window.location.hash) {
	  routes.getRoute(window.location.hash.replace("#", ""));
	}
 }
 
 function showRoute(route){
	currentRoute = route;
	$(".settingsButton[type='fullscreen']").css("visibility" , "visible");
	$(".settingsButton[type='link']").css("visibility" , "visible");
	var routeStart =[route.route[0]["latitude"] ,   route.route[0]["longitude"]];
	map = new  ExistingMap(routeStart);
	map.drawRoute(route.route);
 }
 
 	function reset() //back to start of exisiting without reload. 
	{
		currentRoute = null;
		$("#url").css("visibility", "hidden");
		$(".settingsButton[type='fullscreen']").css("visibility" , "hidden");
		$(".settingsButton[type='link']").css("visibility" , "hidden");
		$("#route").html('<ul><li onclick="routes.getRoutesClose()">Close by<span>></span></li>'
						+ '<li onclick="routes.getRoutesTen()">10+ miles away<span>></span></li>'
						+ '<li onclick="routes.getRoutesFar()">25+ miles away<span>></span></li>'
						+ '<li onclick="routes.getAllRoutes()">All<span>></span></li></ul>');
		 $("#route").removeAttr("style");
		 
	 }
	 
	 function makeLink()
	 {
		if(currentRoute != null){
			$("#url").css("visibility", "visible");
			$("#link").val(window.location.href + "#" + currentRoute.name);
		}
	 }
	 