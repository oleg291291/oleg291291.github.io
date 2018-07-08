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


    taskScreen.querySelector('.task__brief').innerText = 'Print the next number of sequence!';

    var modificator = getRandomInt(0, 2) === 0 ? 'sum' : 'mult';
    var num = modificator === 'sum' ? getRandomInt(2, 80) : getRandomInt(2, 10);
    var modNum = modificator === 'sum' ? getRandomInt(3, 20) : getRandomInt(2, 5);

    var taskDescription = document.querySelector('.task__description');

    taskDescription.innerText = modificator === 'sum' ? (num + " " + (num + modNum) + " " + (num + modNum * 2) + " ...") : (num + " " + (num * modNum) + " " + (num * modNum) * modNum + " ...");

    function checkAnswer(event) {
        event.preventDefault();

        if (modificator === 'sum' && taskInput.value == num + modNum * 3 || modificator === 'mult' && taskInput.value == ((num * modNum) * modNum) * modNum) {
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