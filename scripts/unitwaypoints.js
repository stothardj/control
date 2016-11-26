define([
  './layers',
  './nativeevents',
  './panning',
], (
  layers,
  nativeevents,
  panning
) => {
  let capture = layers.eventcapture.getCanvas();
  let setWayoutpointCallbacks = [];
  let mouseDown = (ev) => {
    let {x: gameX, y: gameY} = panning.screenToGameCoords(ev.clientX, ev.clientY);
    if (nativeevents.isRightMouseButton(ev)) {
      for (let callback of setWayoutpointCallbacks) {
        callback({x: gameX, y: gameY}, ev.shiftKey);
      }
    }
  };
  return {
    start: () => {
      capture.addEventListener('mousedown', mouseDown);
    },
    onSetWaypoint: (fn) => {
      setWayoutpointCallbacks.push(fn);
    },
  };
});
