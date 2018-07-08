import visualHypnosisOnPlayer from '../visualEffects/visualHypnosisOnPlayer'

import visualBurner from '../visualEffects/visualBurner'

import soundEffects from '../soundEffects'
import energyCounter from '../energyCounter'

import getRandomInt from '../getRandomInt'

export default () => {
    var taskContainer = document.querySelector('.task-container');
    var taskScreen = taskContainer.querySelector('.task');
    var taskDescription = taskScreen.querySelector('.task__description');
    var taskForm = taskScreen.querySelector('.task__form');
    var taskInput = taskForm.querySelector('.task__answer');

    taskScreen.querySelector('.task__brief').innerText = 'Print the number corresponding to the condition!';

    var maxNum = getRandomInt(10, 100);
    var minNum = getRandomInt(maxNum - 10, maxNum - 6);

    var isEven = getRandomInt(0, 2) ? 'Even' : 'Odd';
    var taskDescription = document.querySelector('.task__description');

    taskDescription.innerText = isEven + ' more than ' + minNum + ' and lower than ' + maxNum;

    function checkAnswer(event) {
        event.preventDefault();

        var isParityRight = (isEven === 'Even' && taskInput.value % 2 === 0) || (isEven === 'Odd' && taskInput.value % 2 !== 0) ? true : false;

        if (isParityRight && minNum < taskInput.value && taskInput.value < maxNum) {
            visualBurner();
            soundEffects('soundBurner');
            const damage = 20;
            const target = 'enemy';
            energyCounter(damage, target);

        }
        else {
            visualHypnosisOnPlayer();
            soundEffects('soundHypnosis');
            const damage = 20;
            const target = 'player';
            energyCounter(damage, target)
        }
        taskContainer.parentNode.removeChild(taskContainer);
    }

    taskForm.addEventListener("submit", checkAnswer);

}