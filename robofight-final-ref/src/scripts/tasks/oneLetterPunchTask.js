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

    taskScreen.querySelector('.task__brief').innerText = 'Add one letter to make the word';

    var wordsArr = ['apple', 'orange', 'banana', 'melon', 'grapes', 'nectarine', 'peach', 'avocado'];
    var word = wordsArr[getRandomInt(0, wordsArr.length)];
    var separator = getRandomInt(1, word.length - 1);
    taskDescription.innerText = (word.slice(0, separator) + '_' + word.slice(separator + 1)).toUpperCase();

    function checkAnswer(event) {
        event.preventDefault();

        if (taskInput.value.toLowerCase() === word[separator]) {
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