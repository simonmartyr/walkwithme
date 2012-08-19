<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<title>Walk with me...</title>
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7; IE=EmulateIE9"> 
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<!--[if IE]>
	<link rel="stylesheet" type="text/css" href="CSS/WalkIe.css" />
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"><\/script>
<![endif]-->

<!--[if !IE]><!-->
	<script type="text/javascript">//what device are we on? 
		if(navigator.platform == 'iPad' || navigator.platform == 'iPhone') {
			document.write('<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"><\/script>\
							<script src="http://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.js"><\/script> ');
		}
		else {
			document.write('<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"><\/script>\
							<script src="Scripts/libWalk.js"><\/script>');
		}
		
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-34068362-1']);
		_gaq.push(['_trackPageview']);

		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>
<!--<![endif]-->
	<script type="text/javascript" src="https://raw.github.com/HPNeo/gmaps/master/gmaps.js"></script>
	<link href="CSS/Walk.css" rel="stylesheet" type="text/css"> 
	<link href="CSS/320_grid.css" media="screen and (min-width: 320px)" rel="stylesheet" type="text/css"> 
	<link href="CSS/320_grid.css" media="screen and (max-width: 320px)" rel="stylesheet" type="text/css"> 
	<link href="CSS/480_grid.css" media="screen and (min-width: 480px)" rel="stylesheet" type="text/css"> 
	<link href="CSS/720_grid.css" media="screen and (min-width: 720px)" rel="stylesheet" type="text/css"> 
	<link href="CSS/icons.css" rel="stylesheet" type="text/css">
	<link href="CSS/1236_grid.css" media="screen and (min-width: 1236px)" rel="stylesheet" type="text/css">
	<link rel="SHORTCUT ICON" href="Images/shoemod.ico">
</head>

<body>
		<div class="grid shadow">
			<div class="row">
			<div class="slot-0-1-2-3-4-5 title">
				 Walk With Me <img class="logo" src="Images/shoemod.png"/>
				<br/>
			</div>
			</div>
			<div class="row" id="change">
				<div class="slot-0">&nbsp;</div>
				<div class="slot-1-2-3-4-5">
					<div class="row">
						<div class="slot-1-2-3-4-5 info">
					What is Walk With Me?</br>
					A Mobile walking app, create walking routes on the fly and share with your friends!
					</div>
					</div>
					</div>	
					</div>
			
			<div class="row">
				<div class="slot-0-1-2">
				<div class="row">
					<div class="slot-0-1-2 create">
				<a  href="create.php" class="button"> <span class="icon-location-1"><span></a>
				</div>
				</div>
				</div>
				<div class="slot-3-4-5">
				<div class="row">
				<div class="slot-3-4-5 existing">
				<a   class="button"><span class="icon-road"><span></a>
				</div>
				</div>
				</div>
				<div class="clear"></div>
				
			</div>
		</div>
</body>
</html>