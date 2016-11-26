define([
  './command',
], (
  command
) => {
  class MoveCommand extends command.Command {
    constructor(unit, dest) {
      super(unit);
      this.dest = dest;
    }

    step() {
      let angleToFace = Math.atan2(this.dest.y - this.unit.y, this.dest.x - this.unit.x);
      this.unit.angle = angleToFace;
      let mX = this.unit.speed * Math.cos(this.unit.angle);
      let mY = this.unit.speed * Math.sin(this.unit.angle);
      this.unit.x += mX;
      this.unit.y += mY;
    }

    isDone() {
      let dx = this.unit.x - this.dest.x;
      let dy = this.unit.y - this.dest.y;
      return dx*dx + dy*dy < 1;
    }
  }

  return {
    MoveCommand: MoveCommand,
  };
});
