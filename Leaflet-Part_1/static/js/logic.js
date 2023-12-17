// Creating the map object:
let myMap = L.map("map",{
    center:[39.137,-115.143],
    zoom: 6
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Store the API query variables.
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

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
            .bindPopup(`<b>Location:</b> ${properties.place}<br><b>Magnitude:</b> ${mag}<br><b>Depth:</b> ${depth} km`)
            .addTo(myMap);
    });

});

