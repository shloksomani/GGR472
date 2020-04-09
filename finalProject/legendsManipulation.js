let currentLegend;
let selectedBound;

let layerFilterValue;
let layerId;

const below = (layerNumber, selctedFilter) => {
  // console.log("here line 149");
  let bound1;
  let bound2;

  if (layerNumber == 1) {
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
    layerId = "education";
    layerFilterValue = "COL2";
    if (selctedFilter == 1) {
      bound1 = 0;
      bound2 = 450;
    } else if (selctedFilter == 2) {
      bound1 = 450;
      bound2 = 800;
    } else if (selctedFilter == 3) {
      bound1 = 800;
      bound2 = 1150;
    } else if (selctedFilter == 4) {
      bound1 = 1150;
      bound2 = 1590;
    } else if (selctedFilter == 5) {
      bound1 = 1590;
    }
  } else {
    layerId = "avgAgeLayer";
    layerFilterValue = "COL1";
    if (selctedFilter == 1) {
      bound1 = 0;
      bound2 = 38.0;
    } else if (selctedFilter == 2) {
      bound1 = 38.0;
      bound2 = 41.9;
    } else if (selctedFilter == 3) {
      bound1 = 41.9;
      bound2 = 46.9;
    } else if (selctedFilter == 4) {
      bound1 = 46.9;
      bound2 = 80.1;
    } else if (selctedFilter == 5) {
      bound1 = 80.1;
    }
  }

  if (currentLegend == layerNumber && selectedBound == selctedFilter) {
    let filterHour1 = [">", ["to-number", ["get", layerFilterValue]], 0];
    map.setFilter(layerId, ["all", filterHour1]);
    bool = true;
  } else {
    console.log("i am here");

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

changeLegends = (layerNumber) => {
  if (layerNumber == 1) {
    layerId = "medIncomeLayer";
    map.setPaintProperty("education", "fill-opacity", 0);
    map.setPaintProperty("avgAgeLayer", "fill-opacity", 0);
    map.setPaintProperty("medIncomeLayer", "fill-opacity", 0.8);
    map.setFilter(layerId);
  } else if (layerNumber == 2) {
    layerId = "education";
    map.setPaintProperty("education", "fill-opacity", 0.8);
    map.setPaintProperty("avgAgeLayer", "fill-opacity", 0);
    map.setPaintProperty("medIncomeLayer", "fill-opacity", 0);
    map.setFilter(layerId);
  } else {
    layerId = "avgAgeLayer";
    map.setPaintProperty("education", "fill-opacity", 0);
    map.setPaintProperty("avgAgeLayer", "fill-opacity", 0.8);
    map.setPaintProperty("medIncomeLayer", "fill-opacity", 0);
    map.setFilter(layerId);
  }
};
