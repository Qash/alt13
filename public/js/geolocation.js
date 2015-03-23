var latPL1 = 45;
var longPL1 = 51;
var latPL2 = 78; 
var longPL2 = 83; 
var curLat = 0;
var curLong = 0;
var myLatlng;
var img_url;
function surveillePosition(position) {
    var infopos = "Position déterminée :\n";
    infopos += "Latitude : "+position.coords.latitude +"\n";
    infopos += "Longitude: "+position.coords.longitude+"\n";
    infopos += "Altitude : "+position.coords.altitude +"\n";
    infopos += "Vitesse  : "+position.coords.speed +"\n";
    console.log(infopos);
    linkPosTrack();
    latlon = position.coords.latitude+","+position.coords.longitude;
    myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    centreCarte=myLatlng;
    img_url = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=true";
    document.getElementById("map-canvas").innerHTML = "<img src='"+img_url+"'>";
}

var survId = navigator.geolocation.watchPosition(surveillePosition);
