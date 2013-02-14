//main javascript for existing routes. 

var locator = new ExistingLocator();
var routes;
var map;

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
	document.addEventListener("deviceready", setupRoutes, false);
}
else{
	$(window).load(function() 
	 {
		setupRoutes();
	 });
 }
 function setupRoutes(){
	routes = new Routes(locator.getLocation());
	routes.calculateDistances();
 }
 
 function showRoute(route){
	map = new  ExistingMap(route.start);
	map.drawRoute(route.route);
 }
 
 	function reset() //back to start of exisiting without reload. 
	{
		$("#route").html('<ul><li onclick="routes.getRoutesClose()">Close by<span>></span></li>'
						+ '<li onclick="routes.getRoutesTen()">10+ miles away<span>></span></li>'
						+ '<li onclick="routes.getRoutesFar()">25+ miles away<span>></span></li>'
						+ '<li onclick="routes.getAllRoutes()">All<span>></span></li></ul>');
		 $("#route").removeAttr("style");
	 }