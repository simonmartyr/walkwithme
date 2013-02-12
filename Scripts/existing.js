//main javascript for existing routes. 

var locator = new ExistingLocator();
var routes;

$(window).load(function() 
 {
	setupRoutes();
 });
 
 function setupRoutes(){
	routes = new Routes(locator.getLocation());
 }
 
 function showRoute(route){
	$("#route").html("");
	var map = new ExistingMap(route.start);
 }