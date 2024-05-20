import { handleLaunchScriptButton, handleResetGameButton, initCodeLines } from "./utils.js";
import { drawBoard } from "./createBoard.js";

const app = {
  /** Initialisation de l'app
   */
  init: function () {
    initCodeLines()
    drawBoard();

    // Event listeners
    const launchButton = document.querySelector("#launchScript");
    launchButton.addEventListener("click", handleLaunchScriptButton);

    const resetGame = document.querySelector("#clearCode");
    resetGame.addEventListener("click", handleResetGameButton);
  },
};

document.addEventListener("DOMContentLoaded", app.init);
