/*
	settings walk with me script
	allow user customisation
	by Simon Martyr - 2012
	
	features:
	  ping rate - seconds
	  route ok for disabled?
	  Enable google controls
	  Zoom value
	  Rest - Pause
	  URL + Share
	  mode of transport
	  restart
 */
	 
 
 function startSettings() {
 
	if(typeof settingsContent === 'undefined'){ // we only want to Ajax once. 
    $.ajax({
		  url: "widgets/settings.html",
		  success: function(data){
			  settingsContent =  data; 
				settingBox();
		  }
		});
	}
	else
	{
	  settingBox();
	}
 }
 
 function settingBox() {
   if(typeof settingsContent !== 'undefined'){
     $("#message").html(settingsContent);
   }
 }
 
