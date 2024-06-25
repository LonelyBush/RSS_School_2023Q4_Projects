import * as getData from "../words-and-hints.json" with { type: "json" };

const collectionOfWordsAndQuiz = getData.default;
export class WorkingGameFunctional {
    constructor() {
        this._answerArr = [];
        this._previousIndex = 0;
        this._countOfErrors = 0;
        this._hangmanParts = [
            "hangman-head",
            "hangman-body",
            "hangman-left-arm",
            "hangman-right-arm",
            "hangman-left-leg",
            "hangman-right-leg",
        ];
    }
    randomFromIndexArr() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * collectionOfWordsAndQuiz.length);
        } while (randomIndex === this._previousIndex);
        {
            this._previousIndex = randomIndex;
            return randomIndex;
        }
    }
    startTheGame(num) {
        let arrFromWord = collectionOfWordsAndQuiz[num].word.split("");
        this._answerArr = arrFromWord;
        document.getElementsByTagName("span")[0].textContent =
            collectionOfWordsAndQuiz[num].hint;
        let letterGuessBlock = document.querySelector(".letter-guess-block");
        arrFromWord.forEach((elem, index) => {
            let createLetter = document.createElement("div");
            createLetter.classList.add("letter");
            createLetter.setAttribute("id", index + "");
            letterGuessBlock.appendChild(createLetter);
        });
    }
}
