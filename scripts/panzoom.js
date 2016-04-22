define(['./panning', './zooming'], (panning, zooming) => {
  return {
    start: () => {
      panning.start();
      zooming.start();
    },
    withPanZoom: (fn) => {
      panning.withPanningOffset(() =>
          zooming.withZoomScaling(fn));
    },
    screenToGameCoords: (screenX, screenY) => {
      let coords = panning.screenToGameCoords(screenX, screenY);
      return zooming.screenToGameCoords(coords.x, coords.y);
    },
  };
});
