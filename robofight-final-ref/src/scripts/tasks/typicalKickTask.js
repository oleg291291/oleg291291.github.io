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


    taskScreen.querySelector('.task__brief').innerText = 'Type common name for this!';

    var dataArr = [
        ['fruit', 'apple', 'pear', 'banana'],
        ['vegetable', 'potato', 'cucumber', 'cabbage'],
        ['sport', 'football', 'tennis', 'baseball'],
        ['color', 'red', 'blue', 'purple'],
    ];

    var commonNameArr = dataArr[getRandomInt(0, dataArr.length)];
    var taskDescriptionString = commonNameArr.slice(1).join(', ') + " are ...";
    taskDescription.innerText = taskDescriptionString.charAt(0).toUpperCase() + taskDescriptionString.slice(1);

    function checkAnswer(event) {
        event.preventDefault();

        if (commonNameArr[0] === taskInput.value || commonNameArr[0] + 's' === taskInput.value) {
         visualBlizzard();
            soundEffects('soundBlizzard');
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