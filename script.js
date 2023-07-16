function randomRow(nRows) {
  return Math.floor(Math.random() * nRows);
}
function randomCol(nCols) {
  return Math.floor(Math.random() * nCols);
}
function resetMoves() {
  const nMoves = document.getElementById("nMoves");
  nMoves.innerHTML = 0;
}
function checkIfHighScore() {
  let nMoves = document.getElementById("nMoves");
  let curMoves = nMoves.innerHTML;
  console.log(curMoves);
  let first = Number(localStorage.getItem("First"));
  let second = Number(localStorage.getItem("Second"));
  let third = Number(localStorage.getItem("Third"));
  console.log(first);
  if (first > Number(curMoves) || first == 0 || isNaN(first)) {
    if (!isNaN(first) && first != 0) {
      localStorage.setItem("Second", first);
    }
    if (!isNaN(second) && second != 0) {
      localStorage.setItem("Third", second);
    }
    localStorage.setItem("First", curMoves);
  } else if (second > Number(curMoves) || second == 0 || isNaN(second)) {
    localStorage.setItem("Second", curMoves);
    if (!isNaN(second) && second != 0) {
      localStorage.setItem("Third", second);
    }
  } else if (third > Number(curMoves) || third == 0 || isNaN(third)) {
    localStorage.setItem("Third", curMoves);
  }
  displayScore();
}
function displayScore() {
  let firstBox = document.getElementById("first");
  let secondBox = document.getElementById("second");
  let thirdBox = document.getElementById("third");
  let first = Number(localStorage.getItem("First"));
  let second = Number(localStorage.getItem("Second"));
  let third = Number(localStorage.getItem("Third"));
  console.log(first);
  if (!isNaN(first) && first != 0) {
    firstBox.innerHTML = first + "";
  }
  if (!isNaN(second) && second != 0) {
    secondBox.innerHTML = second + "";
  }
  if (!isNaN(third) && third != 0) {
    thirdBox.innerHTML = third + "";
  }
}

function drawBoard(nRows, nCols, nCells) {
  const board = document.getElementById("board");
  board.style.display = "flex";
  board.innerHTML = "";
  const boardContainer = document.getElementById("boardContainer");
  const height = boardContainer.clientHeight;
  winText = document.getElementById("winText");
  console.log(height);
  winText.style.display = "none";
  for (let row = 0; row < nRows; row++) {
    for (let col = 0; col < nCols; col++) {
      let div = document.createElement("div");
      div.classList.add("tile");
      div.setAttribute("id", `r${row}c${col}`);
      div.style.width = `${40 / nCols}vh`;
      div.style.height = `${40 / nRows}vh`;
      div.style.top = `${(row / nRows) * 100}%`;
      div.style.left = `${(col / nCols) * 100}%`;
      div.innerHTML = 1 + row * nCols + col;
      board.append(div);
    }
  }
  let counter1 = 0;

  for (let r = 0; r < nRows; r++) {
    for (let c = 0; c < nCols; c++) {
      if (r != nRows - 1 || c != nCols - 1) {
        let row = randomRow(nRows);
        let col = randomCol(nCols);
        if ((row != nRows - 1 || col != nCols - 1) && (row != r || col != c)) {
          let div1 = document.getElementById(`r${r}c${c}`);
          let div2 = document.getElementById(`r${row}c${col}`);
          let temp1 = div1.innerHTML;
          div1.innerHTML = div2.innerHTML;
          div2.innerHTML = temp1;
          counter1++;
        }
      }
      if (counter1 % 2 != 0) {
        c--;
      }
    }
  }

  let r = randomRow(nRows);
  let c = randomCol(nCols);
  console.log(Number(nRows) - 1 - r + Number(nCols) - 1 - c);
  if ((Number(nRows) - 1 - r + Number(nCols) - 1 - c) % 2 != 0) {
    swapTiles(`r${r}c${c}`, `r${nRows - 1}c${nCols - 1}`);
  }

  createEmptyTile(nCells);
  resetMoves();

  try {
    board.removeEventListener("click", ab);
  } catch {}
  board.addEventListener(
    "click",
    (ab = function (e) {
      swap(nRows, nCols, nCells, e);
    })
  );
}
function createEmptyTile(nCells) {
  const tileList = document.querySelectorAll(".tile");
  for (let i = 0; i < nCells; i++) {
    if (tileList[i].innerHTML == nCells) {
      tileList[i].style.display = "None";
    }
  }
}
function swapTiles(id1, id2) {
  let div1 = document.getElementById(id1);
  let div2 = document.getElementById(id2);
  let temp1 = div1.innerHTML;
  div1.innerHTML = div2.innerHTML;
  div2.innerHTML = temp1;
  div2.style.display = "flex";
  div1.style.display = "none";
}
function swapInnerHTML(id1, id2) {
  let div1 = document.getElementById(id1);
  let div2 = document.getElementById(id2);
  let temp1 = div1.innerHTML;
  div1.innerHTML = div2.innerHTML;
  div2.innerHTML = temp1;
}
function swapDisplay(id1, id2) {
  let div1 = document.getElementById(id1);
  let div2 = document.getElementById(id2);
  div2.style.display = "flex";
  div1.style.display = "none";
}
function checkLeft(row, col, nCells) {
  if (col > 0) {
    let emptyTile = document.getElementById(`r${row}c${col - 1}`);
    if (emptyTile.innerHTML == nCells) {
      return 1;
    } else {
      return 0;
    }
  }
}
function checkRight(row, col, nCols, nCells) {
  if (col < nCols - 1) {
    let emptyTile = document.getElementById(`r${row}c${col + 1}`);
    if (emptyTile.innerHTML == nCells) {
      return 1;
    } else {
      return 0;
    }
  }
}
function checkAbove(row, col, nCells) {
  if (row > 0) {
    let emptyTile = document.getElementById(`r${row - 1}c${col}`);
    if (emptyTile.innerHTML == nCells) {
      return 1;
    } else {
      return 0;
    }
  }
}
function checkBelow(row, col, nRows, nCells) {
  if (row < nRows - 1) {
    let emptyTile = document.getElementById(`r${row + 1}c${col}`);
    if (emptyTile.innerHTML == nCells) {
      return 1;
    } else {
      return 0;
    }
  }
}
function checkWin(nCells, nRows, nCols) {
  const list = document.getElementsByClassName("tile");
  for (let i = 0; i < nCells; i++) {
    let r = Number(list[i].id[1]);
    let c = Number(list[i].id[3]);
    if (list[i].innerHTML != 1 + r * nCols + c) {
      return;
    }
  }
  checkIfHighScore();
  console.log("Win");
  board = document.getElementById("board");
  board.style.display = "none";
  winText = document.getElementById("winText");
  winText.style.display = "block";
  setTimeout(resetBoard, 4000);
}

