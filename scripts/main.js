define(['./movecommand', './layers', './selection', './panzoom', './random', './ling',
    './unitselection', './game', './unitwaypoints', './controlgroups',
    './wall', './pathable'], (movecommand, layers, selection, panzoom,
      random, ling, unitselection, game, unitwaypoints, controlgroups, wall,
      pathable) => {
  let ctx = layers.game.getContext();
  let width = layers.game.getCanvas().width;
  let height = layers.game.getCanvas().height;
  let units = [];
  let walls = [];
  let dim = () => game.getCurrentLevel().getDimensions();
  for (let i=0; i<10; i++) {
    let x = random.rand(0, dim().width);
    let y = random.rand(0, dim().height);
    let width = random.rand(10, 100);
    let height = random.rand(10, 100);
    walls.push(new wall.Wall(x, y, width, height));
  }
  let pathingGrid = pathable.computeGrid(20, walls);
  for (let i=0; i<30; i++) {
    let x = random.rand(0, dim().width);
    let y = random.rand(0, dim().height);
    let angle = random.rand(0, 2*Math.PI);
    let l = new ling.Ling(x, y, angle);
    units.push(l);
  }
  selection.start();
  panzoom.start();
  unitwaypoints.start();
  controlgroups.start();
  selection.onSelect((bounds, additive) => {
    for (let unit of units) {
      if (selection.isInBounds(bounds, unit)) {
        unit.selected = true;
      } else if (!additive) {
        unit.selected = false;
      }
    }
  });
  unitwaypoints.onSetWaypoint((waypoint, additive) => {
    for (let unit of units) {
      if (unit.selected) {
        let command = new movecommand.MoveCommand(unit, waypoint);
        if (additive) {
          unit.commands.push(command);
        } else {
          unit.commands = [command];
        }
      }
    }
  });
  controlgroups.onSetControlGroup((controlGroup, additive) => {
    for (let unit of units) {
      if (unit.selected) {
        unit.controlgroups.add(controlGroup);
      } else if (!additive) {
        unit.controlgroups.delete(controlGroup);
      }
    }
  });
  controlgroups.onSelectControlGroup((controlGroup, additive) => {
    for (let unit of units) {
      if (unit.controlgroups.has(controlGroup)) {
        unit.selected = true;
      } else if (!additive) {
        unit.selected = false;
      }
    }
  });
  window.setInterval(() => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    panzoom.withPanZoom(() => {
      ctx.strokeStyle = '#FF00AA';
      ctx.strokeRect(0, 0, dim().width, dim().height);
      for (let wall of walls) {
        wall.draw();
      }
      for (let unit of units) {
        unit.takeAction();
        if (unit.selected) unitselection.drawSelected(unit);
        unit.draw();
      }
      pathingGrid.draw();
    })},
    60);
  return {};
});
