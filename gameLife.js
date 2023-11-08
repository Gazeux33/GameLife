const bgColor = 0;
const lineColor = 255;
const cellColor = 255;

const matriceSize = 60;
const cellSize = 10;
const matrice = [];

const startCell = [[29, 29]];

function createMatrice() {
  for (let i = 0; i < matriceSize; i++) {
    matrice[i] = [];
    for (let j = 0; j < matriceSize; j++) {
      matrice[i][j] = 0;
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
      if (matrice[i][j] == 0) {
        let aroundCell = 0;

        if (matrice[i][j - 1] == 1) {
          aroundCell++;
        }
        if (matrice[i][j + 1] == 1) {
          aroundCell++;
        }

        if (matrice[i - 1][j - 1] == 1) {
          aroundCell++;
        }
        if (matrice[i - 1][j] == 1) {
          aroundCell++;
        }
        if (matrice[i - 1][j + 1] == 1) {
          aroundCell++;
        }

        if (matrice[i + 1][j - 1] == 1) {
          aroundCell++;
        }
        if (matrice[i + 1][j] == 1) {
          aroundCell++;
        }
        if (matrice[i + 1][j + 1] == 1) {
          aroundCell++;
        }

        if (aroundCell == 3) {
          matrice[i][j] = 1;
        }
      } else if (matrice[i][j] == 1) {
        let aroundCell = 0;

        if (matrice[i][j - 1] == 1) {
          aroundCell++;
        }
        if (matrice[i][j + 1] == 1) {
          aroundCell++;
        }

        if (matrice[i - 1][j - 1] == 1) {
          aroundCell++;
        }
        if (matrice[i - 1][j] == 1) {
          aroundCell++;
        }
        if (matrice[i - 1][j + 1] == 1) {
          aroundCell++;
        }

        if (matrice[i + 1][j - 1] == 1) {
          aroundCell++;
        }
        if (matrice[i + 1][j] == 1) {
          aroundCell++;
        }
        if (matrice[i + 1][j + 1] == 1) {
          aroundCell++;
        }

        if (aroundCell < 2 || aroundCell > 3) {
          matrice[i][j] = 0;
        }
      }
    }
  }
}
function checkLifeCell() {}

function showMatrice() {
  for (tab of matrice) {
    row = "";
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
  showMatrice();
  stroke(0);
}

function draw() {
  background(bgColor)
  drawGrid();
  fillCell();
  checkDeadCell();
  checkLifeCell();
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
        rect(j * cellSize, i * cellSize, cellSize);
      }
    }
  }
}
