function startSave() {
   $.ajax({
		url: "widgets/save.html",
		success: function(data){
		  $("#message").html(data);
		}
		});
		
 }

 
 var Save = (function(){
   var name = null;
   var level = null;
   var route = null;
   var distance = null;
   var start = null;
   
      //constructor 
	function Save() //check if geolocation enabled or use google. 
	{
      
	};
	
	Save.prototype.saveRoute = function()
	{
	 if(name != null && route != null && level != null && distance != null && start !=null){
		  myDataReference.set({name : name, level : level, route : route, distance : distance, start : start}); 
		  name = null;
		  level = null;
		  route = null;
		  distance = null;
		  start = null;
		  return true;
		  }
		  else
		  {
			return false;
		  }
	};
	
	Save.prototype.setRoute =  function(route)
	{
	  route = route;
	};
	
	Save.prototype.setName =  function(name)
	{
	  name = name;
	};
	
	Save.prototype.setLevel =  function(level)
	{
	  level = level; 
	};

	Save.prototype.setDistance =  function(distance)
	{
	  distance = distance; 
	};
	
	Save.prototype.setStart =  function(start)
	{
	  start = start; 
	};

	return Save;
	
}) ();