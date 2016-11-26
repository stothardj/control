define([
  './layers'
], (
  layers
) => {
  let ctx = layers.pause.getContext();
  let canvas = layers.pause.getCanvas();

  return {
    start: () => {
      ctx.fillStyle = 'rgba(0,0,0,0.9)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.font = '48px sans';
      ctx.textAlign = 'center';
      ctx.fillText('Paused', canvas.width / 2, canvas.height / 2);
    },

    showPause: () => {
      canvas.style.display = 'block';
    },

    hidePause: () => {
      canvas.style.display = 'none';
    },
  };
});
