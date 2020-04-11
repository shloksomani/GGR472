// mapbox token setup
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hsb2tzb21hbmkiLCJhIjoiY2s1NGpqczNwMGs0ajNucXZmd2JrZm8xMyJ9.gkbVhtrQBRhiOJrUf6ZO8g";
let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/shloksomani/ck7hyc1il1vqg1iphb7sbjtqv",
  center: [-79.39, 43.72],
  zoom: 11,
});

// navigation control
let nav1 = new mapboxgl.NavigationControl();
map.addControl(nav1, "top-right");

map.on("style.load", function () {
  // to add the layers at a specific position
  let previousInShapeType = "pitch-outline";

  //Median income
  map.addSource("medIncome", {
    type: "vector",
    url: "mapbox://shloksomani.5rot2sos",
  });

  map.addLayer(
    {
      id: "medIncomeLayer",
      type: "fill",
      source: "medIncome",
      layout: {},
      paint: {
        "fill-color": [
          "interpolate",
          ["linear"],
          ["to-number", ["get", "COL2"], 0],
          0,
          "#edf8fb",
          56640,
          "#b2e2e2",
          79616,
          "#66c2a4",
          115456,
          "#2ca25f",
          184661,
          "#006d2c",
        ],
        "fill-opacity": 0.8,
        "fill-outline-color": "black",
      },
      "source-layer": "median_income_final_zip-2i51ld",
    },
    previousInShapeType
  );
  //

  // Boundary file
  map.addSource("boundary", {
    type: "vector",
    url: "mapbox://shloksomani.ayvvc1bs",
  });

  map.addLayer({
    id: "boundarylayer",
    type: "line",
    source: "boundary",
    layout: {},
    paint: {
      "line-color": "red",
    },
    "source-layer": "Wardboundary-5r5wto",
  });

  // Rent

  map.addSource("medRent", {
    type: "vector",
    url: "mapbox://shloksomani.9nva7lsm",
  });

  map.addLayer(
    {
      id: "medRentLayer",
      type: "fill",
      source: "medRent",
      layout: {},
      paint: {
        "fill-color": [
          "interpolate",
          ["linear"],
          ["to-number", ["get", "COL1"], 0],
          0,
          "#feebe2",
          662.0,
          "#fbb4b9",
          1076.0,
          "#f768a1",
          1321.0,
          "#c51b8a",
          1649.0,
          "#7a0177",
        ],
        "fill-opacity": 0,
        "fill-outline-color": "black",
      },
      "source-layer": "correct_median_rent_final_zip-2v6oaj",
    },
    previousInShapeType
  );

  // Visible Minority Density

  map.addSource("visminDensity", {
    type: "vector",
    url: "mapbox://shloksomani.duz3tcag",
  });

  map.addLayer(
    {
      id: "visminLayer",
      type: "fill",
      source: "visminDensity",
      layout: {},
      paint: {
        "fill-color": [
          "interpolate",
          ["linear"],
          ["to-number", ["get", "vismin_den"], 0],
          0,
          "#ffffd4",
          2642,
          "#fed98e",
          6134,
          "#fe9929",
          13012,
          "#d95f0e",
          31667,
          "#993404",
        ],
        "fill-opacity": 0,
        "fill-outline-color": "black",
      },
      "source-layer": "visible_2016-4q1rw1",
    },
    previousInShapeType
  );

  // Population Density

  map.addSource("torontoDensity", {
    type: "vector",
    url: "mapbox://shloksomani.4jftxi3r",
  });

  map.addLayer(
    {
      id: "torontoDensityLayer",
      type: "fill",
      source: "torontoDensity",
      layout: {},
      paint: {
        "fill-color": [
          "interpolate",
          ["linear"],
          ["to-number", ["get", "density"], 0],
          0,
          "#ffffcc",
          2908,
          "#a1dab4",
          4586,
          "#41b6c4",
          6479,
          "#2c7fb8",
          9462,
          "#253494",
        ],
        "fill-opacity": 0,
        "fill-outline-color": "black",
      },
      "source-layer": "population_density_final2-84b8ty",
    },
    previousInShapeType
  );

  //supermarkets points
  map.addSource("supermarkets", {
    type: "geojson",
    data: supermarketgeojson,
    generateId: true,
    cluster: true, //use the cluster function available for geojson points
    clusterMaxZoom: 12,
    clusterRadius: 10,
  });

  map.addLayer({
    id: "supermarketIds",
    type: "circle",
    source: "supermarkets",
    layout: {
      visibility: "visible",
    },

    paint: {
      "circle-radius": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        ["interpolate", ["linear"], ["get", "mag"], 1, 10],
        4,
      ],
      "circle-color": "#FFD700",
    },
  });

  //

  //Fast Food points
  map.addSource("fastFood", {
    type: "geojson",
    data: fastfood,
    generateId: true,
    cluster: true, //use the cluster function available for geojson points
    clusterMaxZoom: 12,
    clusterRadius: 8,
  });

  map.addLayer({
    id: "fastFoodIds",
    type: "circle",
    source: "fastFood",
    layout: {
      visibility: "visible",
    },
    paint: {
      "circle-radius": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        ["interpolate", ["linear"], ["get", "mag"], 1, 10],

        4,
      ],
      "circle-color": "rgb(3, 252, 53)",
    },
  });
});

