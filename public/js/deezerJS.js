var PL1=274156841;
var PL2=301775;
var PLdefault=1117340461;
var curPL=0;
var nextSongs = new Array();
var prevSongs = new Array();
var curSong;
var running=0;
var filters = new Array();
function initPlayer(){
	DZ.init({
		appId  : '150381',
		channelUrl : 'http://developers.deezer.com/examples/channel.php',
		player : {
			onload : onPlayerLoaded
		}
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
	query.limit(50);
	// Final list of objects
	query.find({
		success: function(placesObjects) {
			nextSongs=[];
			console.log(placesObjects);
			for (var i = 0; i < placesObjects.length; i++) {
				query=new Parse.Query("progAVenir");
				query.include('salle');
				query.equalTo("salle",placesObjects[i]);
				query.find({
					success: function(artistInPlace){
						for (var j = 0; j < artistInPlace.length; j++) {
							var pos = new google.maps.LatLng(artistInPlace[j].get('salle').get("geoLoc").latitude,artistInPlace[j].get('salle').get("geoLoc").longitude);
							addToQueue(artistInPlace[j].get('idart'),pos);
						}
					}
				})
			}
			
		}
	});
	
}

function playPause(){
	if(running)
		console.log("%cPlay %s", "color:orange; background:blue; font-size: 16pt",curSong.title);
}

function next(){
	if(curSong)
		prevSongs.unshift(curSong);
	if(nextSongs[0])
		curSong=nextSongs[0];
	nextSongs.shift();
	updateInfo();
	DZ.player.playTracks([curSong.id]);
	console.log("%cNEXT %s", "color:orange; background:blue; font-size: 16pt",curSong.title);
}

function prev(){
	nextSongs.unshift(curSong);
	curSong=prevSongs[0];
	sallePos=curSong.position;
	prevSongs.shift();
	updateInfo();
	DZ.player.playTracks([curSong.id]);
	console.log("%cPREV %s", "color:orange; background:blue; font-size: 16pt",curSong.title);
}

function onPlayerLoaded() {
	DZ.Event.subscribe('track_end', function(num, evt_name){
		next();
	});
}


function addToQueue(idartist,posSalle){
	DZ.api('/artist/'+idartist+'/top', function(json){

		for (var i = 0; i < json.data.length; i++) {
			for (var j = 0; j < json.data[i].contributors.length; j++) {
				delete json.data[i].contributors[j].share;
				json.data[i].position=posSalle;
			}
			if((!contain(json.data[i],nextSongs)&&!contain(json.data[i],prevSongs))&&!((JSON.stringify(curSong) === JSON.stringify(json.data[i]))))
				nextSongs.push(json.data[i]);
		}
	});
}

function contain(obj, list) {
	var i;
	for (i = 0; i < list.length; i++) {
		if (JSON.stringify(obj) === JSON.stringify(list[i])) {
			return true;
		}
	}

	return false;
}

function matchFilter(idAlbum){
	DZ.api('/album/'+idAlbum, function(json){
		var genres = json.genres.data;
	});
	for (var i = 0; i < filters.length; i++) {
		for (var j = 0; j < genres.length; j++) {
			if(genres[j]===filters[i]){
				return true;
			}
			else if(genres[j]=="Tout"){
				return true;
			}
		}
	}
	return false;
}


function updateInfo(){
	$("#artistName").text(curSong.artist.name);
	$("#trackName h2").text(curSong.title);
	sallePos=curSong.position;
}

function likeSong(){
	query=new Parse.Query("progAVenir");
	query.include('salle');
	query.equalTo("artist",curSong.artist.name);
	query.find({
		success: function(artistLike){
			var chanson=artistLike[0];
			currentUser.relation('favList').add(chanson);
			currentUser.save();
		}
	})
	
}

function toggleFilter(elt){
	if(elt.parentElement.className=="filter-on"){
		elt.parentElement.className="filter-off";
		filters.splice(filters.indexOf(elt.textContent),1);
	}
	else if(elt.parentElement.className=="filter-off"){
		elt.parentElement.className="filter-on";
		filters.push(elt.textContent);
	}
	
}