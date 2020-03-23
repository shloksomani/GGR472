mapboxgl.accessToken =
  "pk.eyJ1IjoibXdpZGVuZXIiLCJhIjoibXBKQU85dyJ9.Q6yf1zk7wpnYqpsQfRwVmw";
var map = new mapboxgl.Map({
  container: "map", //container id in HTML
  style: "mapbox://styles/mwidener/cjcouhmq03m9t2rmvgnmmsr1l", //stylesheet location
  center: [-102.542951, 59.650162], // starting point, longitude/latitude
  zoom: 2.5 // starting zoom level
});

//SIMPLY ADDING A POLYGON OF PROVINCES FROM MAPBOX VECTOR TILES
map.on("style.load", function() {
  map.addSource("provinces", {
    type: "vector",
    url: "mapbox://mwidener.6sokce8y"
  });

  map.addLayer({
    id: "provinces-fill",
    type: "fill",
    source: "provinces",
    layout: {},
    paint: {
      "fill-color": "red",
      "fill-opacity": 1,
      "fill-outline-color": "white"
    },
    "source-layer": "CanadianProvinces-5onu90"
  });
});

// function detectLeftButton(evt) {
//   evt = evt || window.event;
//   if ("buttons" in evt) {
//     return evt.buttons == 1;
//   }
//   var button = evt.which || evt.button;
//   return button == 1;
// }

// function detectLeftButton(event) {
//   if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
//     return false;
//   } else if ("buttons" in event) {
//     return event.buttons === 1;
//   } else if ("which" in event) {
//     return event.which === 1;
//   } else {
//     return event.button == 1 || event.type == "click";
//   }
// }
//*********************************
//POP UPS, CLICKS, HOVERS
//*********************************

// if the mouse enters the province fill layer then do the following:
map.on("mouseenter", "provinces-fill", function(e) {
  map.getCanvas().style.cursor = "crosshair"; //make the mouse cursor pointy
});
// if the mouse leaves the province fill layer then do the following:
map.on("mouseleave", "provinces-fill", function(e) {
  map.getCanvas().style.cursor = "pointer"; //go back to the null cursor
});

// FIRST ADD A POPUP OBJECT
var popup = new mapboxgl.Popup({
  closeButton: true,
  closeOnClick: false
});

// NEXT DEFINE WHEN YOU WANT THE POPUP TO HAPPEN
map.on("mousedown", "provinces-fill", function(e) {
  popup.remove(); //If a popup already exists, get rid of it!

  // let lButton = detectLeftButton(e);
  if (e.originalEvent.button != 0) {
    console.log("hereee");
    popup.remove();
    return 0;
  }

  //get the rendered features that belong to the provinces-fill layer
  var features = map.queryRenderedFeatures(e.point, {
    layers: ["provinces-fill"]
  });

  //if there is a feature there, do the following
  if (features.length > 0) {
    // console.log(features[0]); //print out the first element of the features array that was selected
    var feature = features[0]; //store the first element as 'feature'
    popup.setLngLat(e.lngLat); //place the popup window at the lng and lat where your click event happened
    //add stuff to the pop up:
    popup.setHTML(
      "<b>The province you clicked on is:</b> " +
        feature.properties.PRVNAME +
        "<br>" +
        "Here is a picture of a dangerous Canadian Mountain Lion, known to roam these parts: <br>" +
        "<center><img src='./canadianmountainlion.jpg' style='width:75%;height:75%;'></img></center>"
    );
    popup.addTo(map); //finally add the pop up to the map
  }
  //if there are no features under the click, then print this in the web browser console
  else {
    console.log("no features from layer here...");
  }
});
//*********************************
//POP UPS
//*********************************
