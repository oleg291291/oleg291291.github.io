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

    taskScreen.querySelector('.task__brief').innerText = 'Solve expression to attack!';

    var operation = getRandomInt(0, 3);

    var x = (operation == 2) ? getRandomInt(3, 10) : getRandomInt(10, 100);
    var y = (operation == 2) ? getRandomInt(3, 10) : getRandomInt(10, 100);

    var operations = ['+', '-', '*'];
    var result = 0;

    switch (operation) {
        case 0: result = x + y;
            break;
        case 1: result = x - y;
            break;
        case 2: result = x * y;
            break;
    }

    taskDescription.innerText = x + ' ' + operations[operation] + ' ' + y + ' = ???';

    function checkAnswer(event) {
        event.preventDefault();
        if (result == taskInput.value) {
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