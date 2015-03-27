var PL1=274156841;
var PL2=301775;
var PLdefault=1117340461;
var curPL=0;

function initPlayer(){
	DZ.init({
		appId  : '150381',
		channelUrl : 'http://developers.deezer.com/examples/channel.php',
		player : {
			onload : onPlayerLoaded
		}
	});
	$(document).ready(function(){
	$("#controlers input").attr('disabled', true);
	$("#slider_seek").click(function(evt,arg){
		var left = evt.offsetX;
		console.log(evt.offsetX, $(this).width(), evt.offsetX/$(this).width());
		DZ.player.seek((evt.offsetX/$(this).width()) * 100);
	});
});
}

function linkPosTrack(lat,long){
	// User's location
	var userGeoPoint =new Parse.GeoPoint(lat, long);
	// Create a query for places
	var query = new Parse.Query("Salles");
	// Interested in locations near user.
	query.withinKilometers("geoLoc",userGeoPoint,500);
	// Limit what could be a lot of points.
	query.limit(3);
	// Final list of objects
	query.find({
	  success: function(placesObjects) {
		console.log(placesObjects[1].get("name"));
		sallePos=new google.maps.LatLng(placesObjects[1].get("geoLoc").latitude,placesObjects[1].get("geoLoc").longitude);
	  }
	});
}

function playPause(){
	if (document.getElementById("boutonPlayPse").value=="\u25AE\u25AE") {
		DZ.player.pause();
		document.getElementById("boutonPlayPse").value="\u25BA";
	}
	else{
		DZ.player.play();
		document.getElementById("boutonPlayPse").value="\u25AE\u25AE";
	}
}
function toLowerVolume(){
	var curVol=DZ.player.getVolume();
	if (curVol>0)
		DZ.player.setVolume(curVol-2);
}

function toUpperVolume(){
	var curVol=DZ.player.getVolume();
	if (curVol<100)
		DZ.player.setVolume(curVol+2);
}



function event_listener_append() {
		var pre = document.getElementById('event_listener');
		var line = [];
		for (var i = 0; i < arguments.length; i++) {
			line.push(arguments[i]);
		}
		pre.innerHTML += line.join(' ') + "\n";
	}

function onPlayerLoaded() {
	$("#controlers input").attr('disabled', false);
	$("#boutonPlayPse").attr('disabled', true);
	DZ.Event.subscribe('current_track', function(arg){
			event_listener_append('current_track', arg.index, arg.track.title, arg.track.album.title);
		});
	DZ.Event.subscribe('player_position', function(arg){
		$("#slider_seek").find('.bar').css('width', (100*arg[0]/arg[1]) + '%');
	});
}