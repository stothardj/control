define(() => {
    class Unit {
      constructor(x, y, angle, speed = 1) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed
        this.selected = false;
        this.waypoints = [];
        this.controlgroups = new Set();
      }

      move() {
        if (this.waypoints.length > 0) {
          let waypoint = this.waypoints[0];
          let angleToFace = Math.atan2(waypoint.y - this.y, waypoint.x - this.x);
          this.angle = angleToFace;
          let mX = this.speed * Math.cos(this.angle);
          let mY = this.speed * Math.sin(this.angle);
          this.x += mX;
          this.y += mY;
        }
      };
    }
    return {
      Unit: Unit,
    };
});