// Popups
let popup = new mapboxgl.Popup({
  closeButton: true,
  closeOnClick: false,
});

// if the mouse enters the province fill layer then do the following:
map.on("mouseenter", "medIncomeLayer", function (e) {
  map.getCanvas().style.cursor = "crosshair"; //make the mouse cursor pointy
});
// if the mouse leaves the province fill layer then do the following:
map.on("mouseleave", "medIncomeLayer", function (e) {
  map.getCanvas().style.cursor = "pointer"; //go back to the null cursor
});

map.on("mousemove", "medIncomeLayer", function (e) {
  popup.remove();

  var fastFoodsPopup = map.queryRenderedFeatures(e.point, {
    layers: ["fastFoodIds"],
  });

  var supermarketsPopup = map.queryRenderedFeatures(e.point, {
    layers: ["supermarketIds"],
  });

  if (fastFoodsPopup.length > 0) {
    var featureSelectFF = fastFoodsPopup[0];
    popup.setLngLat(e.lngLat);

    popup.setHTML(
      `<b>This fast food restaurant is a ${featureSelectFF.properties.ESTABLIS_2}.</b>`
    );
    popup.addTo(map);
  }

  if (supermarketsPopup.length > 0) {
    // console.log(supermarketsPopup[0]);

    var featureSelectSM = supermarketsPopup[0];
    popup.setLngLat(e.lngLat);

    popup.setHTML(
      `<b>This supermarket is a ${featureSelectSM.properties.SUPERMARKE}.</b>`
    );
    popup.addTo(map);
  }
});

//

var marketID = null;

map.on("mousemove", "supermarketIds", function (e) {
  // popup.remove(); //If a popup already exists, get rid of it!
  marketID = hover(e, "supermarkets", "supermarketIds", marketID);
});

map.on("mouseleave", "supermarketIds", function (e) {
  if (marketID) {
    map.setFeatureState(
      {
        source: "supermarkets",
        id: marketID,
      },
      {
        hover: false,
      }
    );
    marketID = null;
  }
});
//

//
var ffId = null;

map.on("mousemove", "fastFoodIds", function (e) {
  // popup.remove(); //If a popup already exists, get rid of it!
  ffId = hover(e, "fastFood", "fastFoodIds", ffId);
});

map.on("mouseleave", "fastFoodIds", function (e) {
  if (ffId) {
    map.setFeatureState(
      {
        source: "fastFood",
        id: ffId,
      },
      {
        hover: false,
      }
    );
    ffId = null;
  }
});

let toggleableLayerIds = ["supermarketIds", "fastFoodIds"];

