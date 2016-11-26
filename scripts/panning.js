define([
  './game',
  './layers',
  './nativeevents',
], (
  game,
  layers,
  nativeevents
) => {
  let capture = layers.eventcapture.getCanvas();
  let ctx = layers.game.getContext();
  let x = 0;
  let y = 0;
  let panning = false;
  let dim = () => game.getCurrentLevel().getDimensions();
  let mouseDown = (ev) => {
    if (nativeevents.isMiddleMouseButton(ev)) {
      panning = true;
    }
  };
  let mouseMove = (ev) => {
    if (panning) {
      x += ev.movementX;
      y += ev.movementY;
    }
  };
  let mouseUp = (ev) => {
    if (nativeevents.isMiddleMouseButton(ev)) {
      panning = false;
    }
  };
  return {
    start: () => {
      capture.addEventListener('mousedown', mouseDown);
      capture.addEventListener('mousemove', mouseMove);
      capture.addEventListener('mouseup', mouseUp);
    },
    withPanningOffset: (fn) => {
      ctx.save();
      ctx.translate(x, y);
      fn();
      ctx.restore();
    },
    screenToGameCoords: (screenX, screenY) => {
      return {
        x: screenX - x,
        y: screenY - y,
      };
    },
  };
});
