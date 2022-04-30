let viewBool = false;

export function changeView(params) {
  const changeView = document.querySelector("#change-view");

  changeView.addEventListener("click", (e) => {
    const containerAllView = document.querySelector(".container-all");
    const window = document.querySelector(".window");
    const gameBoard = document.querySelector(".container-world ");
    const grid = document.querySelector(".grid ");
    if (viewBool) {
      containerAllView.style.flexDirection = "column";
      window.style.width = "100vw";
      window.style.height = "30vh";
      window.setAttribute("data-view", "vertical");
      grid.style.height = "70vh";
      gameBoard.style.width = "100vw";
      viewBool = false;
    } else {
      containerAllView.style.flexDirection = "";
      window.style.width = "25vw";
      window.style.height = "100vh";
      window.setAttribute("data-view", "horizon");
      //   gameBoard.style.height = "100vh";
      grid.style.height = "100vh";
      gameBoard.style.width = "75vw";
      viewBool = true;
    }
  });
}

// random
// export const randomFloor = function drawFloor() {
//   let tileType;
//   const maxHight = 7;
//   const random = 2 + Math.random() * maxHight;
//   for (let i = 1; i < random; i++) {
//     i < random - 1 ? (tileType = "floor-tile-center") : (tileType = "floor-tile-up");
//     gridDivsList[gridDivsList.length - i].forEach((floor) => {
//       floor.classList.add(tileType);
//     });
//   }
// };
