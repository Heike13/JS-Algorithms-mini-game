import { config } from "./config.js";
import { drawBoard } from "./createBoard.js";
import { codeLineLoop } from "./scriptLoop.js";

/**
 * Initialisation du tableau qui va stocker les commandes du TEXTAREA à éxécuter
 * il est reset à chaque fin de cycle
 */
let codeLines = [];
const initCodeLines = () => {
  codeLines = [];
};

/**
 * @returns Un chiffre random multiplié par la variable numberRandom (issue de la propriété config)
 * et arrondi à l'entier le plus proche
 */
const randomNumber = () => {
  return Math.floor(Math.random() * config.numberRandom);
};

/**
 * Bouton pour lancer le script de jeu
 * si le joueur tape un mot imprévu ou tente d'injecter du code, il sera analysé et ignoré, par sécurité
 */
const handleLaunchScriptButton = () => {
  codeLines = document.querySelector("#userCode").value.split(/\s+/);

  window.setTimeout(function () {
    codeLineLoop(0);
  }, 500);
};

/**
 * Bouton pour reset une game
 */
const handleResetGameButton = () => {
  document.querySelector("#userCode").value = "";

  // Réinitialisation de la board
  // const container = document.querySelector("#container");
  const board = document.querySelector("#board");

  // Suppression de tous les enfants de #board
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }

  drawBoard();
};

/**
 * Vérifie si la cellule actuelle est la cellule de fin.
 * Si oui, affiche un message de félicitations et réinitialise le plateau.
 */
const checkSuccess = () => {
  const cellStart = document.querySelector(".cellStart");
  const cellEnd = document.querySelector(".cellEnd");
  const cellCurrent = document.querySelector(".cellCurrent");

  if (cellEnd === cellCurrent) {
    alert("Bravo, tu es arrivé sur la case rouge !");
    resetBoard(cellStart, cellCurrent);
    codeLines = [];
  }
};

/**
 * Réinitialise le plateau de jeu en réassignant les classes CSS appropriées.
 * @param {Element} cellStart - L'élément de la cellule de départ.
 * @param {Element} cellCurrent - L'élément de la cellule actuelle.
 */
const resetBoard = (cellStart, cellCurrent) => {
  cellCurrent.classList.remove(
    "cellCurrent",
    "cellCurrent-top",
    "cellCurrent-bottom",
    "cellCurrent-right",
    "cellCurrent-left"
  );
  cellStart.classList.add("cellCurrent", "cellCurrent-right");
};

export {
  randomNumber,
  handleLaunchScriptButton,
  handleResetGameButton,
  initCodeLines,
  codeLines,
  resetBoard,
  checkSuccess,
};
