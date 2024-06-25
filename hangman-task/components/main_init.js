import { CreateGameLayout } from "./game_layout.js";
import { WorkingGameFunctional } from "./game_Func.js";
import { EventListenersOfApp } from "./event_listeners.js";
//Initialize project
let loadGame = new CreateGameLayout();
loadGame.generateGameLayout();
loadGame.generateModalWindow();
export const startGame = new WorkingGameFunctional();
startGame.startTheGame(startGame.randomFromIndexArr());
export const initClickEvents = new EventListenersOfApp(document.querySelectorAll(".key-btn"), document.querySelector(".play-again-btn"));
initClickEvents.keyClick();
initClickEvents.boardClick();
initClickEvents.playAgain();
