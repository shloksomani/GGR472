// To change the view from the buttons
// which are in the legend section

const addRemovePoints = (layer) => {
  const menu = document.querySelector("." + layer);
  let visibility = map.getLayoutProperty(layer, "visibility");

  if (visibility === "visible") {
    map.setLayoutProperty(layer, "visibility", "none");
    menu.classList = layer;
  } else {
    menu.className += " active";
    map.setLayoutProperty(layer, "visibility", "visible");
  }
};
