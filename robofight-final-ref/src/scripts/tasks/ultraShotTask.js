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

    taskScreen.querySelector('.task__brief').innerText = 'Answer the question!';

    var questionsArr = [
        ['months in a year', 'twelve', 12],
        ['days in a week', 'seven', 7],
        ['hours in a day', 'twenty four', 24],
        ['minutes in an hour', 'sixty', 60],
    ];

    var questionArr = questionsArr[getRandomInt(0, questionsArr.length)];

    taskDescription.innerText = 'How many ' + questionArr[0] + ' ?';

    function checkAnswer(event) {
        event.preventDefault();

        if (taskInput.value.toLowerCase() === questionArr[1] || taskInput.value == questionArr[2]) {
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