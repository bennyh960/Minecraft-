const tools = [...document.querySelectorAll(".tools")];
export const toolsObj = {
  shovel: ["floor-tile-up", "floor-tile-center"],
  axe: ["tree-trunk", "tree-leaf"],
  pickaxe: ["rock1", "rock2", "rock3", "rock4", "rock5", "wall"],
  activeTool: "shovel",
  activeTileList: [],
  storedTiles: [],
  activeStored: "",
};

// define tool to work with
toolsObj.chooseTool = function () {
  tools.forEach((tool) => {
    tool.addEventListener("click", (e) => {
      if (document.querySelector("button.active")) {
        document.querySelector("button.active").classList.remove("active");
      }
      tool.classList.add("active");
      if (tool.classList.contains("active")) {
        this.activeTool = e.target.id.toString();
        this.activeTileList = this[this.activeTool];
      }
    });
  });
};

//Get correct tile by choosing correct tool. if so add tile to inventory and remove from world
toolsObj.getTile = function (world, inventory) {
  world.forEach((row, i) => {
    row.forEach((tile, j) => {
      tile.addEventListener("click", () => {
        toolsObj.takeFromInventory();
        if (this.activeStored[0]) {
          world[i][j].setAttribute("tileType", this.activeStored[0].getAttribute("tileType"));
          world[i][j].setAttribute("data-open", "false");
          this.activeStored[0].animate(rotateTile, animateTiming);
          inventory.removeChild(this.activeStored[0]);
          this.storedTiles.splice([this.activeStored[1]], 1);
          this.activeStored[0] = undefined;
          this.activeStored[1] = undefined;
          tile.animate(rotateTile, animateTiming);

          setInterval(function () {
            apllyPyshics(world, i, j);
          }, 1000);
          return;
        }
        if (this.activeTileList.includes(tile.getAttribute("tileType"))) {
          if (inventory.childElementCount < 13 && tile.getAttribute("data-open") === "false") {
            let tempTile = document.createElement("button");
            tempTile.setAttribute("tileType", tile.getAttribute("tileType"));
            tempTile.setAttribute("data-open", "true");
            inventory.appendChild(tempTile);
            tempTile.animate(rotateTile, animateTiming);
            this.storedTiles.push(tempTile);
          } else {
            inventory.animate(wrongTool, animateTiming);
          }
          world[i][j].setAttribute("tileType", "");
          world[i][j].setAttribute("data-open", "true");
          tile.animate(rotateTile, animateTiming);
        } else if (tile.getAttribute("data-open") === "false") {
          // console.log("x");
          tile.animate(wrongTool, animateTiming);
        }
      });
      // }
    });
  });
};

const rotateTile = [{ transform: "rotate(0) scale(1)" }, { transform: "rotate(360deg) scale(0)" }];
const wrongTool = [{ border: "solid 1rem red" }, { border: "" }];

const animateTiming = {
  duration: 500,
  iterations: 1,
};

toolsObj.takeFromInventory = function () {
  this.storedTiles.forEach((stored, idx) => {
    stored.addEventListener("click", (e) => {
      if (document.querySelector("button.active-stored")) {
        document.querySelector("button.active-stored").classList.remove("active-stored");
      }
      stored.classList.add("active-stored");
      if (stored.classList.contains("active-stored")) {
        this.activeStored = [e.target, idx];
        // this.activeTileList = this[this.activestored];
      }
    });
  });
};

//! not working yet floor pyshics
function apllyPyshics(world, i, j) {
  if (
    i > 1 &&
    i < 18 &&
    j > 1 &&
    j < 90 &&
    world[i][j].getAttribute("data-open") === "false" &&
    world[i + 1][j].getAttribute("data-open") === "true"
  ) {
    const type = world[i][j].getAttribute("tileType");
    world[i][j].setAttribute("tileType", "");
    world[i][j].setAttribute("data-open", "true");
    world[i + 1][j].setAttribute("tileType", type);
    world[i + 1][j].setAttribute("data-open", "false");
    world[i + 1][j].classList.add("cell");
  }
  return setInterval(apllyPyshics(world, i + 1, j), 2500);
}
