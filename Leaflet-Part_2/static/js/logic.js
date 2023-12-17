// Use the Mapbox token from the imported config file
let mapboxToken = apiKey;

// Creating the map object
let myMap = L.map("map",{
    center:[39.137,-115.143],
    zoom: 6
});


// Adding the tile layer
let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    accessToken: mapboxToken
}).addTo(myMap);

let grayscale = L.tileLayer('https://api.mapbox.com/styles/v1/{style}/tiles/{z}/{x}/{y}?access_token={access_token}', {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    style:    'mapbox/light-v11',
    access_token: mapboxToken
}).addTo(myMap);

let outdoors = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);

// Define an empty layer group for earthquake markers
let earthquakeLayer = L.layerGroup();
let tectonicLayer = L.layerGroup();
// Only one base layer can be shown at a time
let baseMaps = {
 //   "Street View": street,
    
    "Satellite View": satellite,
    "Grayscale": grayscale,
    "Outdoors": outdoors,
    "Topography View": topo,
};

// Overlays that can be toggled on or off
let overlayMaps = {
    "Earthquakes": earthquakeLayer, 
    "Tectonic Plates": tectonicLayer,
};

// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

// Store the API query variables
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let tectonicplatesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Define colors for depth levels
let getColor = depth => {
    return depth >= 90 ? "#FF3300" :
           depth >= 70 ? "#FF6600" :
           depth >= 50 ? "#FF9900" :
           depth >= 30 ? "#ffd739" :
           depth >= 10 ? "#dfd209" :
           markerColor= "#33bc08";
};

// Drawing the circles
function circle(point, latlng) {
    let mag = point.properties.mag;
    let depth = point.geometry.coordinates[2];
    return L.circle(latlng, {
            fillOpacity: 0.5,
            color: getColor(depth),
            fillColor: getColor(depth),
            // The size of the circle is based on magnitude of the earthquake
            radius: mag * 20000
    })
}

// Function to add tectonic plates to the map
function addTectonicPlates() {
    fetch(tectonicplatesUrl)
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: {
                    color: "#FFA500",
                    weight: 2
                }
            }).addTo(tectonicLayer); // Add tectonic plates to the tectonicLayer
        })
}
// Call the function to add tectonic plates to the map
addTectonicPlates();

// Define legend content
let legend = L.control({ position: "bottomright" });

legend.onAdd = () => {
    let div = L.DomUtil.create("div", "info legend");
    let depths = [-10, 10, 30, 50, 70, 90];

    for (let i = 0; i < depths.length; i++) {
        div.innerHTML +=
        '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' + depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }
    return div;
};

legend.addTo(myMap);

// Get the GeoJSON data with d3.
d3.json(url).then(data => {
    console.log(data);
    // Accessing features in GeoJSON
    data.features.forEach(feature => {
        let { geometry, properties } = feature;
        let { coordinates } = geometry;
        let { mag, place } = properties;
        let depth = coordinates[2];
        // Define marker options based on magnitude and depth
        let markerOptions = {
            radius: mag * 5, // Adjust radius based on magnitude
            fillColor: getColor(depth), // Adjust color based on depth
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        // Create a marker and bind a popup with earthquake information
        let marker = L.circleMarker([coordinates[1], coordinates[0]], markerOptions)
            .bindPopup(`<b>Location:</b> ${properties.place}<br><b>Magnitude:</b> ${mag}<br><b>Depth:</b> ${depth} km`);
        // Add the marker to the earthquakeLayer
        marker.addTo(earthquakeLayer);
    });

});

