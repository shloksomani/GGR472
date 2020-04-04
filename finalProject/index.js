mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hsb2tzb21hbmkiLCJhIjoiY2s1NGpqczNwMGs0ajNucXZmd2JrZm8xMyJ9.gkbVhtrQBRhiOJrUf6ZO8g";
let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/shloksomani/ck7hyc1il1vqg1iphb7sbjtqv",
  center: [-79.39, 43.72],
  zoom: 11
});

let nav1 = new mapboxgl.NavigationControl();
map.addControl(nav1, "top-right");

let filterDay = [["to-number", ["get", "CVtJ54BL17Pv_data_COL3"]], 0];

console.log(filterDay);

map.on("style.load", function() {
  let layers = map.getStyle().layers;

  let previousInShapeType = "pitch-outline";

  // console.log(layers);

  //Normal add source code
  map.addSource("toronto_DAs", {
    type: "vector",
    url: "mapbox://shloksomani.hello-world-tiles"
    // generateId: true
  });

  map.addLayer(
    {
      id: "DA-layer",
      type: "fill",
      source: "toronto_DAs",
      layout: {},
      paint: {
        "fill-color": [
          "interpolate",
          ["linear"],
          ["to-number", ["get", "CVtJ54BL17Pv_data_COL3"], 0], // get a number, but if provided with a non-number default to 0
          0,
          "#ffffd4",
          423,
          "#fed98e",
          508,
          "#fe9929",
          609,
          "#d95f0e",
          888,
          "#993404"
        ],
        "fill-opacity": 0.8,
        "fill-outline-color": "black"
      },
      "source-layer": "hello_world"
    },
    previousInShapeType
  );

  map.addSource("toronto_income", {
    type: "vector",
    url: "mapbox://shloksomani.try-tiles"
    // generateId: true
  });

  map.addLayer(
    {
      id: "DA-income",
      type: "fill",
      source: "toronto_income",
      layout: {},
      paint: {
        "fill-color": [
          "interpolate",
          ["linear"],
          ["to-number", ["get", "CVtJ54BL17Pv_data_COL3"], 0], // get a number, but if provided with a non-number default to 0
          0,
          "#feebe2",
          423,
          "#fbb4b9",
          508,
          "#f768a1",
          609,
          "#c51b8a",
          888,
          "#7a0177"
        ],
        "fill-opacity": 0,
        "fill-outline-color": "black"
      },
      "source-layer": "hello_world"
    },
    previousInShapeType
  );

  map.addSource("supermarkets", {
    type: "vector",
    url: "mapbox://shloksomani.5ghlt0vu",
    generateId: true
  });

  map.addLayer({
    id: "supermarketIds",
    type: "circle",
    source: "supermarkets",
    layout: {
      visibility: "visible"
    },
    paint: {
      "circle-radius": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        ["interpolate", ["linear"], ["get", "mag"], 1, 10],
        5
      ],
      // The feature-state dependent circle-color expression will render
      // the color according to its magnitude when
      // a feature's hover state is set to true
      "circle-color": "#5395F9"
    },
    "source-layer": "supermarkets_shoppers-3ddt6h"
  });

  map.addSource("fastFood", {
    type: "vector",
    url: "mapbox://shloksomani.cc2kvvcx"
    // generateId: true
  });

  map.addLayer({
    id: "fastFoodIds",
    type: "circle",
    source: "fastFood",
    layout: {
      visibility: "visible"
    },
    paint: {
      "circle-radius": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        ["interpolate", ["linear"], ["get", "mag"], 1, 10],
        5
      ],
      "circle-color": "rgb(3, 252, 53)"
      // The feature-state dependent circle-color expression will render
      // the color according to its magnitude when
      // a feature's hover state is set to true
    },
    "source-layer": "fastfood-0hume6"
  });
});

// FIRST ADD A POPUP OBJECT
let popup = new mapboxgl.Popup({
  closeButton: true,
  closeOnClick: false
});

// if the mouse enters the province fill layer then do the following:
map.on("mouseenter", "DA-layer", function(e) {
  map.getCanvas().style.cursor = "crosshair"; //make the mouse cursor pointy
});
// if the mouse leaves the province fill layer then do the following:
map.on("mouseleave", "DA-layer", function(e) {
  map.getCanvas().style.cursor = "pointer"; //go back to the null cursor
});

