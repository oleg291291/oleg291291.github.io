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


    taskScreen.querySelector('.task__brief').innerText = 'Complete the sentence';

    var daysArr = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    var dayNum = getRandomInt(0, daysArr.length);
    var dayNumStr = dayNum + 1 + "";
    if (dayNum === 0) {
        dayNumStr += 'st';
    }
    if (dayNum === 1) {
        dayNumStr += 'nd';
    }
    if (dayNum > 1) {
        dayNumStr += 'th';
    }

    taskDescription.innerText = dayNumStr + ' day of a week is...';

    function checkAnswer(event) {
        event.preventDefault();

        if (taskInput.value.toLowerCase() === daysArr[dayNum]) {
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