for (let i = 0; i < toggleableLayerIds.length; i++) {
  let id = toggleableLayerIds[i];
  var str = id;
  str = str.replace("Ids", "");
  let link = document.createElement("button");
  link.href = "#";
  link.className = id + " active";
  link.textContent = str;

  link.onclick = function (e) {
    let clickedLayer = this.textContent + "Ids";
    e.preventDefault();
    e.stopPropagation();

    let visibility = map.getLayoutProperty(clickedLayer, "visibility");

    if (visibility === "visible") {
      map.setLayoutProperty(clickedLayer, "visibility", "none");
      this.className = clickedLayer;
    } else {
      this.className += " active";
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
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  })
);

//
//buffer popups
var tempClickBuffer = null;
var tempClickBuffer1 = null;
var tempSprmkts = null;
let tempff = null;
let dynamicTitle = document.querySelector(".renderText");
var popup1 = new mapboxgl.Popup({
  closeButton: true,
  closeOnClick: false,
});

const removelayer = () => {
  tempClickBuffer = null;
  tempClickBuffer1 = null;
  tempSprmkts = null;
  tempff = null;
  map.removeLayer("tempClickBufferLayer"); //get rid of the old buffer
  map.removeSource("tempClickBufferSource"); //get rid of the old selected supermarkets

  map.removeLayer("tempClickBufferLayer1"); //get rid of the old buffer
  map.removeSource("tempClickBufferSource1"); //get rid of the old selected supermarkets

  map.removeLayer("selectedSprmkts"); //reset source
  map.removeSource("tempSprmkts"); //reset source
  map.removeLayer("selectedff"); //reset source
  map.removeSource("tempff"); //reset source
};

