document.addEventListener("DOMContentLoaded", (event) => {
  const grid = document.querySelector(".grid");
  const squares = [...document.querySelectorAll(".grid div")];
  const ScoreDisplay = document.querySelector("#score");
  const StartBtn = document.querySelector("#start-button");
  const GRID_WIDTH = 10;

  //   The tetrominos (using grid indeces)
  const lTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
    [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2],
  ];

  const zTetromino = [
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
  ];

  const tTetromino = [
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
  ];

  const iTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
  ];

  const theTettominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

  //   example position and rotation
  //   let currentPosition = 4;
  //   let current = theTettominoes[0][0];
  let currentPosition = 4;
  let currentRotation = 0;
  // random for game
  let random = Math.floor(Math.random() * theTettominoes.length);
  let current = theTettominoes[random][currentRotation];

  //draw the tertomino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetromino");
    });
  }

  //   draw();
  //undraw the tertomino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
    });
  }

  //   make the tertomino move down every second
  timerID = setInterval(moveDown, 1000);

  //   assign function to keycode
  function control(e) {
    if (e.key === "ArrowLeft") {
      moveLeft();
    } else if (e.key === "ArrowRight") {
      //moveright
      moveRight();
    } else if (e.key === "ArrowUp") {
      //rotate
      rotate();
    } else if (e.key === "ArrowDown") {
      //faster
      moveDown();
    }
  }

  document.addEventListener("keyup", control);

  //movedown function
  function moveDown() {
    undraw();
    currentPosition += GRID_WIDTH;
    draw();
    freeze();
  }

  //   freeze function
  function freeze() {
    // draw();
    if (current.some((index) => squares[currentPosition + index].classList.contains("taken"))) {
      current.forEach((index) => squares[currentPosition + index - GRID_WIDTH].classList.add("taken"));
      //start a new tertomino falling
      random = Math.floor(Math.random() * theTettominoes.length);
      current = theTettominoes[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }

  // move the tertomino left unless it at the edge or is blockpage
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some((index) => (currentPosition + index) % GRID_WIDTH === 0);
    if (!isAtLeftEdge) currentPosition -= 1;
    if (current.some((index) => squares[currentPosition + index].classList.contains("taken"))) currentPosition += 1;
    draw();
  }
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some((index) => (currentPosition + index) % GRID_WIDTH === GRID_WIDTH - 1);
    if (!isAtRightEdge) currentPosition += 1;
    if (current.some((index) => squares[currentPosition + index].classList.contains("taken"))) currentPosition -= 1;
    draw();
  }

  //   rotate the tertomino
  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) currentRotation = 0;
    current = theTettominoes[random][currentRotation];
    draw();
  }
});

// stoped on 1:05 https://www.youtube.com/watch?v=w1JJfK09ujQ&t=3s&ab_channel=CodewithAniaKub%C3%B3w
