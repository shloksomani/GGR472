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

  //Add another visualization of the polygon of provinces. Note we do not add the source again!
  map.addLayer({
    id: "provinces-hl", //remember to change the name - this is our "highlight" layer (hence '-hl')
    type: "fill",
    source: "provinces",
    layout: {},
    paint: {
      "fill-color": "grey",
      "fill-opacity": 1,
      "fill-outline-color": "black"
    },
    "source-layer": "CanadianProvinces-5onu90",
    filter: ["==", "PRID", ""] //Here is a filter that doesn't select anything
  });
  map.addLayer({
    id: "provinces-hl-lowpop", //remember to change the name - this is our "highlight" layer (hence '-hl')
    type: "fill",
    source: "provinces",
    layout: {},
    paint: {
      "fill-color": "green",
      "fill-opacity": 1,
      "fill-outline-color": "white"
    },
    "source-layer": "CanadianProvinces-5onu90",
    filter: ["==", "PRID", ""] //Here is a filter that doesn't select anything
  });
  map.addLayer({
    id: "provinces-hl-highpop", //remember to change the name - this is our "highlight" layer (hence '-hl')
    type: "fill",
    source: "provinces",
    layout: {},
    paint: {
      "fill-color": "blue",
      "fill-opacity": 1,
      "fill-outline-color": "white"
    },
    "source-layer": "CanadianProvinces-5onu90",
    filter: ["==", "PRID", ""] //Here is a filter that doesn't select anything
  });
});

//*********************************
//HOVER EVENTS 1
//*********************************
/*map.on('mousemove', 'provinces-fill', function(e) {
    var features = e.features;  //e is passed to the function - 'e' is the event info triggered
    if(features.length > 0){ //if there are features in the e.features array then go into the conditional
        var feature = e.features[0];  //pull out the first feature element in the features array
        console.log(feature.properties)  //print out the feature properties in the browser console
        if(feature.properties.POP > 1000000){  //if the POP attribute of the features is > 1 mill, make it blue
            map.setPaintProperty("provinces-hl","fill-color","blue");
            console.log('pop is: ' + feature.properties.POP); //print pop value in console
        }
        else{
            map.setPaintProperty("provinces-hl","fill-color","green"); //if POP is less than 1 mill, make it green
            console.log('pop is: ' + feature.properties.POP); //print pop value in console
        }
        map.setFilter("provinces-hl",["==", "PRID", feature.properties.PRID]); //set the filter of the provinces-hl to display 
                                                                               //the feature you're hovering over
    }
});
      

map.on('mouseenter','provinces-fill',function(e){   //when your mouse enters the provinces-fill layer
       map.getCanvas().style.cursor = 'pointer';    //change the mouse cursor to a pointer
       });
map.on('mouseleave','provinces-fill',function(e){
    map.getCanvas().style.cursor = '';                 // when the mouse leaves the provinces fill layer
    map.setFilter("provinces-hl",["==", "PRID",""]);   //change back to normal cursor, also remove filters to make
                                                       //provinces-hl layer invisible
});*/
//*********************************
//HOVER EVENTS 1
//*********************************

//*********************************
//HOVER EVENTS VERSION 2
//*********************************
/*map.on('mousemove', function(e){
    var features = map.queryRenderedFeatures(e.point, {
        "layers": ["provinces-fill"]}
    );
    if(features.length > 0){
        var feature = features[0];
        console.log(feature.properties)
        if(feature.properties.POP > 1000000){
            map.setPaintProperty("provinces-hl","fill-color","blue");
            console.log('pop is: ' + feature.properties.POP);
        }
        else{
            map.setPaintProperty("provinces-hl","fill-color","green");
            console.log('pop is: ' + feature.properties.POP);
        }
        map.setFilter("provinces-hl",["==", "PRID", feature.properties.PRID]);
    } 
}); 
map.on('mouseenter','provinces-fill',function(e){
       map.getCanvas().style.cursor = 'pointer';
       });
map.on('mouseleave','provinces-fill',function(e){
    map.getCanvas().style.cursor = '';
}); */
//*********************************
//HOVER EVENTS VERSION 2
//*********************************

