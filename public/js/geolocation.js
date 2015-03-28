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
	var styles = [
	{
		stylers: [
		{ hue: "#00ffe6" },
		{ saturation: -20 }
		]
	},{
		featureType: "road",
		elementType: "geometry",
		stylers: [
		{ lightness: 100 },
		{ visibility: "simplified" }
		]
	},{
		featureType: "road",
		elementType: "labels",
		stylers: [
		{ visibility: "off" }
		]
	}
	];

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
  	{name: "Styled Map"});

  var optionsCarte = {
  	mapTypeControl : false,
  	zoom: 18,
  	center: centreCarte,
  	mapTypeId: google.maps.MapTypeId.ROADMAP,
  	streetViewControl: false,
  	panControl : true,
  	mapTypeControlOptions: {
  		mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
  	}
  };

  maCarte = new google.maps.Map(document.getElementById("map-canvas"), optionsCarte);
  maCarte.mapTypes.set('map_style', styledMap);
  maCarte.setMapTypeId('map_style');

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