function swap(nRows, nCols, nCells, e) {
  let nMoves = document.getElementById("nMoves");
  let tileClicked = e.target.id;
  let row = Number(tileClicked[1]);
  let col = Number(tileClicked[3]);
  const tile = document.getElementById(`r${row}c${col}`);
  if (checkAbove(row, col, nCells)) {
    tile.style.transform = "translateY(-100%) rotateZ(360deg)";
    setTimeout(function () {
      tile.style.transform = "none";
    }, 300);
    setTimeout(function () {
      swapInnerHTML(`r${row}c${col}`, `r${row - 1}c${col}`);
    }, 10);
    setTimeout(function () {
      swapDisplay(`r${row}c${col}`, `r${row - 1}c${col}`);
    }, 300);
  } else if (checkBelow(row, col, nRows, nCells)) {
    tile.style.transform = "translateY(100%) rotateZ(360deg)";
    setTimeout(function () {
      tile.style.transform = "none";
    }, 300);
    setTimeout(function () {
      swapInnerHTML(`r${row}c${col}`, `r${row + 1}c${col}`);
    }, 10);
    setTimeout(function () {
      swapDisplay(`r${row}c${col}`, `r${row + 1}c${col}`);
    }, 300);
  } else if (checkLeft(row, col, nCells)) {
    tile.style.transform = "translateX(-100%) rotateZ(360deg)";

    setTimeout(function () {
      tile.style.transform = "none";
    }, 300);
    setTimeout(function () {
      swapInnerHTML(`r${row}c${col}`, `r${row}c${col - 1}`);
    }, 10);
    setTimeout(function () {
      swapDisplay(`r${row}c${col}`, `r${row}c${col - 1}`);
    }, 300);
  } else if (checkRight(row, col, nCols, nCells)) {
    tile.style.transform = "translateX(100%) rotateZ(360deg)";
    setTimeout(function () {
      tile.style.transform = "none";
    }, 300);
    setTimeout(function () {
      swapInnerHTML(`r${row}c${col}`, `r${row}c${col + 1}`);
    }, 10);
    setTimeout(function () {
      swapDisplay(`r${row}c${col}`, `r${row}c${col + 1}`);
    }, 300);
  } else {
    return;
  }
  nMoves.innerHTML = Number(nMoves.innerHTML) + 1;
  setTimeout(function () {
    checkWin(nCells, nRows, nCols);
  }, 300);
}

