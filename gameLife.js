const submitButton = document.getElementById('update')
const inputSize = document.getElementById('size')

const inputFps = document.getElementById('fps')
const fpsDisplay = document.getElementById('fpsValue')

const inputColorBg = document.getElementById('background')

const inputColorCell = document.getElementById('cell')

const inputColorLine = document.getElementById('line')
const sizeValueDisplay = document.getElementById('sizeValue');

const screenSize = window.innerHeight*0.7;
console.log(screenSize);

let bgColor;
let cellColor;
let matriceSize;
let cellSize;
let fps;
const matrice = [];
const newMatrice = [];
const startCell = [];


inputSize.addEventListener('change', updateSizeDisplay);
inputFps.addEventListener('change', updateFpsDisplay);

submitButton.addEventListener('click',(e)=>{
  getVar()
  setup()
})

function updateSizeDisplay() {
  sizeValueDisplay.textContent = inputSize.value;
}

function updateFpsDisplay() {
  
  fpsValue.textContent = inputFps.value;
}

function getVar(){
  fps = inputFps.value
  bgColor = inputColorBg.value
  cellColor = inputColorCell.value
  matriceSize = inputSize.value
  cellSize =  screenSize/matriceSize
}



getVar()
updateSizeDisplay();


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
  }
}

function setup() {
  console.log("change to"+fps)
  frameRate(fps)
  createCanvas(screenSize,screenSize);
  background(bgColor);
  createMatrice();
  setStartMatrice();
  fillRandomMatrice();
  showMatrice();
  stroke(0);

  
}

function draw() {
  console.log(fps)
  background(bgColor);
  fillCell();
  checkDeadCell();
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
