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
        for (let i = 0; i < voices.length; i++) {
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