//*********************************
//CLICK EVENTS VERSION 1
//*********************************
/*map.on('click','provinces-fill',function(e){
    var features = e.features;
    console.log('print: ' + features)
    if(features.length > 0){
        var feature = features[0];
        //console.log(feature)
        var current_filter = map.getFilter("provinces-hl");
        if(current_filter[2] == feature.properties.PRID){
            map.setFilter("provinces-hl",["==", "PRID", ""])
        }
        else{
            map.setFilter("provinces-hl",["==", "PRID", feature.properties.PRID]);
        }
    }
}); */
//*********************************
//CLICK EVENTS VERSION 1
//*********************************

//*********************************
//CLICK EVENTS VERSION 2
//*********************************
/*map.on('click', function(e){
    //var point_test = e.point
    //console.log('blah: ' +point_test);
    var features = map.queryRenderedFeatures(e.point, {  //grab features from the point on which the event 'e' occurred
        "layers": ["provinces-fill"]}                    //we're only interested in features on provinces-fill layer
    );
    if (features.length > 0){            // if there are features to be clicked on (i.e. 1 or more)
        console.log(features[0]);       // print out the feature in the console
        var feature = features[0];      //move the feature into a variable
        var current_filter = map.getFilter("provinces-hl");  //get the current status of the provinces-hl filter
        if(current_filter[2] == feature.properties.PRID){    //if the filter is currently set to where we clicked
            map.setFilter("provinces-hl",["==", "PRID", ""]) //then we want to remove the filter (i.e. turn off a previous click)
        }
        else{
            map.setFilter("provinces-hl",["==", "PRID", feature.properties.PRID]); //otherwise, we want to set the filter to the                                                                        //feature we clicked on
        }
    }
    else{
        map.setFilter("provinces-hl",["==", "PRID", ""]);   //if features.length == that means we clicked off our feature layer
                                                            //so make hl layer invisible
    }
}); 
map.on('mouseenter','provinces-fill',function(e){
       map.getCanvas().style.cursor = 'pointer';
       });
map.on('mouseleave','provinces-fill',function(e){
    map.getCanvas().style.cursor = '';
}); */
//*********************************
//CLICK EVENTS VERSION 2
//*********************************

//*********************************
//POP UPS, CLICKS, HOVERS
//*********************************

var popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});
map.on("click", function(e) {
  popup.remove();
  var features = map.queryRenderedFeatures(e.point, {
    layers: ["provinces-fill"]
  });

  if (features.length > 0) {
    console.log(features[0]);
    var feature = features[0];
    popup.setLngLat(e.lngLat);
    popup.setHTML(
      "<b>The province you clicked on is:</b> " +
        feature.properties.PRVNAME +
        "<br>" +
        "Here is a picture of a dangerous Canadian Mountain Lion, known to roam these parts: <br>" +
        "<center><img src='./canadianmountainlion.jpg' style='width:250px;height:250px;'></img></center>"
    );
    popup.addTo(map);
  } else {
    console.log("no features from layer here...");
  }
});

map.on("mousemove", function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ["provinces-fill"]
  });
  if (features.length > 0) {
    var feature = features[0];
    if (feature.properties.POP > 1000000) {
      map.setFilter("provinces-hl-highpop", ["==", "PRID", ""]);
      map.setFilter("provinces-hl-lowpop", [
        "==",
        "PRID",
        feature.properties.PRID
      ]);
    } else {
      map.setFilter("provinces-hl-lowpop", ["==", "PRID", ""]);
      map.setFilter("provinces-hl-highpop", [
        "==",
        "PRID",
        feature.properties.PRID
      ]);
    }
  } else {
    map.setFilter("provinces-hl-lowpop", ["==", "PRID", ""]);
    map.setFilter("provinces-hl-highpop", ["==", "PRID", ""]);
  }
});

map.on("mouseenter", "provinces-fill", function(e) {
  map.getCanvas().style.cursor = "pointer";
});

map.on("mouseleave", "provinces-fill", function(e) {
  map.getCanvas().style.cursor = "";
});

//*********************************
//POP UPS
//*********************************
