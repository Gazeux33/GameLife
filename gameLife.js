const bgColor = 0;
const lineColor = 0;
const cellColor = "#D651E8";

const matriceSize = 200;
const cellSize = 4;
const matrice = [];
const newMatrice = [];

const startCell = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function fillRandomMatrice() {
  for (let i = 0; i < matriceSize; i++) {
    for (let j = 0; j < matriceSize; j++) {
      matrice[i][j] = getRandomInt(2);
    }
  }
}
function createMatrice() {
  for (let i = 0; i < matriceSize; i++) {
    matrice[i] = [];
    newMatrice[i] = [];
    for (let j = 0; j < matriceSize; j++) {
      matrice[i][j] = 0;
      newMatrice[i][j] = 0;
    }
  }
}

function setStartMatrice() {
  for (cell of startCell) {
    matrice[cell[0]][cell[1]] = 1;
  }
}

function checkDeadCell() {
  for (let i = 0; i < matriceSize; i++) {
    for (let j = 0; j < matriceSize; j++) {
      let aroundCell = 0;

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x !== 0 || y !== 0) {
            if (
              i + x >= 0 &&
              i + x < matriceSize &&
              j + y >= 0 &&
              j + y < matriceSize &&
              matrice[i + x][j + y] === 1
            ) {
              aroundCell++;
            }
          }
        }
      }

      if (matrice[i][j] === 1 && (aroundCell < 2 || aroundCell > 3)) {
        newMatrice[i][j] = 0;
      } else if (matrice[i][j] === 0 && aroundCell === 3) {
        newMatrice[i][j] = 1;
      } else {
        newMatrice[i][j] = matrice[i][j];
      }
    }
  }

  for (let i = 0; i < matriceSize; i++) {
    for (let j = 0; j < matriceSize; j++) {
      matrice[i][j] = newMatrice[i][j];
    }
  }
}

function showMatrice() {
  for (tab of matrice) {
    let row = "";
    for (let i = 0; i < tab.length; i++) {
      row += tab[i] + "";
    }
    console.log(row);
  }
}

function setup() {
  createCanvas(matriceSize * cellSize, matriceSize * cellSize);
  background(bgColor);
  createMatrice();
  setStartMatrice();
  fillRandomMatrice();
  showMatrice();
  stroke(0);
  
}

function draw() {
  background(bgColor);
  drawGrid();
  fillCell();
  checkDeadCell();
}

function drawGrid() {
  stroke(lineColor);
  for (let i = cellSize; i <= matriceSize * cellSize; i += cellSize) {
    line(i, 0, i, height);
    line(0, i, width, i);
  }
}

function fillCell() {
  fill(cellColor);
  for (let i = 0; i < matriceSize; i++) {
    for (let j = 0; j < matriceSize; j++) {
      if (matrice[i][j] == 1) {
        rect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  }
}
