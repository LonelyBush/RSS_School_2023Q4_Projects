import { clickFunctionEvent } from "./click_func_event.js";
export class EventListenersOfApp {
    constructor(virtualKeys, playAgainBtn) {
        this._virtualKeys = virtualKeys;
        this._playAgainBtn = playAgainBtn;
    }
    keyClick() {
        window.addEventListener("keyup", function (e) {
            const keyboardClick = new clickFunctionEvent();
            keyboardClick.keyboardClick(e);
        });
    }
    boardClick() {
        this._virtualKeys.forEach((elem) => {
            elem.addEventListener("click", function (e) {
                const mouseKeyClick = new clickFunctionEvent();
                mouseKeyClick.mouseKeylClick(e);
            });
        });
    }
    playAgain() {
        this._playAgainBtn.addEventListener("click", function () {
            new clickFunctionEvent().playAgainClick();
        });
    }
}
