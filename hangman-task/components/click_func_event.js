import { startGame } from "./main_init.js";
import { initClickEvents } from "./main_init.js";
//const startGame = startGame();
export class clickFunctionEvent {
    constructor() {
        this._unMatchedLetters = [];
    }
    mouseKeylClick(event) {
        let matchedLetter = "";
        let indexOfMatched = [];
        let clickedKey = event.target;
        let clicked = clickedKey.textContent;
        if (!this._unMatchedLetters.includes(clicked)) {
            clickedKey.classList.add("active");
            (startGame)._answerArr.forEach((elem, index) => {
                if (clickedKey.textContent === elem) {
                    indexOfMatched.push(index);
                    matchedLetter = elem;
                }
            });
            if (matchedLetter === "") {
                this._unMatchedLetters.push(clicked);
                (startGame)._countOfErrors += 1;
                let hangmanTamplateBlock = document.querySelector(".hangman-tamplate");
                let createHangmanPart = document.createElement("div");
                createHangmanPart.classList.add((startGame)._hangmanParts.shift());
                hangmanTamplateBlock.appendChild(createHangmanPart);
            }
        }
        this.collectQuizAnswer(indexOfMatched, matchedLetter);
    }
    keyboardClick(event) {
        let modalWindowWrapper = document.querySelector(".modal-window-wrapper");
        let pressedKey = event.key.toUpperCase();
        initClickEvents._virtualKeys.forEach((keys) => {
            let matchedLetter = "";
            let indexOfMatched = [];
            if ((startGame)._countOfErrors <= 6 &&
                !modalWindowWrapper.classList.contains("hide")) {
                return false;
            }
            if (!this._unMatchedLetters.includes(pressedKey)) {
                if (pressedKey === keys.textContent) {
                    keys.classList.add("active");
                    (startGame)._answerArr.forEach((elem, index) => {
                        if (pressedKey === elem) {
                            indexOfMatched.push(index);
                            matchedLetter = elem;
                        }
                    });
                    if (matchedLetter === "") {
                        this._unMatchedLetters.push(pressedKey);
                        (startGame)._countOfErrors += 1;
                        let hangmanTamplateBlock = document.querySelector(".hangman-tamplate");
                        let createHangmanPart = document.createElement("div");
                        createHangmanPart.classList.add((startGame)._hangmanParts.shift());
                        hangmanTamplateBlock.appendChild(createHangmanPart);
                    }
                }
                this.collectQuizAnswer(indexOfMatched, matchedLetter);
            }
        });
    }
    collectQuizAnswer(indexOfMatched, matchedLetter) {
        let quizLetters = document.querySelectorAll(".letter");
        indexOfMatched.forEach((el) => {
            quizLetters.forEach((elem) => {
                if (elem.id === el.toString()) {
                    elem.classList.add("active");
                    elem.textContent = matchedLetter;
                }
            });
        });
        let incorrectCounter = document.querySelector(".incorrect-counter");
        incorrectCounter.textContent = `${(startGame)._countOfErrors}/6`;
        if ((startGame)._countOfErrors === 6) {
            let modalWindowWrapper = document.querySelector(".modal-window-wrapper");
            let modalWindowText = document.querySelector(".modal-window-text");
            let modalWindowAnswer = document.querySelector(".modal-window-answer");
            modalWindowText.textContent = "You Lose! Try again!";
            modalWindowAnswer.textContent = `The answer was: ${(startGame)._answerArr.join("")[0] +
                (startGame)._answerArr.join("").slice(1).toLowerCase()}`;
            modalWindowWrapper.classList.remove("hide");
        }
        let checkAnswer = [];
        let letterGuess = document.querySelectorAll(".letter");
        letterGuess.forEach((elem) => {
            checkAnswer.push(elem.textContent);
        });
        if (checkAnswer.join("") === (startGame)._answerArr.join("")) {
            let modalWindowWrapper = document.querySelector(".modal-window-wrapper");
            let modalWindowText = document.querySelector(".modal-window-text");
            let modalWindowAnswer = document.querySelector(".modal-window-answer");
            modalWindowText.textContent = "Congratulations ! You Won !";
            modalWindowAnswer.textContent = `The answer was: ${(startGame)._answerArr.join("")[0] +
                (startGame)._answerArr.join("").slice(1).toLowerCase()}`;
            modalWindowWrapper.classList.remove("hide");
        }
    }
    playAgainClick() {
        (startGame)._countOfErrors = 0;
        this._unMatchedLetters = [];
        let modalWindowWrapper = document.querySelector(".modal-window-wrapper");
        modalWindowWrapper.classList.add("hide");
        let letterGuessBlock = document.querySelector(".letter-guess-block");
        letterGuessBlock.innerHTML = "";
        let hangmanTamplateBlock = document.querySelector(".hangman-tamplate");
        hangmanTamplateBlock.innerHTML = "";
        (startGame)._hangmanParts = [
            "hangman-head",
            "hangman-body",
            "hangman-left-arm",
            "hangman-right-arm",
            "hangman-left-leg",
            "hangman-right-leg",
        ];
        let incorrectCounter = document.querySelector(".incorrect-counter");
        incorrectCounter.textContent = " 0/6 ";
        initClickEvents._virtualKeys.forEach((keys) => {
            keys.classList.remove("active");
        });
        (startGame).startTheGame((startGame).randomFromIndexArr());
    }
}
