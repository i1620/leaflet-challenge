// Store API inside queryURL
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";


// GET request to queryURL
d3.json(queryURL,function(data) {
    createMap(data.features);
});

function createMap(earthquakeData) {

    // Loop through locatios and markers
    EarthquakeMarkers = earthquakeData.map((feature) =>
    L.circleMarker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]],{
        radius: magCheck(feature.properites.mag),
        stroke: true,
        color: 'blue',
        opacity: 1,
        weight: 0.5,
        fill: true,
        fillColor: magColor(feature.properites.mag),
        fillOpacity: 0.9
    })
    )
}





// // Creating map object
// var myMap = L.map("map", {
//     center: [40.7, -73.95],
//     zoom: 11
// });

// // Adding tile layer to the map
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
// }).addTo(myMap);

