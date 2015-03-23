var latPL1 = 45;
var longPL1 = 51;
var latPL2 = 78; 
var longPL2 = 83; 
var curLat = 0;
var curLong = 0;
function surveillePosition(position) {
    var infopos = "Position déterminée :\n";
    infopos += "Latitude : "+position.coords.latitude +"\n";
    infopos += "Longitude: "+position.coords.longitude+"\n";
    infopos += "Altitude : "+position.coords.altitude +"\n";
    infopos += "Vitesse  : "+position.coords.speed +"\n";
    linkPosTrack();
}

var survId = navigator.geolocation.watchPosition(surveillePosition);