function start() {
  const rowInput = document.getElementById("nRows");
  const colInput = document.getElementById("nCols");
  rowInput.value = 3;
  colInput.value = 3;
  drawBoard(rowInput.value, colInput.value, rowInput.value * colInput.value);
}
function resetBoard() {
  const rowInput = document.getElementById("nRows");
  const colInput = document.getElementById("nCols");
  nRows = rowInput.value;
  nCols = colInput.value;
  drawBoard(nRows, nCols, nRows * nCols);
}
function clearScores() {
  localStorage.clear();
  let firstBox = document.getElementById("first");
  let secondBox = document.getElementById("second");
  let thirdBox = document.getElementById("third");
  firstBox.innerHTML = "-";
  secondBox.innerHTML = "-";
  thirdBox.innerHTML = "-";
}
function KeyEvent(e) {
  let nMoves = document.getElementById("nMoves");
  const rowInput = document.getElementById("nRows");
  const colInput = document.getElementById("nCols");
  let tile;
  nRows = rowInput.value;
  nCols = colInput.value;
  console.log(e.code);
  const tileList = document.querySelectorAll(".tile");
  for (let i = 0; i < nRows * nCols; i++) {
    if (tileList[i].innerHTML == nRows * nCols) {
      tile = tileList[i];
      break;
    }
  }
  let r = Number(tile.id[1]);
  let c = Number(tile.id[3]);
  console.log(r, c);
  if (e.code == "ArrowUp" && r < nRows - 1) {
    let tile2 = document.getElementById(`r${r + 1}c${c}`);
    tile2.style.transform = "translateY(-100%) rotateZ(360deg)";
    setTimeout(function () {
      tile2.style.transform = "none";
    }, 300);
    setTimeout(function () {
      swapInnerHTML(`r${r + 1}c${c}`, `r${r}c${c}`);
    }, 10);
    setTimeout(function () {
      swapDisplay(`r${r + 1}c${c}`, `r${r}c${c}`);
    }, 300);
  } else if (e.code == "ArrowDown" && r > 0) {
    let tile2 = document.getElementById(`r${r - 1}c${c}`);
    tile2.style.transform = "translateY(100%) rotateZ(360deg)";
    setTimeout(function () {
      tile2.style.transform = "none";
    }, 300);
    setTimeout(function () {
      swapInnerHTML(`r${r - 1}c${c}`, `r${r}c${c}`);
    }, 10);
    setTimeout(function () {
      swapDisplay(`r${r - 1}c${c}`, `r${r}c${c}`);
    }, 300);
  } else if (e.code == "ArrowLeft" && c < nCols - 1) {
    let tile2 = document.getElementById(`r${r}c${c + 1}`);
    tile2.style.transform = "translateX(-100%) rotateZ(360deg)";
    setTimeout(function () {
      tile2.style.transform = "none";
    }, 300);
    setTimeout(function () {
      swapInnerHTML(`r${r}c${c + 1}`, `r${r}c${c}`);
    }, 10);
    setTimeout(function () {
      swapDisplay(`r${r}c${c + 1}`, `r${r}c${c}`);
    }, 300);
  } else if (e.code == "ArrowRight" && c > 0) {
    let tile2 = document.getElementById(`r${r}c${c - 1}`);
    tile2.style.transform = "translateX(100%) rotateZ(360deg)";
    setTimeout(function () {
      tile2.style.transform = "none";
    }, 300);
    setTimeout(function () {
      swapInnerHTML(`r${r}c${c - 1}`, `r${r}c${c}`);
    }, 10);
    setTimeout(function () {
      swapDisplay(`r${r}c${c - 1}`, `r${r}c${c}`);
    }, 300);
  } else {
    return;
  }
  nMoves.innerHTML = Number(nMoves.innerHTML) + 1;
  setTimeout(function () {
    checkWin(nRows * nCols, nRows, nCols);
  }, 300);
}

start();

const rowInput = document.getElementById("nRows");
const colInput = document.getElementById("nCols");
rowInput.addEventListener("change", function () {
  resetBoard();
});
colInput.addEventListener("change", function () {
  resetBoard();
});
clearScoresButton = document.getElementById("clearScores");
clearScoresButton.addEventListener("click", function () {
  clearScores();
});
const newGame = document.getElementById("newGame");
newGame.addEventListener("click", function () {
  resetBoard();
});
displayScore();
window.addEventListener("keydown", function (e) {
  KeyEvent(e);
});
window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);
