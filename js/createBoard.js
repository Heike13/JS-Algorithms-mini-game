import { config } from "./config.js";
import { randomNumber } from "./utils.js";

/**
 * Création du plateau de jeu
 */
const drawBoard = () => {
  for (let i = 0; i < config.numberOfRow; i++) {
    // les rows
    const container = document.querySelector("#container");
    const board = document.querySelector("#board");
    const div = document.createElement("div");
    div.classList.add("cellRow");
    div.id = "row" + (i + 1);

    container.prepend(board);
    board.appendChild(div);

    for (let i = 0; i < config.numberOfColumn; i++) {
      // les columns
      const row = document.createElement("div");
      row.classList.add("cell");
      div.appendChild(row);
    }
  }

  let cellStartIndex = randomNumber();
  let cellEndIndex = randomNumber();

  // Vérification que la case de départ et d'arrivée sont éloignées de 5 cases ou 5 lignes mini
  while (
    Math.abs((cellEndIndex - cellStartIndex) / config.numberOfRow) <
      config.spaceBeetwinStartAndEndCell &&
    Math.abs((cellEndIndex - cellStartIndex) / config.numberOfColumn) <
      config.spaceBeetwinStartAndEndCell
  ) {
    cellEndIndex = randomNumber();
    cellStartIndex = randomNumber();
  }

  const allCell = document.querySelectorAll(".cell");
  const cellStart = allCell[cellStartIndex];
  const cellEnd = allCell[cellEndIndex];

  cellStart.classList.add("cellStart", "cellCurrent", "cellCurrent-right");
  cellEnd.classList.add("cellEnd");

  // Création des cellules inactive dites "bush"
  let printBushIndex = [];
  for (let i = 0; i < config.numberOfBushCell; i++) {
    let cellBushIndex = randomNumber();

    while (
      cellBushIndex === cellStartIndex ||
      cellBushIndex === cellEndIndex ||
      printBushIndex.includes(cellBushIndex)
    ) {
      cellBushIndex = randomNumber();
    }
    // insertion dans le tableau de vérif
    printBushIndex.push(cellBushIndex);

    // insertion dans le DOM
    const cellBush = allCell[cellBushIndex];
    cellBush.classList.add("bush");
  }

  //TODO Vérif de voisinages entre les cases bush et case départ/arrivée pour être certains que la cellStart ne soit pas "condamnée"
};

export { drawBoard };
