import { finalScore } from './score'

function energyCounter(energyDamage, target = 'enemy') {

    var isPlayerGotEnergy = true;
    var targetCounter = (target === 'enemy') ? document.querySelector(".enemy-energy-bar__counter") : document.querySelector(".player-energy-bar__counter");
    var targetBar = (target === 'enemy') ? document.querySelector(".enemy-energy-bar") : document.querySelector(".player-energy-bar");

    var animationCounter = 0
    var interval = setInterval(function () {
        targetCounter.innerText -= 1;

        targetBar.style.height = (targetCounter.innerText * 3.2) + 'px';
        animationCounter++;

        var playerCounter = document.querySelector(".player-energy-bar__counter");
        if (playerCounter.innerText < 1 && isPlayerGotEnergy === true) {

            isPlayerGotEnergy = false

            var gameOverContainer = document.querySelector(".game-over-container");
            gameOverContainer.style.zIndex = '20';
            gameOverContainer.style.animation = '2s fadein linear';

            var gameOverInput = document.querySelector(".game-over__input")
            var gameOverButton = document.querySelector(".game-over__ok-button")
            gameOverInput.focus();

            function gameOverInputHandler(event) {
                if (event.key === 'Enter') {
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
        if (animationCounter > energyDamage - 1) { clearInterval(interval); }
    }, 300);




}



export { energyCounter }