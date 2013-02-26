//main javascript for existing routes. 

//var locator = new ExistingLocator();
var routes;
var map;
var currentRoute;

$(window).load(function() {
	  setupRoutes();
});

 function setupRoutes(){
	routes = new Routes();
	if(window.location.hash) {
	  routes.getRoute(window.location.hash.replace("#", ""));
	}
 }
 
 function showRoute(route){
	currentRoute = route;
	var routeStart =[route.route[0]["latitude"] ,   route.route[0]["longitude"]];
	map = new  ExistingMap(routeStart);
	map.drawRoute(route.route);
 }
 
 	function reset() //back to start of exisiting without reload. 
	{
		currentRoute = null;
		$("#url").css("visibility", "hidden");
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
	 