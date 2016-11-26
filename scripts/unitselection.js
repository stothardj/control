define([
  './layers',
], (
  layers
) => {
  let ctx = layers.game.getContext();

  return {
    drawSelected: (unit) => {
      ctx.fillStyle = 'rgba(30,255,0,0.1)';
      ctx.strokeStyle = 'rgba(60,255,0,0.1)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(unit.x, unit.y, 12, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();
    },
    drawFocused: (unit) => {
    },
  };
});
