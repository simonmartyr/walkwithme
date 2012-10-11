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
   $.ajax({
		url: "Widgets/settings.html",
		success: function(data){
		  $("#message").html("hi");
		}
		});
 }
