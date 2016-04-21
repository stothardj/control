define(['./canvas', './nativeevents', './panning'], (canvas, nativeevents, panning) => {
  let c = canvas.canvasmap['mouse'];
  let setWayoutpointCallbacks = [];
  let mouseDown = (ev) => {
    let {x: gameX, y: gameY} = panning.screenToGameCoords(ev.clientX, ev.clientY);
    if (nativeevents.isRightMouseButton(ev)) {
      for (let callback of setWayoutpointCallbacks) {
        callback({x: gameX, y: gameY});
      }
    }
  };
  return {
    start: () => {
      c.addEventListener('mousedown', mouseDown);
    },
    onSetWaypoint: (fn) => {
      setWayoutpointCallbacks.push(fn);
    },
  };
});
