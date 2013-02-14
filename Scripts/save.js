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
   var myDataReference = new  Firebase('https://walkwithme.firebaseio.com/'); 
   
      //constructor 
	function Save() //check if geolocation enabled or use google. 
	{
      
	};
	
	Save.prototype.saveRoute = function()
	{
	   var routesRef  = myDataReference.child("routes");
	 if(name != null && route != null && level != null && distance != null && start !=null){
		  name = name.replace(/[.|$|\[|\]|#|\/|]/g, ""); // remove horrible chars
		  var routeDB = routesRef.child(name);
		  routeDB.set({name : name, level : level, route : route, distance : distance, start : start}); 
		  name = null;  //user set
		  level = null; //user set
		  route = null; //locator
		  distance = null;  //locator
		  start = null; //locator
			close ();
			notify();
		  return true;
		  }
		  else
		  {
			return false;
		  }
	};
	
	Save.prototype.setRoute =  function(data)
	{
	  route = data;
	};
	
	Save.prototype.setName =  function(data)
	{
	  name = data;
	};
	
	Save.prototype.setLevel =  function(data)
	{
	  level = data; 
	};

	Save.prototype.setDistance =  function(data)
	{
	  distance = data; 
	};
	
	Save.prototype.setStart =  function(data)
	{
	  start = data; 
	};
	
	Save.prototype.getRoute =  function()
	{
		return  route;
	};
	
	Save.prototype.getName =  function()
	{
		return name;
	};
	
	Save.prototype.getLevel =  function()
	{
		return level;
	};
	
	Save.prototype.getDistance =  function()
	{
		return distance;
	};
	
	Save.prototype.getStart =  function()
	{
		return start;
	};

	return Save;
	
}) ();