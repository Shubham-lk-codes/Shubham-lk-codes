
const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const accuracy = position.coords.accuracy;

           
            
            // Send geolocation data to the server
            socket.emit('locationUpdate', {
                latitude: latitude,
                longitude: longitude,
                accuracy: accuracy
            });
        },
        function(error) {
            console.error('Error getting geolocation: ', error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
} else {
    console.error('Geolocation is not supported by this browser.');
}

var map = L.map("map").setView([0,0],13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:"it's my first backend project"
}).addTo(map);


const markers={};

socket.on("recive-location",(data)=>{
    const {id,latitude,longitude}=data;
    map.setView([latitude,longitude],16)
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude])
    }else{
        markers[id]=L.marker([latitude,longitude]).addTo(map)
    }
})
