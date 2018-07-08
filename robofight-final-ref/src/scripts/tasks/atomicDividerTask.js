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


    taskScreen.querySelector('.task__brief').innerText = 'Rest of division is...';

    var num = getRandomInt(30, 100);
    var divider = getRandomInt(2, 10);

    var taskDescription = document.querySelector('.task__description');

    taskDescription.innerText = num + ' / ' + divider;

    function checkAnswer(event) {
        event.preventDefault();

        if (num % divider == taskInput.value) {
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