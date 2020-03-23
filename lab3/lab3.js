mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hsb2tzb21hbmkiLCJhIjoiY2s1NGpqczNwMGs0ajNucXZmd2JrZm8xMyJ9.gkbVhtrQBRhiOJrUf6ZO8g";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/shloksomani/ck7hyc1il1vqg1iphb7sbjtqv",
  center: [-79.39, 43.72],
  zoom: 11
});

var nav1 = new mapboxgl.NavigationControl();
map.addControl(nav1, "top-right");

var filterDay = [["to-number", ["get", "CVtJ54BL17Pv_data_COL3"]], 0];

console.log(filterDay);

map.on("style.load", function() {
  var layers = map.getStyle().layers;

  var previousInShapeType = "pitch-outline";

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
});

// FIRST ADD A POPUP OBJECT
var popup = new mapboxgl.Popup({
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

// NEXT DEFINE WHEN YOU WANT THE POPUP TO HAPPEN
map.on("mousedown", "DA-layer", function(e) {
  popup.remove(); //If a popup already exists, get rid of it!

  // let lButton = detectLeftButton(e);
  if (e.originalEvent.button != 0) {
    popup.remove();
    return 0;
  }

  //get the rendered features that belong to the provinces-fill layer
  var features = map.queryRenderedFeatures(e.point, {
    layers: ["DA-layer"]
  });

  var features1 = map.queryRenderedFeatures(e.point, {
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
    var feature = features[0]; //store the first element as 'feature'
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

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);

let bool = true;
let currentLegend;
let layer = 1;

const below = selctedFilter => {
  // console.log("here line 149");
  let bound1;
  let bound2;
  let layerFilterValue;
  let layerId;
  if (layer == 1) {
    layerId = "DA-layer";
    layerFilterValue = "CVtJ54BL17Pv_data_COL3";
    if (selctedFilter == 1) {
      bound1 = 0;
      bound2 = 423;
    } else if (selctedFilter == 2) {
      bound1 = 423;
      bound2 = 508;
    } else if (selctedFilter == 3) {
      bound1 = 508;
      bound2 = 609;
    } else if (selctedFilter == 4) {
      bound1 = 609;
      bound2 = 888;
    } else if (selctedFilter == 5) {
      bound1 = 888;
    }
  } else {
    layerId = "DA-income";
    layerFilterValue = "6pVtQBirMw_data_COL6";
    if (selctedFilter == 1) {
      bound1 = 50;
      bound2 = 355;
    } else if (selctedFilter == 2) {
      bound1 = 355;
      bound2 = 425;
    } else if (selctedFilter == 3) {
      bound1 = 425;
      bound2 = 510;
    } else if (selctedFilter == 4) {
      bound1 = 510;
      bound2 = 740;
    } else if (selctedFilter == 5) {
      bound1 = 740;
      bound2 = 7410;
    }
  }

  if (selctedFilter != currentLegend) {
    bool = true;
  } else {
    bool = false;
  }

  if (
    bool &&
    (selctedFilter != 5 || layer == 0) &&
    selctedFilter != currentLegend
  ) {
    currentLegend = selctedFilter;
    var filterHour1 = [">", ["to-number", ["get", layerFilterValue]], bound1];
    var filterHour2 = ["<", ["to-number", ["get", layerFilterValue]], bound2];

    map.setFilter(layerId, ["all", filterHour1, filterHour2]);
    bool = false;
  } else if (bool && selctedFilter == 5) {
    currentLegend = selctedFilter;
    var filterHour2 = [">", ["to-number", ["get", layerFilterValue]], bound1];

    map.setFilter(layerId, ["all", filterHour2]);
    bool = false;
  } else {
    var filterHour1 = [">", ["to-number", ["get", layerFilterValue]], 0];
    map.setFilter(layerId, ["all", filterHour1]);
    bool = true;
    currentLegend = 0;
  }
};

changeLegends = () => {
  let legendTitle = document.querySelector("#title-legend");

  let legend1 = document.getElementById("legend-1-div");
  let legend2 = document.getElementById("legend-2-div");
  let legend3 = document.getElementById("legend-3-div");
  let legend4 = document.getElementById("legend-4-div");
  let legend5 = document.getElementById("legend-5-div");

  let button1 = document.getElementById("legend-1");
  let button2 = document.getElementById("legend-2");
  let button3 = document.getElementById("legend-3");
  let button4 = document.getElementById("legend-4");
  let button5 = document.getElementById("legend-5");

  if (layer == 1) {
    map.setPaintProperty("DA-layer", "fill-opacity", 0);
    map.setPaintProperty("DA-income", "fill-opacity", 0.8);
    legendTitle.innerHTML = "Income <br>by Dissemination";
    legend1.innerHTML =
      '<span style="background-color: #feebe2" id="legend-1-div"></span>';
    // myNode.innerHTML = "";
    legend2.innerHTML =
      '<span style="background-color: #fbb4b9" id="legend-2-div"></span>';
    legend3.innerHTML =
      '<span style="background-color: #f768a1" id="legend-3-div"></span>';
    legend4.innerHTML =
      '<span style="background-color: #c51b8a" id="legend-4-div"></span>';
    legend5.innerHTML =
      '<span style="background-color: #7a0177" id="legend-5-div"></span>';

    button1.innerHTML = "50-355";
    button2.innerHTML = "355-425";
    button3.innerHTML = "435-510";
    button4.innerHTML = "510-740";
    button5.innerHTML = "740-7410";

    layer = 0;
  } else {
    map.setPaintProperty("DA-layer", "fill-opacity", 0.8);
    map.setPaintProperty("DA-income", "fill-opacity", 0);
    legendTitle.innerHTML = "Population <br>by Dissemination";
    legend1.innerHTML =
      '<span style="background-color: #ffffd4" id="legend-1-div"></span>';
    // myNode.innerHTML = "";
    legend2.innerHTML =
      '<span style="background-color: #fed98e" id="legend-2-div"></span>';
    legend3.innerHTML =
      '<span style="background-color: #fe9929" id="legend-3-div"></span>';
    legend4.innerHTML =
      '<span style="background-color: #d95f0e" id="legend-4-div"></span>';
    legend5.innerHTML =
      '<span style="background-color: #993404" id="legend-5-div"></span>';

    button1.innerHTML = "Below 423";
    button2.innerHTML = "423-508";
    button3.innerHTML = "508-609";
    button4.innerHTML = "609-888";
    button5.innerHTML = "Above 888";

    layer = 1;
  }
};
