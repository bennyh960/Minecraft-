const tileSize = 30;
const columns = 100;
const rows = 20;
export const gridDivsList = [];
let divRowsList = [];
const gridContainer = document.querySelector(".grid");

// create world and draw it by appending style class and data attribute to each tile
export function drawWorld(obj) {
  for (let row = 0; row < rows; row++) {
    divRowsList = [];
    for (let column = 0; column < columns; column++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-open", "true");
      cell.setAttribute("tileType", "x");
      gridContainer.appendChild(cell);
      divRowsList.push(cell);
      cell.animate(rotateTile, animateTiming);
    }
    gridDivsList.push(divRowsList);
  }

  drawObjectInWorld(gridDivsList);
  return gridDivsList;
}

// draw floor with random hight
export function drawFloor() {
  let tileType;
  const maxHight = 3;
  const random = 2 + Math.random() * maxHight;
  for (let i = 1; i < random; i++) {
    i < random - 1 ? (tileType = "floor-tile-center") : (tileType = "floor-tile-up");
    gridDivsList[gridDivsList.length - i].forEach((floor) => {
      if (floor.getAttribute("data-open") === "true") {
        floor.setAttribute("tileType", tileType);
        floor.setAttribute("data-open", "false");
        // console.log(floor.getAttribute("tileType")); //todo del log
      }
    });
  }
  // apllyPyshics(maxHight);
}

// !need to delete the previews world
export function clearDraw(worldGrid) {
  worldGrid.forEach((row) => {
    row.forEach((tile) => {
      tile.classList.remove("cell");
      tile.setAttribute("data-open", "false");
      tile.setAttribute("tileType", "");
    });
  });
  // gridDivsList.splice(0,20);
  // return gridDivsList;
}

// draw shapes
function drawTile(world, x, y) {
  const { type, data } = this;
  world[y][x].setAttribute("tileType", type);
  world[y][x].setAttribute("data-open", data);
}

const grass = {
  type: "floor-tile-up",
  data: "false",
};
const ground = {
  type: "floor-tile-center",
  data: "false",
};
const rock1 = {
  type: "rock1",
  data: "false",
};
const rock2 = {
  type: "rock2",
  data: "false",
};
const rock3 = {
  type: "rock3",
  data: "false",
};
const rock4 = {
  type: "rock4",
  data: "false",
};
const rock5 = {
  type: "rock5",
  data: "false",
};
const tree1 = {
  type: "tree-trunk",
  data: "false",
};
const tree2 = {
  type: "tree-leaf",
  data: "false",
};

grass.drawTile = drawTile;
ground.drawTile = drawTile;
rock1.drawTile = drawTile;
rock2.drawTile = drawTile;
rock3.drawTile = drawTile;
rock4.drawTile = drawTile;
rock5.drawTile = drawTile;
tree1.drawTile = drawTile;
tree2.drawTile = drawTile;

function drawSquare(tileObj, world, x, width, y, height) {
  const rect = [x, width, y, height];
  for (let w = 0; w < rect[1]; w++) {
    for (let h = 0; h < rect[3]; h++) {
      tileObj.drawTile(world, w + rect[0], h + rect[2]);
    }
  }
}

// ! cant draw on coords 0 bug
// ! intervalrandom max value cant be higher than 23
const intervalMax = 22;
function drawObjectInWorld(world) {
  let randomY = Math.floor(Math.random() * 10);
  let intervalRandom = Math.max(Math.floor(Math.random() * intervalMax), 5);

  drawTreesAndGround(world, intervalRandom, randomY);
  drawHome(world, intervalRandom - 10);
}

// ==========================================
function drawHome(world, rand1) {
  drawSquare(rock5, world, 4, rand1, 11, 7);
  for (let i = 0; i < 10; i++) {
    drawSquare(rock4, world, 2 + i, rand1 + 4 - i * 2, 10 - i, 1);
  }
  drawSquare(rock5, world, 52, rand1, 11, 7);
  for (let i = 0; i < 10; i++) {
    drawSquare(rock4, world, 50 + i, rand1 + 4 - i * 2, 10 - i, 1);
  }
  drawSquare(rock5, world, 92 - rand1, rand1, 8, 11);
  for (let i = 0; i < 10; i++) {
    drawSquare(rock4, world, 90 + i - rand1, rand1 + 4 - i * 2, 10 - i, 1);
  }
}

function drawTreesAndGround(world, rand1, rand2) {
  let startX = 23;
  let startY = 13; //18 is the first start so y+h must be 18

  drawDimonds(rock3, world, 1);
  drawDimonds(rock2, world, 2);
  drawDimonds(rock4, world, 2);
  for (let times = 0; times < 9; times += 2) {
    drawSquare(tree2, world, startX, 3, startY - rand2, 3 + rand2);
    drawSquare(tree1, world, startX + 1, 1, startY + 3 - rand2, 2 + rand2);
    drawSquare(grass, world, 0, world[0].length, startY + 5, 1);
    startX += rand1;
  }
  drawSquare(ground, world, 0, world[0].length, startY + 6, world.length - startY - 6);
  // draw dimonds
}
// ==============================================================

function drawDimonds(type, world, h) {
  const randX = Math.floor(Math.random() * 10);
  for (let i = 0; i < world[0].length - 11; i += 5) {
    const randY = Math.floor(Math.random() * 2);
    const width = Math.floor(Math.random() * 3);
    // const hight = Math.floor(Math.random() * 3);
    drawSquare(type, world, randX + i, width, 18 - randY, h);
  }
}

const rotateTile = [{ transform: "rotate(0) scale(1)" }, { transform: "rotate(360deg) scale(0)" }];
const animateTiming = {
  duration: 500,
  iterations: 1,
};
