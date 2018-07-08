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

    taskScreen.querySelector('.task__brief').innerText = 'What time of the year is this month?';

    var dataArr = [
        ['winter', 'december', 'january', 'february'],
        ['spring', 'march', 'april', 'may'],
        ['summer', 'june', 'july', 'august'],
        ['autumn', 'september', 'october', 'november'],
    ];

    var seasonArr = dataArr[getRandomInt(0, dataArr.length)];
    taskDescription.innerText = seasonArr[getRandomInt(1, 4)].toUpperCase() + " - ???";

    function checkAnswer(event) {
        event.preventDefault();

        if (seasonArr[0] === taskInput.value.toLowerCase()) {
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