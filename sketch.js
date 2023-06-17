//  Game field array
//
//  0 -> Empty tile
//  1 -> Empty tile where the player can place units
//  2 -> Path for enemy movement : horizon line
//  3 -> Path for enemy movement : vertical line
//  4 -> Path for enemy movement : right to bottom
//  5 -> Path for enemy movement : bottom to left
//  6 -> Path for enemy movement : right to top
//  7 -> Path for enemy movement : top to left
const FIELD_MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 4, 2, 2, 2],
  [2, 2, 5, 1, 1, 1, 3, 1, 1, 0],
  [0, 1, 6, 2, 2, 2, 7, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const FIELD_TILE_SIZE = 50;

const ENEMY_LINE_COLOR = [255];

//  Instances to hold field tiles
let fieldTileManager;

function setup() {
  createCanvas(
    FIELD_MAP[0].length * FIELD_TILE_SIZE,
    FIELD_MAP.length * FIELD_TILE_SIZE
  );
  background(0);
  fieldTileManager = new FieldTileManager(FIELD_MAP, FIELD_TILE_SIZE);
  noLoop();
}

function draw() {
  fieldTileManager.drawTiles();
}

class FieldTileManager {
  constructor(fieldMap, tileSize) {
    this.tileSize = this.tiles = [];
    fieldMap.forEach((row, yIndex) => {
      let rowTiles = [];
      row.forEach((tileType, xIndex) => {
        rowTiles.push(this.#createTile(xIndex, yIndex, tileSize, tileType));
      });
      this.tiles.push(rowTiles);
    });
  }

  drawTiles() {
    this.tiles.forEach((row) => {
      row.forEach((tile) => {
        tile.draw();
      });
    });
  }

  #createTile(xIndex, yIndex, tileSize, tileType) {
    switch (tileType) {
      case 0:
        return new BlankTile(xIndex, yIndex, tileSize);
      case 1:
        return new BlankPlaceableTile(xIndex, yIndex, tileSize);
      case 2:
        return new HorizonLineTile(xIndex, yIndex, tileSize);
      case 3:
        return new VerticalLineTile(xIndex, yIndex, tileSize);
      case 4:
        return new RightBottomCornerTile(xIndex, yIndex, tileSize);
      case 5:
        return new BottomLeftCornerTile(xIndex, yIndex, tileSize);
      case 6:
        return new RightTopCornerTile(xIndex, yIndex, tileSize);
      case 7:
        return new TopLeftCornerTile(xIndex, yIndex, tileSize);
    }
  }
}

class FieldTile {
  constructor(xIndex, yIndex, tileSize) {
    this.xIndex = xIndex;
    this.yIndex = yIndex;
    this.tileSize = tileSize;
  }

  draw() {
    // Need to keep the draw method for FieldTile
  }

  _xPos() {
    return this.xIndex * this.tileSize;
  }

  _yPos() {
    return this.yIndex * this.tileSize;
  }
}

class BlankTile extends FieldTile {
  draw() {
    // Implementation for BlankTile
  }
}

class BlankPlaceableTile extends FieldTile {
  draw() {
    // Implementation for BlankPlaceableTile
  }
}

class HorizonLineTile extends FieldTile {
  draw() {
    const centerY = this._yPos() + this.tileSize / 2;
    stroke(...ENEMY_LINE_COLOR);
    line(this._xPos(), centerY, this._xPos() + this.tileSize, centerY);
  }
}

class VerticalLineTile extends FieldTile {
  draw() {
    const centerX = this._xPos() + this.tileSize / 2;
    stroke(...ENEMY_LINE_COLOR);
    line(centerX, this._yPos(), centerX, this._yPos() + this.tileSize);
  }
}

class RightBottomCornerTile extends FieldTile {
  draw() {
    const endX = this._xPos() + this.tileSize;
    const endY = this._yPos() + this.tileSize;
    const centerX = this._xPos() + this.tileSize / 2;
    const centerY = this._yPos() + this.tileSize / 2;
    stroke(...ENEMY_LINE_COLOR);
    line(centerX, centerY, endX, centerY);
    line(centerX, centerY, centerX, endY);
  }
}

class BottomLeftCornerTile extends FieldTile {
  draw() {
    const endX = this._xPos();
    const endY = this._yPos() + this.tileSize;
    const centerX = this._xPos() + this.tileSize / 2;
    const centerY = this._yPos() + this.tileSize / 2;
    stroke(...ENEMY_LINE_COLOR);
    line(centerX, centerY, centerX, endY);
    line(centerX, centerY, endX, centerY);
  }
}

class RightTopCornerTile extends FieldTile {
  draw() {
    const endX = this._xPos() + this.tileSize;
    const endY = this._yPos();
    const centerX = this._xPos() + this.tileSize / 2;
    const centerY = this._yPos() + this.tileSize / 2;
    stroke(...ENEMY_LINE_COLOR);
    line(centerX, centerY, centerX, endY);
    line(centerX, centerY, endX, centerY);
  }
}

class TopLeftCornerTile extends FieldTile {
  draw() {
    const endX = this._xPos();
    const endY = this._yPos();
    const centerX = this._xPos() + this.tileSize / 2;
    const centerY = this._yPos() + this.tileSize / 2;
    stroke(...ENEMY_LINE_COLOR);
    line(centerX, centerY, centerX, endY);
    line(centerX, centerY, endX, centerY);
  }
}