map.on("mousedown", function(e) {
  popup.remove();
});
// NEXT DEFINE WHEN YOU WANT THE POPUP TO HAPPEN
map.on("click", "DA-layer", function(e) {
  popup.remove(); //If a popup already exists, get rid of it!

  // let lButton = detectLeftButton(e);
  if (e.originalEvent.button != 0) {
    popup.remove();
    return 0;
  }

  //get the rendered features that belong to the provinces-fill layer
  let features = map.queryRenderedFeatures(e.point, {
    layers: ["DA-layer"]
  });

  let features1 = map.queryRenderedFeatures(e.point, {
    layers: ["DA-income"]
  });

  // console.log(features[0].properties);

  // console.log(features1[0].properties["6pVtQBirMw_data_COL6"]);

  let area;
  let polygon;
  // console.log(features[0].geometry.coordinates[0].length);
  if (features[0].geometry.coordinates[0].length >= 4) {
    polygon = turf.polygon([features[0].geometry.coordinates[0]]);
    area = turf.area(polygon);
  } else {
    polygon = turf.multiPolygon([features[0].geometry.coordinates[0]]);
    area = turf.area(polygon);
  }

  console.log(area);

  //if there is a feature there, do the following
  if (features.length > 0) {
    // console.log(features[0]); //print out the first element of the features array that was selected
    let feature = features[0]; //store the first element as 'feature'
    popup.setLngLat(e.lngLat); //place the popup window at the lng and lat where your click event happened
    //add stuff to the pop up:
    popup.setHTML(
      "The <b> Dissemination </b>area id: " +
        features[0].properties.DAUID +
        "<br>" +
        "and the <b>area</b> is: " +
        "<b>" +
        area +
        "</b>" +
        "<br>" +
        "The Avg Income statistics for the population aged 15 years and over in private households in this area is: $" +
        "<b>" +
        features1[0].properties["6pVtQBirMw_data_COL6"] +
        "</b>" +
        "<br>" +
        "More information can be found here about the income and Dissemination area " +
        "<a href=https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1110023901&pickMembers%5B0%5D=1.1&pickMembers%5B1%5D=2.1&pickMembers%5B2%5D=3.1&pickMembers%5B3%5D=4.1 target=_blank>Link</a>"
    );
    popup.addTo(map); //finally add the pop up to the map
  } else {
    console.log("no features from layer here...");
  }
});

//

//

var marketID = null;

map.on("mousemove", "supermarketIds", function(e) {
  popup.remove(); //If a popup already exists, get rid of it!
  marketID = hover(
    e,
    "supermarkets",
    "supermarketIds",
    "supermarkets_shoppers-3ddt6h",
    marketID
  );
});

map.on("mouseleave", "supermarketIds", function(e) {
  if (marketID) {
    map.setFeatureState(
      {
        source: "supermarkets",
        sourceLayer: "supermarkets_shoppers-3ddt6h",
        id: marketID
      },
      {
        hover: false
      }
    );
    marketID = null;
  }
});
//

//
var ffId = null;

map.on("mousemove", "fastFoodIds", function(e) {
  popup.remove(); //If a popup already exists, get rid of it!
  ffId = hover(e, "fastFood", "fastFoodIds", "fastfood-0hume6", ffId);
});

map.on("mouseleave", "fastFoodIds", function(e) {
  if (ffId) {
    map.setFeatureState(
      {
        source: "fastFood",
        sourceLayer: "fastfood-0hume6",
        id: ffId
      },
      {
        hover: false
      }
    );
    ffId = null;
  }
});
//

let toggleableLayerIds = ["supermarketIds", "fastFoodIds"];

for (let i = 0; i < toggleableLayerIds.length; i++) {
  let id = toggleableLayerIds[i];
  var str = id;
  str = str.replace("Ids", "");
  let link = document.createElement("button");
  link.href = "#";
  link.className = "active";
  link.textContent = str;

  link.onclick = function(e) {
    let clickedLayer = this.textContent + "Ids";
    e.preventDefault();
    e.stopPropagation();

    let visibility = map.getLayoutProperty(clickedLayer, "visibility");

    if (visibility === "visible") {
      map.setLayoutProperty(clickedLayer, "visibility", "none");
      this.className = "";
    } else {
      this.className = "active";
      map.setLayoutProperty(clickedLayer, "visibility", "visible");
    }
  };

  let layers = document.getElementById("menu");
  layers.appendChild(link);
}

//

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);
