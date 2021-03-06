define([
  './layers',
  './nativeevents',
  './panzoom',
], (
  layers,
  nativeevents,
  panzoom
) => {
  let selecting = false;
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  let c = layers.mouse.getCanvas();
  let ctx = layers.mouse.getContext();
  let capture = layers.eventcapture.getCanvas();
  let selectCallbacks = [];
  let mouseDown = (ev) => {
    if (nativeevents.isLeftMouseButton(ev)) {
      selecting = true;
      startX = ev.clientX;
      startY = ev.clientY;
    }
  };
  let renderSoftwareMouse = () => {
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.translate(endX, endY);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(12, 6);
    ctx.lineTo(6, 12);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };
  let clearSelection = () => {
    ctx.clearRect(0, 0, c.width, c.height);
  };

  let mouseMove = (ev) => {
    endX = ev.clientX;
    endY = ev.clientY;
    clearSelection();
    
    if (selecting) {
      ctx.fillStyle = 'rgba(0, 127, 255, 0.3)';
      ctx.strokeStyle = 'rgb(0, 127, 255)'
      ctx.fillRect(startX, startY, endX - startX, endY - startY);
      ctx.strokeRect(startX, startY, endX - startX, endY - startY);
    }
    renderSoftwareMouse();
  };
  let mouseUp = (ev) => {
    if (nativeevents.isLeftMouseButton(ev)) {
      selecting = false;
      let {x: gameStartX, y: gameStartY} = panzoom.screenToGameCoords(startX, startY);
      let {x: gameEndX, y: gameEndY} = panzoom.screenToGameCoords(endX, endY);
      for (let callback of selectCallbacks) {
        let bounds = {
          startX: gameStartX,
          startY: gameStartY,
          endX: gameEndX,
          endY: gameEndY,
        };
        callback(bounds, ev.shiftKey);
      }
      clearSelection();
      renderSoftwareMouse();
    }
  };
  return {
    start: () => {
      capture.addEventListener('mousedown', mouseDown);
      capture.addEventListener('mousemove', mouseMove);
      capture.addEventListener('mouseup', mouseUp);
      capture.addEventListener('contextmenu', (ev) => { ev.preventDefault(); return false; });
    },
    onSelect: (callback) => {
      selectCallbacks.push(callback);
    },
    isInBounds: (bounds, obj) => {
      let between = (p1, p2, o) => {
        let lower = Math.min(p1, p2);
        let upper = Math.max(p1, p2);
        return lower <= o && o <= upper;
      };
      return between(bounds.startX, bounds.endX, obj.x) && between(bounds.startY, bounds.endY, obj.y);
    },
  };
});