//when you click the map, do the following.
//recall 'e' is an event data object: https://www.mapbox.com/mapbox-gl-js/api/#EventData
map.on("click", "torontoDensityLayer", function (e) {
  //clean up variables if we've already clicked somewhere else.
  //check by seeing if there's geojson text in the tempClickBuffer variable
  // console.log(e);
  if (tempClickBuffer != null) {
    tempClickBuffer = null;
    tempClickBuffer1 = null;
    tempSprmkts = null;
    tempff = null;
    map.removeLayer("tempClickBufferLayer"); //get rid of the old buffer
    map.removeSource("tempClickBufferSource"); //get rid of the old selected supermarkets

    map.removeLayer("tempClickBufferLayer1"); //get rid of the old buffer
    map.removeSource("tempClickBufferSource1"); //get rid of the old selected supermarkets

    map.removeLayer("selectedSprmkts"); //reset source
    map.removeSource("tempSprmkts"); //reset source
    map.removeLayer("selectedff"); //reset source
    map.removeSource("tempff"); //reset source
  }

  //create a point geojson object from the event data - this creates a point where you clicked
  tempLngLat = [e.lngLat.lng, e.lngLat.lat]; //create an array that looks like: [lng,lat]
  //make an object that is a 'geojson' object from the point data
  var tempPt = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: tempLngLat,
    },
  };

  //create a buffer using the point geojson you just created, 1 km circular buffer
  tempClickBuffer = turf.buffer(tempPt, 1, { units: "kilometers" });
  tempClickBuffer = turf.featureCollection([tempClickBuffer]);

  tempClickBuffer1 = turf.buffer(tempPt, 1, { units: "kilometers" });
  tempClickBuffer1 = turf.featureCollection([tempClickBuffer1]);
  //see what supermarkets (from the sprmkt geojson variable) are within the 'tempClickBuffer' geojson object you just created.
  //this function generates a new featureCollection called 'tempSprmkts', which we will display later
  tempff = turf.pointsWithinPolygon(fastfood, tempClickBuffer1);
  tempSprmkts = turf.pointsWithinPolygon(supermarketgeojson, tempClickBuffer);

  var featuresVis = map.queryRenderedFeatures(e.point, {
    layers: ["visminLayer"],
  });

  let featuresVisData;
  if (featuresVis[0]) {
    featuresVisData = featuresVis[0].properties.vismin_den;
  } else {
    featuresVisData = false;
  }
  // console.log(featuresVis[0].properties);
  console.log(featuresVisData);
  var featureIncome = map.queryRenderedFeatures(e.point, {
    layers: ["medIncomeLayer"],
  });

  let featuresIncomeData;
  if (featureIncome[0]) {
    featuresIncomeData = featureIncome[0].properties.COL2;
  } else {
    featuresIncomeData = false;
  }
  var featureRent = map.queryRenderedFeatures(e.point, {
    layers: ["medRentLayer"],
  });

  let featuresRentData;
  if (featureRent[0]) {
    featuresRentData = featureRent[0].properties.COL1;
  } else {
    featuresRentData = false;
  }

  var featureDensity = map.queryRenderedFeatures(e.point, {
    layers: ["torontoDensityLayer"],
  });

  let featuresDensityData;

  if (featureDensity[0]) {
    featuresDensityData = featureDensity[0].properties.density;
  } else {
    featuresDensityData = false;
  }

  if (tempSprmkts.features.length != null && tempff.features.length != null) {
    popup1
      .remove()
      .setLngLat(e.lngLat)
      .setHTML(
        `Within 1km of this buffer, there are ${tempSprmkts.features.length} supermarkets and ${tempff.features.length} fast food restaurants.`
      )
      .addTo(map);

    document
      .querySelector(".mapboxgl-popup-close-button")
      .addEventListener("click", removelayer);

    dynamicTitle.classList = "renderText";
    dynamicTitle.innerHTML = `This census tract has: <br> - A median household income of: $${
      featuresIncomeData ? featuresIncomeData : 0
    }, <br> - An average rent price of: $${
      featuresRentData ? featuresRentData : 0
    },
     <br> - A population density of: ${
       featuresDensityData ? featuresDensityData : 0
     } people per sq.km, <br> - A visible minority and Aboriginal density of: ${
      featuresVisData ? Math.round(featuresVisData) : 0
    } people per sq.km.`;
  } else {
    dynamicTitle.classList = "renderText";
    dynamicTitle.innerHTML = "There is no available data here";
  }

  //center the  map on the point you clicked and zoom in, using 'easeTo' so it is animated
  map.easeTo({
    center: e.lngLat, //center on the point you clicked
    zoom: 12, //zoom to zoom level 12
    duration: 1000, //take 1000 milliseconds to get there
  });

  // scroll the window down 100px
  window.scroll({
    top: 95,
    left: 0,
    behavior: "smooth",
  });

  //add the source and layer information of the buffer geojson (tempClickBuffer) and
  //subset of supermarkets geojson (tempSprmkts) objects you created
  map.addSource("tempSprmkts", {
    type: "geojson",
    data: tempSprmkts,
  });
  map.addLayer({
    id: "selectedSprmkts",
    type: "circle",
    source: "tempSprmkts",
    layout: {},
    paint: {
      "circle-color": "blue", //make our selected supermarket layer BIGGER BLUE points
      "circle-radius": 6,
      "circle-opacity": 1,
    },
  });

  map.addSource("tempff", {
    type: "geojson",
    data: tempff,
  });
  map.addLayer({
    id: "selectedff",
    type: "circle",
    source: "tempff",
    layout: {},
    paint: {
      "circle-color": "red", //make our selected supermarket layer BIGGER BLUE points
      "circle-radius": 6,
      "circle-opacity": 1,
    },
  });

  map.addSource("tempClickBufferSource", {
    type: "geojson",
    data: tempClickBuffer,
  });
  map.addLayer(
    {
      id: "tempClickBufferLayer",
      type: "fill",
      source: "tempClickBufferSource",
      layout: {},
      paint: {
        "fill-color": "white",
        "fill-opacity": 0.4,
        "fill-outline-color": "black",
      },
    },
    "selectedSprmkts"
  );

  map.addSource("tempClickBufferSource1", {
    type: "geojson",
    data: tempClickBuffer1,
  });
  map.addLayer(
    {
      id: "tempClickBufferLayer1",
      type: "fill",
      source: "tempClickBufferSource1",
      layout: {},
      paint: {
        "fill-color": "white",
        "fill-opacity": 0.4,
        "fill-outline-color": "black",
      },
    },
    "selectedSprmkts"
  );
});
//
