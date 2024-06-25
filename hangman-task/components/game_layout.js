export class CreateGameLayout {
    constructor() {
        this._keyBoardKeys = [
            "Q",
            "W",
            "E",
            "R",
            "T",
            "Y",
            "U",
            "I",
            "O",
            "P",
            "A",
            "S",
            "D",
            "F",
            "G",
            "H",
            "J",
            "K",
            "L",
            "Z",
            "X",
            "C",
            "V",
            "B",
            "N",
            "M",
        ];
    }
    createHangmanPictureField() {
        let hangmanPictureBlock = document.createElement("div");
        hangmanPictureBlock.classList.add("hangman-picture-field");
        let hangmanTitle = document.createElement("h1");
        hangmanTitle.classList.add("hangman-title");
        hangmanTitle.textContent = "HANGMAN GAME";
        let gallowTamplateBlock = document.createElement("div");
        gallowTamplateBlock.classList.add("gallow-tamplate");
        let hangmanTamplateBlock = document.createElement("div");
        hangmanTamplateBlock.classList.add("hangman-tamplate");
        let gallowPicture = document.createElement("img");
        gallowPicture.classList.add("gallow-picture");
        gallowPicture.setAttribute("src", "./assets/pictures/gallows.png");
        gallowPicture.setAttribute("alt", "gallow-pic");
        gallowTamplateBlock.appendChild(gallowPicture);
        gallowTamplateBlock.appendChild(hangmanTamplateBlock);
        hangmanPictureBlock.appendChild(gallowTamplateBlock);
        hangmanPictureBlock.appendChild(hangmanTitle);
        return hangmanPictureBlock;
    }
    createAVirtualKeyboard() {
        let virtualKeyBoadBlock = document.createElement("div");
        virtualKeyBoadBlock.classList.add("virtual-keyboard");
        this._keyBoardKeys.forEach((elem) => {
            let keyBlock = document.createElement("div");
            keyBlock.classList.add("key-btn");
            keyBlock.textContent = elem;
            virtualKeyBoadBlock.appendChild(keyBlock);
        });
        return virtualKeyBoadBlock;
    }
    createHangmanPlayField() {
        let letterBlock = document.createElement("div");
        letterBlock.classList.add("letter-guess-block");
        let hintAndGuessBlock = document.createElement("div");
        hintAndGuessBlock.classList.add("hint-and-guess-block");
        let hintTextBlock = document.createElement("p");
        hintTextBlock.classList.add("hint-text");
        hintTextBlock.textContent = "Hint:";
        let hintText = document.createElement("span");
        hintTextBlock.appendChild(hintText);
        let incorrectGuessBlock = document.createElement("div");
        incorrectGuessBlock.classList.add("incorrect-guesses-block");
        let incorrectText = document.createElement("p");
        incorrectText.classList.add("incorrect-text");
        incorrectText.textContent = "Incorrect guesses:";
        let incorrectCounter = document.createElement("p");
        incorrectCounter.classList.add("incorrect-counter");
        incorrectCounter.textContent = " 0/6 ";
        incorrectGuessBlock.appendChild(incorrectText);
        incorrectGuessBlock.appendChild(incorrectCounter);
        hintAndGuessBlock.appendChild(hintTextBlock);
        hintAndGuessBlock.appendChild(incorrectGuessBlock);
        let hangmanPlayField = document.createElement("div");
        hangmanPlayField.classList.add("hangman-play-field");
        let noteText = document.createElement("p");
        noteText.classList.add("note-text");
        noteText.innerHTML =
            "Note: <span> For pressing buttons please use English keyboard layout!</span>";
        hangmanPlayField.appendChild(letterBlock);
        hangmanPlayField.appendChild(hintAndGuessBlock);
        hangmanPlayField.appendChild(this.createAVirtualKeyboard());
        hangmanPlayField.appendChild(noteText);
        return hangmanPlayField;
    }
    generateGameLayout() {
        let hangmanOverlay = document.createElement("div");
        hangmanOverlay.classList.add("hangman-overlay");
        hangmanOverlay.appendChild(this.createHangmanPictureField());
        hangmanOverlay.appendChild(this.createHangmanPlayField());
        return document.body.appendChild(hangmanOverlay);
    }
    generateModalWindow() {
        let modalWindowWraper = document.createElement("div");
        modalWindowWraper.classList.add("modal-window-wrapper");
        modalWindowWraper.classList.add("hide");
        let modalWindow = document.createElement("div");
        modalWindow.classList.add("modal-window");
        let playAgainBtn = document.createElement("button");
        playAgainBtn.classList.add("play-again-btn");
        playAgainBtn.textContent = "Play Again !";
        let modalWindowText = document.createElement("p");
        modalWindowText.classList.add("modal-window-text");
        modalWindowText.textContent = "Congratulations ! You Won !";
        let modalWindowAnswer = document.createElement("p");
        modalWindowAnswer.classList.add("modal-window-answer");
        modalWindowAnswer.textContent = "Answer was: ";
        modalWindow.appendChild(modalWindowText);
        modalWindow.appendChild(modalWindowAnswer);
        modalWindow.appendChild(playAgainBtn);
        modalWindowWraper.appendChild(modalWindow);
        return document.body.appendChild(modalWindowWraper);
    }
}
