import dictArr from '../../json/dictionary.json'

import visualHypnosisOnPlayer from '../visualEffects/visualHypnosisOnPlayer'

import soundEffects from '../soundEffects'
import energyCounter from '../energyCounter'

import visualBlizzard from '../visualEffects/visualBlizzard'

import getRandomInt from '../getRandomInt'

export default () => {
    var taskContainer = document.querySelector('.task-container');
    var taskScreen = taskContainer.querySelector('.task');
    var taskDescription = taskScreen.querySelector('.task__description');
    var taskForm = taskScreen.querySelector('.task__form');
    var taskInput = taskForm.querySelector('.task__answer');

    taskScreen.querySelector('.task__brief').innerText = 'Translate this word to russian!';

    var wordArr = dictArr[getRandomInt(0, dictArr.length)];
    taskDescription.innerText = wordArr[0] + " = ???";

    function checkAnswer(event) {
        event.preventDefault();

        var isRightTranslation = (wordArr.indexOf(taskInput.value.toLowerCase()) !== -1) ? true : false;

        if (isRightTranslation) {
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