var latPL1 = 45;
var longPL1 = 51;
var latPL2 = 78; 
var longPL2 = 83; 
var curLat = 0;
var curLong = 0;
var myPos;
var sallePos;
var img_url;

var centreCarte = new google.maps.LatLng(48.913912, 2.418886);
var maCarte; 
function initialisation(){
	var optionsCarte = {
		mapTypeControl : false,
		zoom: 15,
		center: centreCarte,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		streetViewControl: false,
		panControl : true
	};
	maCarte = new google.maps.Map(document.getElementById("map-canvas"), optionsCarte);
}
google.maps.event.addDomListener(window, 'load', initialisation);

function surveillePosition(position) {
	var infopos = "Position déterminée :\n";
	infopos += "Latitude : "+position.coords.latitude +"\n";
	infopos += "Longitude: "+position.coords.longitude+"\n";
	infopos += "Altitude : "+position.coords.altitude +"\n";
	infopos += "Vitesse  : "+position.coords.speed +"\n";
	console.log(infopos);
	myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	linkPosTrack(position.coords.latitude,position.coords.longitude);
	maCarte.panTo(sallePos);
}
var survId = navigator.geolocation.watchPosition(surveillePosition);
