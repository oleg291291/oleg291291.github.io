import headPart from '../sprites/heads.png'
import bodyPart from '../sprites/bodies.png'
import footsPart from '../sprites/foots.png'
import armsPart from '../sprites/arms.png'

import { getRandomInt } from './duelScript'
import { nameGenerator } from './duelScript'

function canvasScript() {

  var canvas = document.getElementById('enemyCanvas');
  var context = canvas.getContext('2d');

  var enemyHead = new Image();
  enemyHead.src = headPart;
  var enemyBody = new Image();
  enemyBody.src = bodyPart;
  var enemyFoots = new Image();
  enemyFoots.src = footsPart;
  var enemyRightArm = new Image();
  enemyRightArm.src = armsPart;
  var enemyLeftArm = new Image();
  enemyLeftArm.src = armsPart;

  var randArr = [];
  for (var i = 0; i < 4; i++) {
    randArr.push(getRandomInt(0, 2));
  }

  (function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  })();

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

      winContainer.addEventListener("webkitAnimationEnd", function () {

        var display = document.getElementById('visualCanvas');
        display.style.display = 'none';

        document.querySelector(".enemy-energy-bar").style.height = '320px';
        enemyCounter.innerText = 100;
        nameGenerator();

        randArr.length = 0;
        for (var i = 0; i < 4; i++) {
          randArr.push(getRandomInt(0, 2));
        }

        document.querySelector(".win__next-button").classList.remove('win__next-button__unactive');

        enemyDyingAnimationCounter = 0;
        isEnemyDying = false;

        winContainer.style.animation = "none";
      })

    }

    enemyDyingAnimationCounter = isEnemyDying ? enemyDyingAnimationCounter += 1 : enemyDyingAnimationCounter;
    enemyDyingAnimationCounter = enemyDyingAnimationCounter >= 100 ? 100 : enemyDyingAnimationCounter;

    counter += 0.05;
    context.clearRect(0, 0, canvas.width, canvas.height);

    //left arm
    var sourceX = 200;
    var sourceY = (randArr[3]) ? 0 : 380;
    var sourceWidth = 200;
    var sourceHeight = 300;
    var destWidth = sourceWidth / 2;
    var destHeight = sourceHeight / 2;
    var destX = (canvas.width / 2 - destWidth / 2) + 49 - (Math.sin(counter / 2));
    var destY = 102 - (Math.sin(counter / 2)) + (enemyDyingAnimationCounter * 0.6);
    context.drawImage(enemyLeftArm, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

    //right arm
    var sourceX = 0;
    var sourceY = (randArr[3]) ? 0 : 380;
    var sourceWidth = 200;
    var sourceHeight = 300;
    var destWidth = sourceWidth / 2;
    var destHeight = sourceHeight / 2;
    var destX = (canvas.width / 2 - destWidth / 2) - 50;
    var destY = 102 + (Math.sin(counter / 2)) + (enemyDyingAnimationCounter * 0.6);
    context.drawImage(enemyRightArm, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

    //foots
    var sourceX = 0;
    var sourceY = (randArr[2]) ? 0 : 380;
    var sourceWidth = 400;
    var sourceHeight = 300;
    var destWidth = sourceWidth / 2;
    var destHeight = sourceHeight / 2;
    var destX = (canvas.width / 2 - destWidth / 2) + 6;
    var destY = 168;
    context.drawImage(enemyFoots, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

    //body
    var sourceX = 0;
    var sourceY = (randArr[1]) ? 0 : 395;
    var sourceWidth = 400;
    var sourceHeight = 300;
    var destWidth = sourceWidth / 2;
    var destHeight = sourceHeight / 2;
    var destX = (canvas.width / 2 - destWidth / 2) + 4;
    var destY = 105 - (Math.sin(counter / 5) / 2) + (enemyDyingAnimationCounter * 0.6);
    context.drawImage(enemyBody, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

    //head
    var sourceX = 0;
    var sourceY = (randArr[0]) ? 0 : 380;
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

export {canvasScript}