mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hsb2tzb21hbmkiLCJhIjoiY2s1NGpqczNwMGs0ajNucXZmd2JrZm8xMyJ9.gkbVhtrQBRhiOJrUf6ZO8g";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/shloksomani/ck7ga221a0n5k1ip6s7d5h1x4",
  center: [-79.45312, 43.7],
  zoom: 10
});

map.on("style.load", function() {
  //Normal add source code
  map.addSource("toronto_DAs", {
    type: "vector",
    url: "mapbox://shloksomani.9zis7841"
  });
  map.addLayer({
    id: "DA-layer",
    type: "fill",
    source: "toronto_DAs",
    "source-layer": "toronto_censusDA_income-5ylbhe",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["to-number", ["get", "medIncome"], 0], // get a number, but if provided with a non-number default to 0
        0,
        "#edf8fb",
        30000,
        "#b2e2e2",
        50000,
        "#66c2a4",
        70000,
        "#2ca25f",
        80000,
        "#006d2c"
      ],
      "fill-opacity": 0.8,
      "fill-outline-color": "black"
    }
  });
});

// FIRST ADD A POPUP OBJECT
var popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

// NEXT DEFINE WHEN YOU WANT THE POPUP TO HAPPEN
map.on("mousemove", "DA-layer", function(e) {
  popup.remove(); //If a popup already exists, get rid of it!

  //get the rendered features that belong to the provinces-fill layer
  var features = map.queryRenderedFeatures(e.point, {
    layers: ["DA-layer"]
  });
  //if there is a feature there, do the following
  if (features.length > 0) {
    console.log(features[0]); //print out the first element of the features array that was selected
    var feature = features[0]; //store the first element as 'feature'
    popup.setLngLat(e.lngLat); //place the popup window at the lng and lat where your click event happened
    //add stuff to the pop up:
    popup.setHTML(
      "<b>The median income here is: $</b>" +
        feature.properties.medIncome +
        "<br>"
    );
    popup.addTo(map); //finally add the pop up to the map
  }
  //if there are no features under the click, then print this in the web browser console
  else {
    console.log("no features from layer here...");
  }
});
