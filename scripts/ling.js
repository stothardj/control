define(['./canvas', './unit'], (canvas, unit) => {
  class Ling extends unit.Unit {
    constructor(x, y, angle) {
      super(x, y, angle);
    }

    draw() {
      let ctx = canvas.ctxmap['game'];
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(-5, 5);
      ctx.lineTo(-5, -5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  };
  return {
    Ling: Ling,
  };
});
