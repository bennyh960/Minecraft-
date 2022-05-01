import { changeView } from "./settings.js";
import { toolsObj } from "./gameLogic.js";
import { drawWorld, drawFloor, clearDraw } from "./draw.js";

let randomBtn = document.querySelector("#random");
let resetBtn = document.querySelector("#reset");
const inventory = document.querySelector(".inventory");

// draw 2d world
const world = drawWorld();

// just make 2 types of floor with world creation
drawFloor();
//
randomBtn.addEventListener("click", () => {
  location.reload();
});

// ! bugs to fix with random creation
resetBtn.addEventListener("click", () => {
  clearDraw(world);
  drawWorld();
});

// todo add more tiles
// drawRandom();
changeView();

// ============================================

// ==============
toolsObj.chooseTool();
toolsObj.getTile(world, inventory);

//
