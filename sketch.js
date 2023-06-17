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
        rowTiles.push(new FieldTile(xIndex, yIndex, tileType, tileSize));
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
}

class FieldTile {
  constructor(xIndex, yIndex, tileType, tileSize) {
    this.xIndex = xIndex;
    this.yIndex = yIndex;
    this.tileType = tileType;
    this.tileSize = tileSize;
  }

  draw() {
    switch (this.tileType) {
      case 0:
        this.#drawBlank();
        break;
      case 1:
        this.#drawBlankPlaceable();
        break;
      case 2:
        this.#drawHorizonLine();
        break;
      case 3:
        this.#drawVerticalLine();
        break;
      case 4:
        this.#drawRightBottomCorner();
        break;
      case 5:
        this.#drawBottomLeftCorner();
        break;
      case 6:
        this.#drawRightTopCorner();
        break;
      case 7:
        this.#drawTopLeftCorner();
        break;
    }
  }

  #drawBlank() {}

  #drawBlankPlaceable() {}

  #drawHorizonLine() {
    const centerY = this.#yPos() + this.tileSize / 2;
    stroke(...ENEMY_LINE_COLOR);
    line(this.#xPos(), centerY, this.#xPos() + this.tileSize, centerY);
  }

  #drawVerticalLine() {
    const centerX = this.#xPos() + this.tileSize / 2;
    stroke(...ENEMY_LINE_COLOR);
    line(centerX, this.#yPos(), centerX, this.#yPos() + this.tileSize);
  }

  #drawRightBottomCorner() {
    const endX = this.#xPos() + this.tileSize;
    const endY = this.#yPos() + this.tileSize;
    const centerX = this.#xPos() + this.tileSize / 2;
    const centerY = this.#yPos() + this.tileSize / 2;
    stroke(...ENEMY_LINE_COLOR);
    line(centerX, centerY, endX, centerY);
    line(centerX, centerY, centerX, endY);
  }

  #drawBottomLeftCorner() {
    const endX = this.#xPos();
    const endY = this.#yPos() + this.tileSize;
    const centerX = this.#xPos() + this.tileSize / 2;
    const centerY = this.#yPos() + this.tileSize / 2;
    stroke(...ENEMY_LINE_COLOR);
    line(centerX, centerY, centerX, endY);
    line(centerX, centerY, endX, centerY);
  }

  #drawRightTopCorner() {
    const endX = this.#xPos() + this.tileSize;
    const endY = this.#yPos();
    const centerX = this.#xPos() + this.tileSize / 2;
    const centerY = this.#yPos() + this.tileSize / 2;
    stroke(...ENEMY_LINE_COLOR);
    line(centerX, centerY, centerX, endY);
    line(centerX, centerY, endX, centerY);
  }

  #drawTopLeftCorner() {
    const endX = this.#xPos();
    const endY = this.#yPos();
    const centerX = this.#xPos() + this.tileSize / 2;
    const centerY = this.#yPos() + this.tileSize / 2;
    stroke(...ENEMY_LINE_COLOR);
    line(centerX, centerY, centerX, endY);
    line(centerX, centerY, endX, centerY);
  }

  #xPos() {
    return this.xIndex * this.tileSize;
  }

  #yPos() {
    return this.yIndex * this.tileSize;
  }
}
