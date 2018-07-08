import gameOver from './gameOver';

export default function energyCounter(energyDamage, target = 'enemy') {

    var isPlayerGotEnergy = true;
    var targetCounter = (target === 'enemy') ? document.querySelector(".enemy-energy-bar__counter") : document.querySelector(".player-energy-bar__counter");
    var targetBar = (target === 'enemy') ? document.querySelector(".enemy-energy-bar") : document.querySelector(".player-energy-bar");

    var animationCounter = 0
    var energyReducerInterval = setInterval(function () {
        targetCounter.innerText -= 1;

        targetBar.style.height = (targetCounter.innerText * 3.2) + 'px';
        animationCounter++;

        var playerCounter = document.querySelector(".player-energy-bar__counter");
        if (playerCounter.innerText < 1 && isPlayerGotEnergy === true) {
            isPlayerGotEnergy = false;

            gameOver();

        }
        if (animationCounter > energyDamage - 1) { clearInterval(energyReducerInterval); }
    }, 300);

}
