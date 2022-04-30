import { changeView } from "./settings.js";
// import { getTile } from "./gameLogic.js";
import { toolsObj } from "./gameLogic.js";
import { drawWorld, drawFloor, clearDraw } from "./draw.js";
// todo add randomFloor after fix it in setting and del the drawfloor from here

let randomBtn = document.querySelector("#random");

// draw 2d world
const world = drawWorld();
// world[0][2].setAttribute("tileType", "rock1");
// world[0][3].setAttribute("tileType", "floor-tile-center");
// world[0][4].setAttribute("tileType", "floor-tile-center");
// world[1][3].setAttribute("tileType", "floor-tile-center");
// console.log(world[0][2]).getAttribute("tileType");

// reset data //todo add reset button
function reset(numOfRows) {
  gridDivsList[gridDivsList.length - numOfRows].forEach((row) => {
    if (row.getAttribute("data-open") === "true") {
      row.setAttribute("tileType", tileType);
      row.setAttribute("data-open", "false");
    }
  });
}

drawFloor();
//
randomBtn.addEventListener("click", () => {
  drawFloor();
  // apllyPyshics();
  // clearDraw(world);
  // drawWorld();
});

// todo add more tiles
// drawRandom();
changeView();

// ============================================
const inventory = document.querySelector(".inventory");

// ==============
toolsObj.chooseTool();
toolsObj.getTile(world, inventory);
