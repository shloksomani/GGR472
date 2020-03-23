mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hsb2tzb21hbmkiLCJhIjoiY2s1NGpqczNwMGs0ajNucXZmd2JrZm8xMyJ9.gkbVhtrQBRhiOJrUf6ZO8g";
let map = new mapboxgl.Map({
  container: "map", //container id in HTML
  style: "mapbox://styles/shloksomani/ck76bun3a22ut1inwvkk6j02p", //stylesheet location
  center: [-79.2904789, 43.057688], // starting point, longitude/latitude
  zoom: 10 // starting zoom level
});

let nav1 = new mapboxgl.NavigationControl();
map.addControl(nav1, "top-right");

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);

//SIMPLY ADDING A POLYGON OF PROVINCES FROM MAPBOX VECTOR TILES
map.on("style.load", function() {
  map.addSource("n_wine", {
    type: "geojson",
    data: "./n_wine.geojson",
    generateId: true
  });
  map.addLayer({
    id: "n_wine_layer",
    type: "circle",
    source: "n_wine",
    layout: {},

    //
    paint: {
      // The feature-state dependent circle-radius expression will render
      // the radius size according to its magnitude when
      // a feature's hover state is set to true
      "circle-radius": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        ["interpolate", ["linear"], ["get", "mag"], 1, 10],
        5
      ],
      "circle-stroke-color": "#000",
      "circle-stroke-width": 1,
      // The feature-state dependent circle-color expression will render
      // the color according to its magnitude when
      // a feature's hover state is set to true
      "circle-color": "black"
    }
    // "source-layer": "notl_wineries-2l1v8a" //get this from mapbox tileset page
  });
});

// if the mouse enters the province fill layer then do the following:
map.on("mouseenter", "n_wine_layer", function(e) {
  map.getCanvas().style.cursor = "pointer"; //make the mouse cursor pointy
});
// if the mouse leaves the province fill layer then do the following:
map.on("mouseleave", "n_wine_layer", function(e) {
  map.getCanvas().style.cursor = ""; //go back to the null cursor
});

// FIRST ADD A POPUP OBJECT
let popup = new mapboxgl.Popup({
  closeButton: true,
  closeOnClick: false
});

let n_wine_ID = null;

// NEXT DEFINE WHEN YOU WANT THE POPUP TO HAPPEN
map.on("mousemove", "n_wine_layer", function(e) {
  popup.remove(); //If a popup already exists, get rid of it!

  //get the rendered features that belong to the provinces-fill layer
  let features = map.queryRenderedFeatures(e.point, {
    layers: ["n_wine_layer"]
  });

  //   console.log("line 83");

  //if there is a feature there, do the following
  if (e.features.length > 0) {
    // console.log(features[0]); //print out the first element of the features array that was selected
    let feature = features[0]; //store the first element as 'feature'
    popup.setLngLat(e.lngLat); //place the popup window at the lng and lat where your click event happened
    // console.log("line 90");
    if (n_wine_ID === 0 || n_wine_ID) {
      //   console.log("removing 3,2,1");
      map.removeFeatureState({
        source: "n_wine",
        id: n_wine_ID
      });
    }

    n_wine_ID = e.features[0].properties.FID;

    map.setFeatureState(
      {
        source: "n_wine",
        id: n_wine_ID
      },
      {
        hover: true
      }
    );

    //add stuff to the pop up:
    let name_wine = e.features[0].properties.Wineries;
    // console.log(n_wine_ID);

    popup.setHTML("<b>The winery you clicked on is:</b> " + name_wine);
    popup.addTo(map); //finally add the pop up to the map
  } else {
    console.log("no features from layer here...");
  }
});

map.on("mouseleave", "n_wine_layer", function(e) {
  if (n_wine_ID === 0 || n_wine_ID) {
    map.setFeatureState(
      {
        source: "n_wine",
        id: n_wine_ID
      },
      {
        hover: false
      }
    );
    popup.remove();
    n_wine_ID = null;
  }
});
