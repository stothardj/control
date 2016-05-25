define(['./layers'], (layers) => {
  class Wall {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    draw() {
      let ctx = layers.game.getContext();
      ctx.fillStyle = 'blue';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  return {
    Wall: Wall,
  };
});
