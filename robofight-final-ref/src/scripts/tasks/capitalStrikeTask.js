import visualHypnosisOnPlayer from '../visualEffects/visualHypnosisOnPlayer'

import visualBlizzard from '../visualEffects/visualBlizzard'

import soundEffects from '../soundEffects'
import energyCounter from '../energyCounter'

import getRandomInt from '../getRandomInt'

export default () => {
    var taskContainer = document.querySelector('.task-container');
    var taskScreen = taskContainer.querySelector('.task');
    var taskDescription = taskScreen.querySelector('.task__description');
    var taskForm = taskScreen.querySelector('.task__form');
    var taskInput = taskForm.querySelector('.task__answer');


    taskScreen.querySelector('.task__brief').innerText = 'Name the capital of this country!';

    var dataArr = [
        ['belarus', 'minsk'],
        ['russia', 'moscow'],
        ['ukraine', 'kiev'],
        ['france', 'paris'],
        ['italy', 'rome'],
        ['germany', 'berlin'],
        ['japan', 'tokyo'],
        ['usa', 'washington']
    ];

    var countryArr = dataArr[getRandomInt(0, dataArr.length)];
    taskDescription.innerText = countryArr[0].toUpperCase() + " - ???";

    function checkAnswer(event) {
        event.preventDefault();

        if (taskInput.value.toLowerCase() === countryArr[1]) {
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