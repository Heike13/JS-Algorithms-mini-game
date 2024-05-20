import { codeLines } from "./utils.js";
import { checkSuccess, resetBoard } from "./utils.js";
import { moveForward, turnLeft, turnRight } from "./moves.js";

/**
 * Exécute une ligne de code de la séquence.
 * Cette fonction est appelée de manière récursive pour chaque ligne de code dans `codeLines`.
 * @param {number} index - L'index de la ligne actuelle dans la séquence de code.
 */
const codeLineLoop = (index) => {
  const currentLine = codeLines[index];
  let indexMoves = 0;

  // Exécute l'instruction correspondant à la ligne de code actuelle
  switch (currentLine) {
    case "avance":
      moveForward();
      break;
    case "avanceX2":
      indexMoves = 2;
      for (let i = 0; i < indexMoves; i++) {
        moveForward();
      }
      break;
    case "avanceX3":
      indexMoves = 3;
      for (let i = 0; i < indexMoves; i++) {
        moveForward();
      }
      break;
    case "avanceX4":
      indexMoves = 4;
      for (let i = 0; i < indexMoves; i++) {
        moveForward();
      }
      break;
    case "avanceX5":
      indexMoves = 5;
      for (let i = 0; i < indexMoves; i++) {
        moveForward();
      }
      break;
    case "avanceX6":
      indexMoves = 6;
      for (let i = 0; i < indexMoves; i++) {
        moveForward();
      }
      break;
    case "droite":
      turnRight();
      break;
    case "gauche":
      turnLeft();
      break;
    default:
      console.log(`Commande inconnue: ${currentLine}`);
      break;
  }

  // Incrémente l'index pour passer à la ligne suivante
  index++;

  // S'il reste encore des lignes à interpréter
  if (index < codeLines.length) {
    // Appelle une nouvelle boucle après un délai de 300ms
    window.setTimeout(function () {
      codeLineLoop(index);
      checkSuccess();
    }, 500);
  } else {
    // Si toutes les lignes ont été interprétées, réinitialise le plateau après un délai de 500ms
    window.setTimeout(function () {
      const cellCurrent = document.querySelector(".cellCurrent");
      const cellStart = document.querySelector(".cellStart");
      resetBoard(cellStart, cellCurrent);
    }, 500);
  }
};

export { codeLineLoop };
