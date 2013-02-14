/**********Globals*******************/
	var locator = new Locator();
	var map;
	var start;
	var save = new Save();
	
  //var myDataReference = new Firebase('https://walkwithme.firebaseio.com/'); 
		
 /**********Ready*******************/

   if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
		document.addEventListener("deviceready", createNew, false);
  }
  else{		
    $(window).load(function() 
	{	
			createNew() ;
	 });
	}
 
 
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
		map = new Map(locator.getStart());
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
	
	function notify() //display save message
	{
			$("#note").css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 4000);
	}

	function open (page)
	{
	 $(".overlay").fadeIn(300, function() {
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
				 $(".overlay").css("visibility", "visible");
				 $(".settings").css("visibility", "visible");
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
	
	function setValue(type)
	{
		if(type == "level")
		{
			$("#valueChange").css("visibility", "visible").html("<select  name='"+type+"'  onchange=updateValue('"+type+"')> <option >Choose One</option><option value='easy'>Easy</option><option value='medium'>Medium</option><option value='hard'>Hard</option></select>").focus();
		}
		else
		{
			$("#valueChange").css("visibility", "visible").html("<input type='text' name='"+ type + "' onchange=updateValue('"+type+"')>").focus();
		}
	}
	
	function updateValue(value)
	{
		switch(value){
			case "level":
				save.setLevel($("select[name='level']").val());
				$("#valueChange").html("Level Set!");
				$(".button:contains('Level')").addClass("done");
			break;
			case "title":
				save.setName($("input[name='title']").val());
				$("#valueChange").html("Title Set!");
				$(".button:contains('Name')").addClass("done");
			break;
			default:
			break;
		}
	}

	function saveRoute() // the JSON array will be commited to the database here
	{ 
		locator.clearWatch();
		$(".toggle").text("Start");
		open("save");
		save.setDistance(locator.getDistance());
		save.setRoute(locator.getRoute());
		save.setStart(locator.getStart());
	}
	

