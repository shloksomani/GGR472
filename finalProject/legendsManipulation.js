// Legends manipulation
// Dynamically changes the map when clicked on certain legends
let currentLegend;
let selectedBound;

let layerFilterValue;
let layerId;

const below = (layerNumber, selctedFilter) => {
  let bound1;
  let bound2;

  if (layerNumber == 1) {
    layerId = "medIncomeLayer";
    layerFilterValue = "COL2";
    if (selctedFilter == 1) {
      bound1 = 0;
      bound2 = 56640;
    } else if (selctedFilter == 2) {
      bound1 = 56640;
      bound2 = 79616;
    } else if (selctedFilter == 3) {
      bound1 = 79616;
      bound2 = 115456;
    } else if (selctedFilter == 4) {
      bound1 = 115456;
      bound2 = 184661;
    } else if (selctedFilter == 5) {
      bound1 = 184661;
    }
  } else if (layerNumber == 2) {
    layerId = "torontoDensityLayer";
    layerFilterValue = "density";
    if (selctedFilter == 1) {
      bound1 = 0;
      bound2 = 2908;
    } else if (selctedFilter == 2) {
      bound1 = 2908;
      bound2 = 4586;
    } else if (selctedFilter == 3) {
      bound1 = 4586;
      bound2 = 6479;
    } else if (selctedFilter == 4) {
      bound1 = 6479;
      bound2 = 9462;
    } else if (selctedFilter == 5) {
      bound1 = 9462;
    }
  } else if (layerNumber == 3) {
    layerId = "medRentLayer";
    layerFilterValue = "COL1";
    if (selctedFilter == 1) {
      bound1 = 0;
      bound2 = 662.0;
    } else if (selctedFilter == 2) {
      bound1 = 662.0;
      bound2 = 1076.0;
    } else if (selctedFilter == 3) {
      bound1 = 1076.0;
      bound2 = 1321.0;
    } else if (selctedFilter == 4) {
      bound1 = 1321.0;
      bound2 = 1649.0;
    } else if (selctedFilter == 5) {
      bound1 = 1649.0;
    }
  } else {
    layerId = "visminLayer";
    layerFilterValue = "vismin_den";
    if (selctedFilter == 1) {
      bound1 = 0;
      bound2 = 2642;
    } else if (selctedFilter == 2) {
      bound1 = 2642;
      bound2 = 6134;
    } else if (selctedFilter == 3) {
      bound1 = 6134;
      bound2 = 13012;
    } else if (selctedFilter == 4) {
      bound1 = 13012;
      bound2 = 31667;
    } else if (selctedFilter == 5) {
      bound1 = 31667;
    }
  }

  if (currentLegend == layerNumber && selectedBound == selctedFilter) {
    let filterHour1 = [">", ["to-number", ["get", layerFilterValue]], 0];
    map.setFilter(layerId, ["all", filterHour1]);
    bool = true;
  } else {
    currentLegend = layerNumber;
    selectedBound = selctedFilter;
    changeLegends(layerNumber);
    bool = false;
  }

  if (!bool && selctedFilter != 5) {
    let filterHour1 = [">", ["to-number", ["get", layerFilterValue]], bound1];
    let filterHour2 = ["<", ["to-number", ["get", layerFilterValue]], bound2];
    map.setFilter(layerId, ["all", filterHour1, filterHour2]);
  } else if (!bool && selctedFilter == 5) {
    let filterHour2 = [">", ["to-number", ["get", layerFilterValue]], bound1];
    map.setFilter(layerId, ["all", filterHour2]);
  } else {
    let filterHour1 = [">", ["to-number", ["get", layerFilterValue]], 0];
    map.setFilter(layerId, ["all", filterHour1]);
    currentLegend = null;
    selectedBound = null;
  }
};

// when clicked on the legends title
// the function fills the appropriate layers
changeLegends = (layerNumber) => {
  if (layerNumber == 1) {
    layerId = "medIncomeLayer";
    map.setPaintProperty("torontoDensityLayer", "fill-opacity", 0);
    map.setPaintProperty("medRentLayer", "fill-opacity", 0);
    map.setPaintProperty("medIncomeLayer", "fill-opacity", 0.8);
    map.setPaintProperty("visminLayer", "fill-opacity", 0);
    map.setFilter(layerId);
  } else if (layerNumber == 2) {
    layerId = "torontoDensityLayer";
    map.setPaintProperty("torontoDensityLayer", "fill-opacity", 0.8);
    map.setPaintProperty("medRentLayer", "fill-opacity", 0);
    map.setPaintProperty("medIncomeLayer", "fill-opacity", 0);
    map.setPaintProperty("visminLayer", "fill-opacity", 0);
    map.setFilter(layerId);
  } else if (layerNumber == 3) {
    layerId = "medRentLayer";
    map.setPaintProperty("torontoDensityLayer", "fill-opacity", 0);
    map.setPaintProperty("medRentLayer", "fill-opacity", 0.8);
    map.setPaintProperty("medIncomeLayer", "fill-opacity", 0);
    map.setPaintProperty("visminLayer", "fill-opacity", 0);
    map.setFilter(layerId);
  } else if (layerNumber == 4) {
    let thisLayer = "visminLayer";
    map.setPaintProperty("torontoDensityLayer", "fill-opacity", 0);
    map.setPaintProperty("medRentLayer", "fill-opacity", 0);
    map.setPaintProperty("medIncomeLayer", "fill-opacity", 0);
    map.setPaintProperty("visminLayer", "fill-opacity", 0.8);
    map.setFilter(thisLayer);
  }
};
