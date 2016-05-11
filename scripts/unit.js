define(() => {
    class Unit {
      constructor(x, y, angle, speed = 1) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed
        this.selected = false;
        this.controlgroups = new Set();
        this.commands = [];
      }

      takeAction() {
        if (this.commands.length > 0) {
          let command = this.commands[0];
          command.step();
          if (command.isDone()) this.commands.shift();
        }
      }
    }
    return {
      Unit: Unit,
    };
});
