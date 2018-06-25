import dictArr from '../json/dictionary.json'

import $ from 'jquery'

import { enemyAttack } from './enemyAttack'

import { visualBlizzard } from './visualEffects'
import { visualBurner } from './visualEffects'

import nameGenerator from './nameGenerator'
import getRandomInt from './getRandomInt'

var sortable = require("jquery-ui/ui/widgets/sortable.js")

export default function runTask(event) {

  var taskNumber = +event.target.getAttribute('data-task');
  var taskContainer = document.querySelector('.task-container');
  var spellMenuContainer = document.querySelector('.spell-menu-container');

  var taskScreen = document.querySelector('.task');
  taskScreen.style.display = 'flex';

  document.querySelector(".task__answer").focus();

  var taskDescription = document.querySelector('.task__description');

  var taskForm = taskScreen.querySelector('.task__form');
  var taskInput = taskForm.querySelector('.task__answer');


  if (taskNumber === 0) {
    taskScreen.querySelector('.task__brief').innerText = 'Solve expression to attack!';

    var op = getRandomInt(0, 3);

    var x = (op == 2) ? getRandomInt(1, 10) : getRandomInt(10, 100);
    var y = (op == 2) ? getRandomInt(1, 10) : getRandomInt(10, 100);

    var ops = ['+', '-', '*'];
    let result = 0;

    switch (op) {
      case 0: result = x + y;
        break;
      case 1: result = x - y;
        break;
      case 2: result = x * y;
        break;
    }

    taskDescription.innerText = x + ' ' + ops[op] + ' ' + y + ' = ???';

    function checkAnswer(event) {
      event.preventDefault();
      if (result == taskInput.value) {
        visualBurner();
      }
      else {
        enemyAttack();
      }

      taskContainer.parentNode.removeChild(taskContainer);
    }
    taskForm.addEventListener("submit", checkAnswer);

  }
  if (taskNumber === 1) {
    taskScreen.querySelector('.task__brief').innerText = 'Translate this word to russian!';

    var wordArr = dictArr[getRandomInt(0, dictArr.length)];
    taskDescription.innerText = wordArr[0] + " = ???";

    function checkAnswer(event) {
      event.preventDefault();

      var isRightTranslation = (wordArr.indexOf(taskInput.value.toLowerCase()) !== -1) ? true : false;

      if (isRightTranslation) {
        visualBlizzard();
      }
      else {
        enemyAttack();
      }

      taskContainer.parentNode.removeChild(taskContainer);
    }

    taskForm.addEventListener("submit", checkAnswer);
  }

  if (taskNumber === 2) {

    $("#sortable").sortable({ axis: "x" });

    taskInput.style.display = 'none';

    var wordsArr = ['yellow', 'green', 'brown', 'violet', 'orange', 'purple'];

    taskScreen.querySelector('.task__brief').innerText = 'Make word from letters!';

    var word = wordsArr[getRandomInt(0, wordsArr.length)];
    var shuffledWord = word.split('').sort(function () { return Math.random() > .5 ? -1 : 1; }).join('');

    var sortableList = document.querySelector(".task__sortable-list");

    for (var i = 0; i < word.length; i++) {
      var li = document.createElement('li');
      li.className = 'task__sortable-list-item';
      li.innerText = shuffledWord[i];
      li.setAttribute('draggable', 'true');
      sortableList.appendChild(li);
    }

    sortableList.style.display = 'flex';

    function checkAnswer(event) {
      event.preventDefault();

      var answerFromListItems = [...sortableList.querySelectorAll('li')].reduce((sum, current) => { return sum + current.innerText; }, "").toLowerCase();

      if (answerFromListItems == word) {
        visualBurner();
      }
      else {
        enemyAttack();
      }

      taskContainer.parentNode.removeChild(taskContainer);
    }

    taskForm.addEventListener("submit", checkAnswer);

  }
  if (taskNumber === 3) {

    taskScreen.querySelector('.task__brief').innerText = 'Type the word you hear';

    var wordsArr = ['head', 'body', 'arm', 'legs', 'cheek', 'nose', 'ear', 'hair', 'eyebrow', 'neck'];
    var word = wordsArr[getRandomInt(0, wordsArr.length)];

    var synth = window.speechSynthesis;

    var taskPlayButton = document.querySelector(".task__voice-button");
    taskPlayButton.style.display = 'block';

    function playButtonHandler(event) {
      event.preventDefault();
      var utterThis = new SpeechSynthesisUtterance(word);
      utterThis.rate = 0.8;

      var voices = synth.getVoices();
      for (i = 0; i < voices.length; i++) {
        if (voices[i].name === "Microsoft Anna - English (United States)") {
          utterThis.voice = voices[i];
        }
      }

      synth.speak(utterThis);
      taskInput.focus();
    }
    taskPlayButton.addEventListener("click", playButtonHandler);

    function checkAnswer(event) {
      event.preventDefault();

      if (taskInput.value.toLowerCase() === word) {
        visualBlizzard();
      }
      else {
        enemyAttack();
      }
      taskContainer.parentNode.removeChild(taskContainer);
    }
    taskForm.addEventListener("submit", checkAnswer);
  }
  if (taskNumber === 4) {

    taskScreen.querySelector('.task__brief').innerText = 'Add one letter to make the word';

    var wordsArr = ['apple', 'orange', 'banana', 'melon', 'grapes', 'nectarine', 'peach', 'avocado'];
    var word = wordsArr[getRandomInt(0, wordsArr.length)];
    var separator = getRandomInt(1, word.length - 1);
    taskDescription.innerText = (word.slice(0, separator) + '_' + word.slice(separator + 1)).toUpperCase();

    function checkAnswer(event) {
      event.preventDefault();

      if (taskInput.value.toLowerCase() === word[separator]) {
        visualBurner();
      }
      else {
        enemyAttack();
      }
      taskContainer.parentNode.removeChild(taskContainer);
    }
    taskForm.addEventListener("submit", checkAnswer);
  }
  if (taskNumber === 5) {
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
      }
      else {
        enemyAttack();
      }
      taskContainer.parentNode.removeChild(taskContainer);

    }
    taskForm.addEventListener("submit", checkAnswer);
  }
  if (taskNumber === 6) {
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
      }
      else {
        enemyAttack();
      }
      taskContainer.parentNode.removeChild(taskContainer);

    }
    taskForm.addEventListener("submit", checkAnswer);
  }
  if (taskNumber === 7) {
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
        visualBurner();
      }
      else {
        enemyAttack();
      }

      taskContainer.parentNode.removeChild(taskContainer);
    }
    taskForm.addEventListener("submit", checkAnswer);
  }
  if (taskNumber === 8) {
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
      }
      else {
        enemyAttack();
      }

      taskContainer.parentNode.removeChild(taskContainer);
    }
    taskForm.addEventListener("submit", checkAnswer);
  }

  if (taskNumber === 9) {
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
      }
      else {
        enemyAttack();
      }

      taskContainer.parentNode.removeChild(taskContainer);
    }
    taskForm.addEventListener("submit", checkAnswer);
  }

  if (taskNumber === 10) {
    var sortable = require('jquery-ui');
    $("#sortable").sortable({ axis: "x" });
    $("#sortable").disableSelection();

    taskInput.style.display = 'none';

    var sentencesArr = [
      'the pizza smells delicious',
      'we went to the beach',
      'my name is john'
    ]

    taskScreen.querySelector('.task__brief').innerText = 'Make sentence from words!';

    var sentence = sentencesArr[getRandomInt(0, sentencesArr.length)];
    var shuffledSentenceArr = sentence.split(' ').sort(function () { return Math.random() > .5 ? -1 : 1; });

    var sortableList = document.querySelector(".task__sortable-list");

    for (var i = 0; i < shuffledSentenceArr.length; i++) {
      var li = document.createElement('li');
      li.className = 'task__sortable-list-item';
      li.innerText = shuffledSentenceArr[i];
      li.setAttribute('draggable', 'true');
      sortableList.appendChild(li);
    }

    sortableList.style.display = 'flex';
    function checkAnswer(event) {
      event.preventDefault();

      var answerFromListItems = [...sortableList.querySelectorAll('li')].reduce((sum, current) => { return sum + current.innerText + " "; }, "").toLowerCase();

      if (answerFromListItems.slice(0, -1) == sentence.toLowerCase()) {
        visualBurner();
      }
      else {
        enemyAttack();
      }
      taskContainer.parentNode.removeChild(taskContainer);
    }
    taskForm.addEventListener("submit", checkAnswer);
  }

  if (taskNumber === 11) {
    var sortable = require('jquery-ui');
    $("#sortable").sortable({ axis: "x" });
    $("#sortable").disableSelection();

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
      }
      else {
        enemyAttack();
      }
      taskContainer.parentNode.removeChild(taskContainer);
    }

    taskForm.addEventListener("submit", checkAnswer);
  }

  if (taskNumber === 12) {
    taskScreen.querySelector('.task__brief').innerText = 'Print the number corresponding to the condition!';

    var maxNum = getRandomInt(10, 100);
    var minNum = getRandomInt(maxNum - 10, maxNum - 6);

    var isEven = getRandomInt(0, 2) ? 'Even' : 'Odd';
    var taskDescription = document.querySelector('.task__description');

    taskDescription.innerText = isEven + ' more than ' + minNum + ' and lower than ' + maxNum;

    function checkAnswer(event) {
      event.preventDefault();

      var isParityRight = (isEven === 'Even' && taskInput.value % 2 === 0) || (isEven === 'Odd' && taskInput.value % 2 !== 0) ? true : false;

      if (isParityRight && minNum < taskInput.value && taskInput.value < maxNum) {
        visualBurner();
      }
      else {
        enemyAttack();
      }
      taskContainer.parentNode.removeChild(taskContainer);
    }

    taskForm.addEventListener("submit", checkAnswer);

  }

  if (taskNumber === 13) {

    taskScreen.querySelector('.task__brief').innerText = 'Rest of division is...';

    var num = getRandomInt(30, 100);
    var divider = getRandomInt(2, 10);

    var taskDescription = document.querySelector('.task__description');

    taskDescription.innerText = num + ' / ' + divider;

    function checkAnswer(event) {
      event.preventDefault();

      if (num % divider == taskInput.value) {
        visualBurner();
      }
      else {
        enemyAttack();
      }
      taskContainer.parentNode.removeChild(taskContainer);
    }

    taskForm.addEventListener("submit", checkAnswer);

  }

  if (taskNumber === 14) {

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
      }
      else {
        enemyAttack();
      }
      taskContainer.parentNode.removeChild(taskContainer);
    }

    taskForm.addEventListener("submit", checkAnswer);
  }


}
