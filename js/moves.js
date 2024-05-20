import { initCodeLines } from "./utils.js";

/**
 * Ajoute la classe de cellule actuelle à la cellule de départ.
 * @param {Element} cellStart
 */
const resetToStart = (cellStart) => {
  cellStart.classList.add("cellCurrent-right", "cellCurrent");
  // Je vide le tableau codeLines par l'intermédiaire de cette fonction
  initCodeLines();
};

/**
 * Gère le déplacement horizontal (droite/gauche).
 * @param {Element} currentCell - La cellule actuelle.
 * @param {boolean} isRight - Indique si le déplacement est vers la droite.
 */
const moveHorizontal = (currentCell, isRight) => {
  const nextCell = isRight
    ? currentCell.nextSibling
    : currentCell.previousSibling;

  const directionClass = isRight ? "cellCurrent-right" : "cellCurrent-left";
  currentCell.classList.remove(directionClass, "cellCurrent");

  if (nextCell === null) {
    alert("pas de case après, enlève une ou plusieurs commande(s)");
    resetToStart(document.querySelector(".cellStart"));
  } else if (nextCell.classList.contains("bush")) {
    alert(
      "la case vers laquelle tu vas est bloquée ! Modifie ton script pour éviter ça"
    );
    resetToStart(document.querySelector(".cellStart"));
  } else {
    nextCell.classList.add("cellCurrent", directionClass);
  }
};

/**
 * Gère le déplacement vertical (haut/bas).
 * @param {Element} currentCell - La cellule actuelle.
 * @param {boolean} isDown - Indique si le déplacement est vers le bas.
 */
const moveVertical = (currentCell, isDown) => {
  const currentRow = currentCell.parentNode;
  const targetRow = isDown
    ? currentRow.nextSibling
    : currentRow.previousSibling;
  const directionClass = isDown ? "cellCurrent-bottom" : "cellCurrent-top";
  currentCell.classList.remove(directionClass, "cellCurrent");

  if (targetRow === null) {
    alert(
      "La case vers laquelle tu vas n'existe pas! Modifie ton script pour éviter ça"
    );
    resetToStart(document.querySelector(".cellStart"));
  } else {
    const cellsInTargetRow = targetRow.querySelectorAll(".cell");
    const currentCellIndex = Array.from(currentRow.children).indexOf(
      currentCell
    );
    const targetCell = cellsInTargetRow[currentCellIndex];

    if (targetCell.classList.contains("bush")) {
      alert(
        "La case vers laquelle tu vas est bloquée! Modifie ton script pour éviter ça"
      );
      resetToStart(document.querySelector(".cellStart"));
    } else {
      targetCell.classList.add("cellCurrent", directionClass);
    }
  }
};

/**
 * Se déplacer dans la direction du curseur.
 */
const moveForward = () => {
  const goRight = document.querySelector(".cellCurrent-right");
  if (goRight) moveHorizontal(goRight, true);

  const goLeft = document.querySelector(".cellCurrent-left");
  if (goLeft) moveHorizontal(goLeft, false);

  const goDown = document.querySelector(".cellCurrent-bottom");
  if (goDown) moveVertical(goDown, true);

  const goUp = document.querySelector(".cellCurrent-top");
  if (goUp) moveVertical(goUp, false);
};

//Todo : ajouter les commandes au clavier directement

// ================================================================== Les Directions

/**
 * Change la direction de la cellule actuelle.
 * @param {string} currentDirection - La direction actuelle de la cellule.
 * @param {Object} directions - Un objet contenant les directions de rotation.
 */
const changeDirection = (currentDirection, directions) => {
  const currentCell = document.querySelector(
    `.cellCurrent-${currentDirection}`
  );

  if (currentCell) {
    currentCell.classList.remove(`cellCurrent-${currentDirection}`);
    currentCell.classList.add(`cellCurrent-${directions[currentDirection]}`);
  }
};

/**
 * Tourne la cellule actuelle à droite.
 */
const turnRight = () => {
  const directions = {
    right: "bottom",
    bottom: "left",
    left: "top",
    top: "right",
  };
  const currentDirections = Object.keys(directions);
  for (let direction of currentDirections) {
    const currentCell = document.querySelector(`.cellCurrent-${direction}`);
    if (currentCell) {
      changeDirection(direction, directions);
      break;
    }
  }
};

/**
 * Tourne la cellule actuelle à gauche.
 */
const turnLeft = () => {
  const directions = {
    right: "top",
    top: "left",
    left: "bottom",
    bottom: "right",
  };
  const currentDirections = Object.keys(directions);
  for (let direction of currentDirections) {
    const currentCell = document.querySelector(`.cellCurrent-${direction}`);
    if (currentCell) {
      changeDirection(direction, directions);
      break;
    }
  }
};

export {
  moveForward,
  moveHorizontal,
  moveVertical,
  turnLeft,
  turnRight,
  changeDirection,
  resetToStart,
};
