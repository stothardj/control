define(['./layers'], (layers) => {
  const ZOOM_CHANGE = 0.05;
  let c = layers.mouse.getCanvas();
  let ctx = layers.game.getContext();
  let zoom = 1;
  
  let wheel = (ev) => {
    let change = 0;
    if (ev.deltaY > 0) change = -ZOOM_CHANGE;
    else if (ev.deltaY < 0) change = ZOOM_CHANGE;
    zoom += change;
    console.log(zoom);
  };
  return {
    start() {
      c.addEventListener('wheel', wheel);
    },
    withZoomScaling: (fn) => {
      ctx.save();
      ctx.scale(zoom, zoom);
      fn();
      ctx.restore();
    },
    screenToGameCoords: (screenX, screenY) => {
      return {
        x: screenX / zoom,
        y: screenY / zoom,
      };
    },
  };
});
