define([
  './game',
  './layers',
], (
  game,
  layers
) => {
  let dim = () => game.getCurrentLevel().getDimensions();
  class Cell {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    equals(other) {
      return this.x == other.x && this.y == other.y;
    }
  }
  // Operates in O(N). Not using built-in Set object because that uses ===
  // which is address comparison for objects.
  class DumbSet {
    constructor() {
      this.objs = [];
    }

    has(obj) {
      for (let o of this.objs) {
        if (o.equals(obj)) return true;
      }
      return false;
    }

    add(obj) {
      if (!this.has(obj)) this.objs.push(obj);
    }
  }
  class PathingGrid {
    constructor(blockedCells, cellSize) {
      this.blockedCells = blockedCells;
      this.cellSize = cellSize;
    }

    // For debugging
    draw() {
      let ctx = layers.game.getContext();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      for (let x = 0; x < dim().width; x += this.cellSize) {
        for (let y = 0; y < dim().height; y += this.cellSize) {
          if (this.blockedCells.has(new Cell(x, y))) {
            ctx.fillRect(x, y, this.cellSize, this.cellSize);
          } else {
            ctx.strokeRect(x, y, this.cellSize, this.cellSize);
          }
        }
      }
    }

    findPath(start, end) {
      return [end];
    }
  }
  let snapToGrid = (val, cellSize) => {
    return val - (val % cellSize);
  };
  let computeBlockedCells = (cellSize, wall) => {
    let blockedCells = [];
    for (let x = snapToGrid(wall.x, cellSize); x < wall.x + wall.width; x += cellSize) {
      for (let y = snapToGrid(wall.y, cellSize); y < wall.y + wall.height; y += cellSize) {
        blockedCells.push(new Cell(x, y));
      }
    }
    return blockedCells;
  };
  let computeGrid = (cellSize, walls) => {
    let blockedCells = new DumbSet();
    for (let wall of walls) {
      let cellsBlockedByWall = computeBlockedCells(cellSize, wall);
      for (let cell of  cellsBlockedByWall) {
        blockedCells.add(cell);
      }
    }
    return new PathingGrid(blockedCells, cellSize);
  };

  return {
    computeGrid: computeGrid,
  };
});
