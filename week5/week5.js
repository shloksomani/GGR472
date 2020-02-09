mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hsb2tzb21hbmkiLCJhIjoiY2s1NGpqczNwMGs0ajNucXZmd2JrZm8xMyJ9.gkbVhtrQBRhiOJrUf6ZO8g";
var map = new mapboxgl.Map({
  container: "map", //container id in HTML
  style: "mapbox://styles/shloksomani/ck54pkl9u085r1cpf8yvy5cyc", //stylesheet location
  center: [-79.39, 43.72], // starting point, longitude/latitude
  zoom: 11 // starting zoom level
});

var nav1 = new mapboxgl.NavigationControl();
map.addControl(nav1, "top-right");

map.on("load", function() {
  //ADDING A SOURCE FROM A MAPBOX TILESET - DATA YOU UPLOADED TO MAPBOX STUDIO
  map.addSource("supermarket_data_vector", {
    type: "vector",
    url: "mapbox://shloksomani.ck629gkac0be12qp18cxazaai-7hddr"
  });
  map.addLayer({
    id: "supermarket_vector_layer",
    type: "circle",
    source: "supermarket_data_vector",
    layout: {},
    paint: {
      "circle-color": "red",
      "circle-radius": 10
    },
    "source-layer": "supermarkets" //get this from mapbox tileset page
  });
  //ADDING A GEOJSON SOURCE EXAMPLE
  map.addSource("supermarkets_data", {
    type: "geojson",
    data: "./supermarkets.geojson"
  });

  map.addLayer(
    {
      id: "supermarkets_layer",
      type: "circle",
      source: "supermarkets_data",
      layout: {},
      paint: {
        "circle-color": "blue",
        "circle-radius": 15
      }
    },
    "supermarket_vector_layer"
  ); // puts this layer behind the 'supermarket_vector_layer' on the map
});

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);
