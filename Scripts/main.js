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
	 
	 //map full screen
	 $(document).on("click tap", ".settingsButton[type='fullscreen']", function()
	 {
	  if ($('#map').attr('style') != undefined){
		  $('#map , #change').removeAttr('style');
			$(".settingsButton[type='fullscreen'], .settingsButton[type='fullscreen'] > img ").removeAttr('style');
			$('#change').css('position' , 'relative');
			
			map.sizeChange();
		}
		else{
			$("#map , #change").css({ 
				position: 'absolute', 
				top: 0, 
				left: 0, 
				'z-index': 1000});
				
				$("#map , #change").animate({height: '100%', width: '100%'}, 500, function(){
				  map.sizeChange();
				 });
				
			$(".settingsButton[type='fullscreen'], .settingsButton[type='fullscreen'] > img").css({
				position: 'absolute',
				top: 0, 
				left: 0,
				'z-index': 1005});
			}
			
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
