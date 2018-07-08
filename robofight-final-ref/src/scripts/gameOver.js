import { finalScore } from './score';

export default () => {

    var gameOverContainer = document.querySelector(".game-over-container");
    gameOverContainer.style.zIndex = '20';
    gameOverContainer.style.animation = '2s fadein linear';

    var gameOverInput = document.querySelector(".game-over__input")
    var gameOverButton = document.querySelector(".game-over__ok-button")
    gameOverInput.focus();

    function gameOverInputHandler(event) {
        const enterButtonKeyCode = 13;
        if (event.keyCode === enterButtonKeyCode) {
            gameOverInput.blur();
            finalScore();
        }
    }
    function gameOverButtonHandler() {
        gameOverButton.blur();
        finalScore();
    }
    gameOverInput.addEventListener('keydown', gameOverInputHandler)
    gameOverButton.addEventListener('click', gameOverButtonHandler)
}