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

// toolsObj.chooseTool();

//Get correct tile by choosing correct tool. if so add tile to inventory and remove from world
toolsObj.getTile = function (world, inventory) {
  world.forEach((row, i) => {
    row.forEach((tile, j) => {
      tile.addEventListener("click", () => {
        toolsObj.takeFromInventory();
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
          console.log("x");
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

// toolsObj.takeFromInventory = function () {
//   console.log(this.storedTiles);
//   this.storedTiles.forEach((stored, idx) => {
//     stored.addEventListener("click", () => {
//       console.log("inventory");
//       stored.classList.add("active-stored");
//     });
//   });
// };

toolsObj.takeFromInventory = function () {
  this.storedTiles.forEach((stored) => {
    stored.addEventListener("click", (e) => {
      if (document.querySelector("button.active-stored")) {
        document.querySelector("button.active-stored").classList.remove("active-stored");
      }
      stored.classList.add("active-stored");
      if (stored.classList.contains("active-stored")) {
        this.activeStored = e.target;
        // this.activeTileList = this[this.activestored];
      }
    });
  });
};
