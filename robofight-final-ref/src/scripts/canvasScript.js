import nameGenerator from './nameGenerator';
import getRandomInt from './getRandomInt'

export default function canvasScript(enemyHead, enemyBody, enemyFoots, enemyLeftArm, enemyRightArm) {

  var canvas = document.getElementById('enemyCanvas');
  var context = canvas.getContext('2d');

  var randomBodyPartsArray = [];
  const variationsOfBodyParts = 2;
  for (var i = 0; i < 4; i++) {
    randomBodyPartsArray.push(getRandomInt(0, variationsOfBodyParts));
  }

  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  var counter = 0;
  var enemyDyingAnimationCounter = 0;
  var isEnemyDying = false;

  var enemyCounter = document.querySelector(".enemy-energy-bar__counter");

  function animate() {

    if (enemyCounter.innerText < 1 && !isEnemyDying) {

      isEnemyDying = true;

      var winContainer = document.querySelector(".win-container");

      winContainer.style.zIndex = '20';

      localStorage["currentPlayerPoints"] = +(localStorage["currentPlayerPoints"]) + 1;

      document.querySelector(".win__next-button").classList.add('win__next-button__unactive');

      winContainer.style.animation = "3s fadein linear";

      function resetEnemy() {

        var visualCanvas = document.getElementById('visualCanvas');
        visualCanvas.style.display = 'none';

        document.querySelector(".enemy-energy-bar").style.height = '320px';
        enemyCounter.innerText = 100;
        nameGenerator();

        randomBodyPartsArray.length = 0;
        for (var i = 0; i < 4; i++) {
          randomBodyPartsArray.push(getRandomInt(0, variationsOfBodyParts));
        }

        document.querySelector(".win__next-button").classList.remove('win__next-button__unactive');

        enemyDyingAnimationCounter = 0;
        isEnemyDying = false;

        winContainer.style.animation = "none";
      }

      winContainer.addEventListener("animationEnd", resetEnemy);
      winContainer.addEventListener("webkitAnimationEnd", resetEnemy);

    }

    enemyDyingAnimationCounter = isEnemyDying ? enemyDyingAnimationCounter += 1 : enemyDyingAnimationCounter;
    enemyDyingAnimationCounter = enemyDyingAnimationCounter >= 100 ? 100 : enemyDyingAnimationCounter;

    counter += 0.05;
    context.clearRect(0, 0, canvas.width, canvas.height);

    //left arm
    var sourceX = 200;
    var sourceY = (randomBodyPartsArray[3]) ? 0 : 380;
    var sourceWidth = 200;
    var sourceHeight = 300;
    var destWidth = sourceWidth / 2;
    var destHeight = sourceHeight / 2;
    var destX = (canvas.width / 2 - destWidth / 2) + 49 - (Math.sin(counter / 2));
    var destY = 102 - (Math.sin(counter / 2)) + (enemyDyingAnimationCounter * 0.6);
    context.drawImage(enemyLeftArm, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

    //right arm
    var sourceX = 0;
    var sourceY = (randomBodyPartsArray[3]) ? 0 : 380;
    var sourceWidth = 200;
    var sourceHeight = 300;
    var destWidth = sourceWidth / 2;
    var destHeight = sourceHeight / 2;
    var destX = (canvas.width / 2 - destWidth / 2) - 50;
    var destY = 102 + (Math.sin(counter / 2)) + (enemyDyingAnimationCounter * 0.6);
    context.drawImage(enemyRightArm, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

    //foots
    var sourceX = 0;
    var sourceY = (randomBodyPartsArray[2]) ? 0 : 380;
    var sourceWidth = 400;
    var sourceHeight = 300;
    var destWidth = sourceWidth / 2;
    var destHeight = sourceHeight / 2;
    var destX = (canvas.width / 2 - destWidth / 2) + 6;
    var destY = 168;
    context.drawImage(enemyFoots, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

    //body
    var sourceX = 0;
    var sourceY = (randomBodyPartsArray[1]) ? 0 : 395;
    var sourceWidth = 400;
    var sourceHeight = 300;
    var destWidth = sourceWidth / 2;
    var destHeight = sourceHeight / 2;
    var destX = (canvas.width / 2 - destWidth / 2) + 4;
    var destY = 105 - (Math.sin(counter / 5) / 2) + (enemyDyingAnimationCounter * 0.6);
    context.drawImage(enemyBody, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

    //head
    var sourceX = 0;
    var sourceY = (randomBodyPartsArray[0]) ? 0 : 380;
    var sourceWidth = 400;
    var sourceHeight = 300;
    var destWidth = sourceWidth / 2;
    var destHeight = sourceHeight / 2;
    var destX = (canvas.width / 2 - destWidth / 2) + 4;
    var destY = 10 + (Math.sin(counter) * 2) + (enemyDyingAnimationCounter * 1.1);
    context.drawImage(enemyHead, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

}
