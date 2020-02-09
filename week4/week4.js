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

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);
