hover = (event, layer, layerId, sourceLayer, id) => {
  //get the rendered features that belong to the provinces-fill layer
  let features = map.queryRenderedFeatures(event.point, {
    layers: [layerId]
  });

  //   console.log("line 83");

  //if there is a feature there, do the following
  if (event.features.length > 0) {
    // console.log(features[0]); //print out the first element of the features array that was selected
    // console.log("line 90");
    if (id) {
      map.removeFeatureState({
        source: layer,
        sourceLayer: sourceLayer,
        id: id
      });
    }
    id = event.features[0].id;
    map.setFeatureState(
      {
        source: layer,
        sourceLayer: sourceLayer,
        id: id
      },
      {
        hover: true
      }
    );
    return id;
  }
};
