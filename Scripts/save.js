function startSave() {
   $.ajax({
		url: "widgets/save.html",
		success: function(data){
		  $("#message").html(data);
		}
		});
 }