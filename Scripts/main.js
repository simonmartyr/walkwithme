/**********Globals*******************/
	var locator = new Locator();
	var map;
	var start;
	
    var myDataReference = new Firebase('https://walkwithme.firebaseio.com/');
 /**********Ready*******************/
  $(document).ready(function()
  {
		
   

  });
 
	$(window).load(function() 
	{	
		createNew() ;
	});
 
 
 /**********Binds**********************/
 
 $(document).on("click tap", ".settingsButton[type='settings']", function(e) 
 {
   open("settings");
	 e.preventDefault();
 });
 
  $(document).on("click tap", ".overlay , .settingsButton[type='close'] ", function(e) 
	{   
	  close();
		e.preventDefault();
  });
	 
	 //map full screen
	$(document).on("click tap", ".settingsButton[type='fullscreen']", function()
	{
	  if ($(".settingsButton[type='fullscreen']").attr('full') != undefined){
		  $('#map , #change').removeAttr('style');
			$(".settingsButton[type='fullscreen'], .settingsButton[type='fullscreen'] > img ").removeAttr('style');
			$('#change').css('position' , 'relative');
			$(".settingsButton[type='fullscreen']").removeAttr('full');
			map.sizeChange();
		}
		else{
		  $("#map , #change").css({ 
			  position: 'absolute', 
				top: 0, 
				left: 0, 
				'z-index': 1000
				});
				
			$(".settingsButton[type='fullscreen']").attr('full', 1);
				
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

	function open (page)
	{
	 $(".overlay").fadeIn(300, function() {
				 $(".overlay").css("visibility", "visible");
				 $(".settings").css("visibility", "visible");
				 switch(page)
				 {
					 case "save":
						startSave();
					 break;
					 case "settings":
						startSettings();
					 break;
					 default:
					 break;
				 }
				});
	}

	function close ()
	{
		$(".overlay").fadeOut(200, function() {
			$("#message").html("");
			$(".overlay").css("visibility", "hidden");
			$(".settings").css("visibility", "hidden");
			});
	}

	function saveRoute() // the JSON array will be commited to the database here
	{ 
		locator.clearWatch();
		$(".toggle").text("Start");
		open("save");
	}
