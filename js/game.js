import { GameBoard } from "./gameboard.js";
import { Player } from "./player.js";

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let resetButton, popup;

const player1 = new Player('X', 'rgb(20, 103, 235)');
const player2 = new Player('O', 'yellow');

let currentPlayer = player1;

const gameFrame = document.querySelector('.game');

const playerTurn = document.getElementById("playerTurn");
playerTurn.classList.add('playerTurnStyle');
playerTurn.innerHTML = `Player ${currentPlayer.marker}'s turn`;

let boardCreated = false;

const cells = [];


function renderGameBoard() {
  if (boardCreated) return;

  const board = document.getElementById("board");

 for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cells.push(cell);
    cell.classList.add("cellStyles");
    board.append(cell); 
  }
  boardCreated = true;

  addResetButton(gameFrame, 'gameReset', 'rgb(11, 118, 225)', '85%');
}


function handleInput() {
  cells.forEach((cell, index) =>
    cell.addEventListener("click", function () {
      if (cell.innerHTML == "") {
        cell.innerHTML = currentPlayer.marker;
        cell.style.color = currentPlayer.markerColor;
        console.log(currentPlayer.markerColor);
        currentPlayer.selectedCells.push(index);
        GameBoard.boardCells[index] = currentPlayer.marker;

        checkWinner();
        switchPlayer(currentPlayer);

        playerTurn.innerHTML = `Player ${currentPlayer.marker}'s turn`;
      } else {
        playerTurn.innerHTML = `Invalid Move`;
      }
    })
  );
}

function switchPlayer(player) {
  if (player == player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
}

//Checks if 3 rows has been marked correctly and declares the winner
function checkWinner() {
  let playerWin = false;
  for (let i = 0; i < winningConditions.length; i++) {
    if (
      winningConditions[i].every((elements) =>
        currentPlayer.selectedCells.includes(elements)
      )
    ) {
      playerTurn.innerHTML = "";
      playerWin = true;
      cells.forEach((cell, index) => {
        for (let j = 0; j < 3; j++) {
          if (index == winningConditions[i][j]) {
            cell.style.color = "red";
          }
        }
      });
      announceWinner(`Winner is Player ${currentPlayer.marker}`);
    }
  }
  if (
    GameBoard.boardCells.length == 9 &&
    !GameBoard.boardCells.includes(undefined) &&
    !playerWin
  ) {
    announceWinner(`It's a Draw`);
  }
}

//displays a popup with the winner information
function announceWinner(message) {
  setTimeout(() => {
    popup = document.createElement("div");
    let finishMsg = document.createElement("h4");
    finishMsg.innerText = "Game Over";
    finishMsg.style.fontSize = "100px";
    popup.innerHTML = message;
    popup.appendChild(finishMsg);
    popup.classList.add("winningMsg");
    addResetButton(popup, 'popupReset', 'red', '70%');
    document.body.append(popup);

    gameFrame.childNodes[7].style.visibility = 'hidden';

  }, 500);
}

function addResetButton(source, idLabel, color, position) {
  resetButton = document.createElement('div');
  resetButton.innerHTML = 'Reset';
  resetButton.setAttribute('id', idLabel);
  resetButton.classList.add('resetButtonStyle');
  resetButton.style.backgroundColor = color;
  resetButton.style.top = position;
  source.append(resetButton);

  resetButton.addEventListener('click', resetGame);
}

function resetGame() {

  resetButton.classList.add('buttonClicked');

  GameBoard.boardCells.fill(undefined);
  currentPlayer = player1;
  playerTurn.innerHTML = `Player ${currentPlayer.marker}'s turn`;
  player1.selectedCells.length = 0;
  player2.selectedCells.length = 0;
  gameFrame.childNodes[7].style.visibility = 'visible';
  cells.forEach(cell => {
    cell.innerHTML = ""
    cell.style.color = '';
    cell.style.backgroundColor = '';
  });
  if (popup && popup.parentNode) {
    popup.parentNode.removeChild(popup);
  }

  setTimeout(() => resetButton.classList.remove('buttonClicked'), 100);
}

export { renderGameBoard, handleInput, checkWinner };
