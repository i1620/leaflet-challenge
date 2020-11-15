// Store API inside queryURL
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// GET request to queryURL
d3.json(queryURL,function(data) {
    createMap(data.features);
});

function createMap(earthquakeData) {

    // Loop through locatios and markers
    EarthquakeMarkers = earthquakeData.map((feature) =>
        L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            radius: magCheck(feature.properties.mag),
            stroke: true,
            color: 'black',
            opacity: 1,
            weight: 0.5,
            fill: true,
            fillColor: magColor(feature.properties.mag),
            fillOpacity: 0.9   
    })
            .bindPopup("<h1> Magnitude : " + feature.properties.mag +
                "</h1><hr><h3>" + feature.properties.place +
                "</h3><hr><p>" + new Date(feature.properties.time) + "</p>")
    )

    // Add earthquake layer
    var earthquakes = L.layerGroup(EarthquakeMarkers)

    var mags = earthquakeData.map((d) => magCheck(+d.properties.mag));
    console.log(d3.extent(mags));
    console.log(mags);

    // Streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    });

    // Create map
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [streetmap, earthquakes]
    });

    // Add legend to map
    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function (myMap) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML = [
            "<k class='maglt2'></k><span>0-2</span><br>",
            "<k class='maglt3'></k><span>2-3</span><br>",
            "<k class='maglt4'></k><span>3-4</span><br>",
            "<k class='maglt5'></k><span>4-5</span><br>",
            "<k class='maggt5'></k><span>5+</span><br>"
        ].join("");
        return div;
    }

    legend.addTo(myMap);
}

    function magColor(mag) {
        var color = "";
        if (mag <= 2) { color = "#916a8c"; }
        else if (mag <= 3) { color = "#f70f3d"; }
        else if (mag <= 4) { color = "#e67b02"; }
        else if (mag <= 5) { color = "#42a614"; }
        else { color = "#42a614"; }

        return color;
    };

    function magCheck(mag) {
        if (mag <= 1) {
            return 8
        }
        return mag * 8;
    }