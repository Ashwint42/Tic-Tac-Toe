import { Player } from "./player.js";

const buttons = [];
let startButton;
const menuContainer = document.createElement("div");
let player1, player2;
let player1Choice, player2Choice, initialMarker;

renderSelectionMenu();

function renderSelectionMenu() {
  menuContainer.classList.add("menuStyles");

  const markerContainer = document.createElement("div");
  markerContainer.classList.add("markerContainerStyles");

  const menuHeading = document.createElement("h3");
  menuHeading.innerHTML = "Select Marker";
  menuContainer.append(menuHeading);

  const XButton = document.createElement("button");
  addButtonstyle("X", XButton, "buttonstyles", markerContainer, 'xButton');

  const OButton = document.createElement("button");
  addButtonstyle("O", OButton, "buttonstyles", markerContainer, 'oButton');

  menuContainer.append(markerContainer);

  startButton = document.createElement('button');
  addButtonstyle('Start', startButton, 'startButtonStyle', menuContainer, 'startButton');

  document.body.append(menuContainer);

  addButtonEvents();
}

function addButtonstyle(label, button, className, parent, attributeName) {
  button.innerHTML = label;
  button.classList.add(className);
  button.setAttribute('id', attributeName);
  parent.append(button);
  buttons.push(button);
}

function addButtonEvents() {
  buttons.forEach(button => button.addEventListener('click', (event) => {
    console.log(event.target.getAttribute("id"), typeof (event.target.getAttribute("id")));

    switch (event.target.getAttribute("id")) {
      case 'xButton':
      case 'oButton': getFormData(event.target, event.target.innerHTML);
    }
  }));
}

function getFormData(target, selectedMarker) {
  target.classList.add('active');
  initialMarker = 'X';

  if (selectedMarker == 'X') {
    player1Choice = initialMarker;
    player2Choice = 'O';
  } else {
    player1Choice = 'O';
    player2Choice = initialMarker;
  }
  console.log('player1Choice = ', player1Choice, 'player2Choice = ', player2Choice)
}



function initializePlayers() {
  player1 = new Player(player1Choice);
  player2 = new Player(player2Choice);
}

function startGame() {
  startButton.add
}

export { renderSelectionMenu }
export { startGame, player1, player2, startButton }
