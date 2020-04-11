// takes care of all the hover functionality of the points
hover = (event, layer, layerId, id) => {
  let features = map.queryRenderedFeatures(event.point, {
    layers: [layerId],
  });
  if (event.features.length > 0) {
    if (id) {
      map.removeFeatureState({
        source: layer,
        id: id,
      });
    }
    id = event.features[0].id;
    map.setFeatureState(
      {
        source: layer,
        id: id,
      },
      {
        hover: true,
      }
    );
    return id;
  }
};
