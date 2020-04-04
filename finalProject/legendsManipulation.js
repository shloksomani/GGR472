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
    let filterHour1 = [">", ["to-number", ["get", layerFilterValue]], bound1];
    let filterHour2 = ["<", ["to-number", ["get", layerFilterValue]], bound2];

    map.setFilter(layerId, ["all", filterHour1, filterHour2]);
    bool = false;
  } else if (bool && selctedFilter == 5) {
    currentLegend = selctedFilter;
    let filterHour2 = [">", ["to-number", ["get", layerFilterValue]], bound1];

    map.setFilter(layerId, ["all", filterHour2]);
    bool = false;
  } else {
    let filterHour1 = [">", ["to-number", ["get", layerFilterValue]], 0];
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
