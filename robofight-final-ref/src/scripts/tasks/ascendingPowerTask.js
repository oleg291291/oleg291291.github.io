import $ from 'jquery'

import visualHypnosisOnPlayer from '../visualEffects/visualHypnosisOnPlayer'

import soundEffects from '../soundEffects'
import energyCounter from '../energyCounter'


import visualBurner from '../visualEffects/visualBurner'

import getRandomInt from '../getRandomInt'

export default () => {
    var taskContainer = document.querySelector('.task-container');
    var taskScreen = taskContainer.querySelector('.task');
    var taskDescription = taskScreen.querySelector('.task__description');
    var taskForm = taskScreen.querySelector('.task__form');
    var taskInput = taskForm.querySelector('.task__answer');

    var sortable = require("jquery-ui/ui/widgets/sortable.js");

    $("#sortable").sortable({ axis: "x" });

    taskInput.style.display = 'none';

    var x = getRandomInt(0, 100);

    var numsArr = [];
    var numsArrLength = 6;
    for (var i = 0; i < numsArrLength; i++) {
        numsArr.push(getRandomInt(0, 100));
    }

    taskScreen.querySelector('.task__brief').innerText = 'Sort the numbers in ascending order!';

    var sortableList = document.querySelector(".task__sortable-list");

    for (var i = 0; i < numsArr.length; i++) {
        var li = document.createElement('li');
        li.className = 'task__sortable-list-item';
        li.innerText = numsArr[i];
        li.setAttribute('draggable', 'true');
        sortableList.appendChild(li);
    }

    sortableList.style.display = 'flex';

    function checkAnswer(event) {
        event.preventDefault();

        var numsSortedStr = numsArr.sort((a, b) => {
            return a - b;
        }).join('');
        var answerFromListItems = [...sortableList.querySelectorAll('li')].reduce((sum, current) => { return sum + current.innerText; }, "");

        if (answerFromListItems === numsSortedStr) {
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