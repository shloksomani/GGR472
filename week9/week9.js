mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hsb2tzb21hbmkiLCJhIjoiY2s1NGpqczNwMGs0ajNucXZmd2JrZm8xMyJ9.gkbVhtrQBRhiOJrUf6ZO8g";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/shloksomani/ck7ga221a0n5k1ip6s7d5h1x4",
  center: [-90, 50],
  zoom: 2
});

// var area = turf.area(canadianProvinces);
// console.log("Canada has an area (in square meters) of: " + area);

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

// //MEASURE AREA OF A POLYGON (only returns in square meters - must convert to other units 'by hand')
var area = turf.area(canadianProvinces);
console.log("Canada has an area (in square meters) of: " + area);

// //ITERATE THROUGH ALL PROVINCES AND REPORT THEIR AREAS
canadianProvinces.features.forEach(function(feature, i, provinces) {
  console.log(
    feature.properties.PRVNAME +
      " has an area (in square meters) of: " +
      turf.area(feature)
  );
});

// //MEASURE A LINESTRING
var linelength = turf.length(utmToUTSG.features[0], { units: "kilometers" }); //pick out the line feature you want to measure, and don't forget your units
console.log(linelength); //you can use this value for future calculations, or add this data to a pop up

//MEASURE DISTANCE BETWEEN 2 POINTS
var points = {
  type: "FeatureCollection",
  features: [canadianAirports.features[20], canadianAirports.features[832]]
};
var distance_bw_points = turf.distance(points.features[0], points.features[1], {
  units: "kilometers"
});
console.log(distance_bw_points);

//CREATE A BOUNDING BOX AROUND POINTS (ALSO USE FOR HEX GRID)
var enveloped = turf.envelope(canadianAirports); //send point geojson to turf, creates an 'envelope' (bounding box) around points
var result = {
  //put the resulting envelope in a geojson format FeatureCollection
  type: "FeatureCollection",
  features: [enveloped] //don't forget brackets
};

//CREATE A HEX GRID
//must be in order: minX, minY, maxX, maxY ... you have to pick these out from your envelope that you created previously
var bbox = [
  enveloped.geometry.coordinates[0][0][0],
  enveloped.geometry.coordinates[0][0][1],
  enveloped.geometry.coordinates[0][2][0],
  enveloped.geometry.coordinates[0][2][1]
];
var hexgridUnits = "kilometers"; //units that will determine the width of the hex grid
var cellSide = 30; //in the units you defined above

var hexgrid = turf.hexGrid(bbox, cellSide, { units: hexgridUnits }); //makes the new geojson hexgrid features

var tempcoord;
var tempfeature;
var coordinate_array = [];
canadianProvinces.features.forEach(function(feature, i) {
  tempfeature = turf.centroid(feature);
  tempcoord = tempfeature.geometry.coordinates;
  coordinate_array[i] = [tempcoord, feature.properties.PRVNAME];
  console.log("~~~~~~~~~~~~~~~");
  console.log(coordinate_array);
  feature.properties.NEWVAR = "blah " + i;
});

map.on("style.load", function() {
  //use this code to add geojson source if you're on a server:
  // map.addSource('airports',{
  //   "type": "geojson",
  //   "data": "./canadianAirports.geojson"
  // });

  //use this code to add geojson source if you're working locally...be sure
  //to also change the geojson file so it has a 'var' and add the file as a <script>
  //in the html file
  map.addSource("airports", {
    type: "geojson",
    data: canadianAirports
  });
  map.addLayer({
    id: "airportsLayer",
    type: "circle",
    source: "airports",
    layout: {},
    paint: {
      "circle-color": "blue",
      "circle-radius": 2,
      "circle-opacity": 1
    }
  });
  map.addSource("provinces", {
    type: "geojson",
    data: canadianProvinces
  });
  map.addLayer(
    {
      id: "provincesLayer",
      type: "fill",
      source: "provinces",
      layout: {},
      paint: {
        "fill-color": "blue",
        "fill-opacity": 0.5,
        "fill-outline-color": "black"
      }
    },
    "airportsLayer"
  );

  map.addSource("utmToUTSG", {
    type: "geojson",
    data: utmToUTSG
  });
  map.addLayer(
    {
      id: "utPath",
      type: "line",
      source: "utmToUTSG",
      layout: {},
      paint: {
        "line-color": "red"
      }
    },
    "airportsLayer"
  );

  //MEASURE DISTANCE BETWEEN TWO POINTS EXAMPLE
  map.addSource("pointsDist", {
    type: "geojson",
    data: points
  });
  map.addLayer({
    id: "twoAirports",
    type: "circle",
    source: "pointsDist",
    layout: {},
    paint: {
      "circle-color": "red",
      "circle-radius": 10,
      "circle-opacity": 1
    }
  });

  //BOUNDING BOX EXAMPLE
  map.addSource("envelopeGeoJSON", {
    type: "geojson",
    data: result //this is the bounding box we just created!
  });
  map.addLayer(
    {
      id: "airportEnvelope",
      type: "fill",
      source: "envelopeGeoJSON",
      layout: {},
      paint: {
        "fill-color": "red",
        "fill-opacity": 0.5,
        "fill-outline-color": "black"
      }
    },
    "airportsLayer"
  );

  // //HEXGRID EXAMPLE
  map.addSource("canadaHexGrid", {
    type: "geojson",
    data: hexgrid //this is the hexgrid we just created!
  });
  map.addLayer(
    {
      id: "canadaHexGrid",
      type: "fill",
      source: "canadaHexGrid",
      layout: {},
      paint: {
        "fill-color": "green",
        "fill-opacity": 0.11,
        "fill-outline-color": "white"
      }
    },
    "airportsLayer"
  );
  //
});
