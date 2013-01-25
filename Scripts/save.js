function startSave() {
   $.ajax({
		url: "widgets/save.html",
		success: function(data){
		  $("#message").html(data);
		}
		});
		
 }
 
function save(type) {
	$("#saveChange").css("visibility", "visible").html("<input type='text' name='"+ type + "'>").focus();
} 