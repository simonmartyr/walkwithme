/**********Globals*******************/
var locator, map;
var start;

 /**********Ready*******************/
 $(document).ready(function()
 {

 });
 
$(window).load(function() 
{
    locator = new Locator();
	createNew() ;
});
 
 
 /**********Binds**********************/
 
  $(document).on("click tap", ".settingsButton[type='settings']", function(e) 
 {
     $(".overlay").fadeIn(300, function() {
			 $(".overlay").css("visibility", "visible");
			 $(".settings").css("visibility", "visible");
			 startSettings();
			})
			e.preventDefault();
 });
 
  $(document).on("click tap", ".overlay , .settingsButton[type='close'] ", function(e) 
	{   
	  $(".overlay").fadeOut(200, function() {
			  $("#message").html("");
			  $(".overlay").css("visibility", "hidden");
			  $(".settings").css("visibility", "hidden");
			  startSettings();
			})
			e.preventDefault();
 });
 
 /**********Functions*******************/
function createNew() //Clear array start afresh
{ 
	map = new Map(locator.getTracker());
}

function getStart()
{
  return locator.getStart();
}

function toggle ()
{
  if ($(".toggle").text() == "Start"){
	  $(".toggle").text("Save"); 
	  locator.watchLocation();
	}
	else{
	  saveRoute();
	}
}

function saveRoute() // the JSON array will be commited to the database here
{ 
   locator.clearWatch() ;
  $(".toggle").text("Start");
}
