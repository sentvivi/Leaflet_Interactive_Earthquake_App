// Creating the map object:
let myMap = L.map("map",{
    center:[34.137038113965005,-118.14342785109264],
    zoom: 8
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Store the API query variables.
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get the data with d3.
let data = d3.json(url).then(data => {
    console.log(data);
});