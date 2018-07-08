import mathPowerTask from './tasks/mathPowerTask'
import trancelationTask from './tasks/trancelationTask'
import sortingBlastTask from './tasks/sortingBlastTask'
import soundAttackTask from './tasks/soundAttackTask'
import oneLetterPunchTask from './tasks/oneLetterPunchTask'
import capitalStrikeTask from './tasks/capitalStrikeTask'
import timeSplashTask from './tasks/timeSplashTask'
import typicalKickTask from './tasks/typicalKickTask'
import weakSpotAttackTask from './tasks/weakSpotAttackTask'
import ultraShotTask from './tasks/ultraShotTask'
import sentenceSenseTask from './tasks/sentenceSenseTask'
import ascendingPowerTask from './tasks/ascendingPowerTask'
import accurateShotTask from './tasks/accurateShotTask'
import atomicDividerTask from './tasks/atomicDividerTask'
import mortalComboTask from './tasks/mortalComboTask'


export default function taskManager(event) {

  var taskScreen = document.querySelector('.task');
  taskScreen.style.display = 'flex';
  var taskAnswer = document.querySelector(".task__answer");
  taskAnswer.focus();

  var taskName = event.target.getAttribute('data-task-name');

  switch (taskName) {
    case 'mathPowerTask':
      mathPowerTask();
      break;
    case 'trancelationTask':
      trancelationTask();
      break;
    case 'sortingBlastTask':
      sortingBlastTask();
      break;
    case 'soundAttackTask':
      soundAttackTask();
      break;
    case 'oneLetterPunchTask':
      oneLetterPunchTask();
      break;
    case 'capitalStrikeTask':
      capitalStrikeTask();
      break;
    case 'timeSplashTask':
      timeSplashTask();
      break;
    case 'typicalKickTask':
      typicalKickTask();
      break;
    case 'weakSpotAttackTask':
      weakSpotAttackTask();
      break;
    case 'ultraShotTask':
      ultraShotTask();
      break;
    case 'sentenceSenseTask':
      sentenceSenseTask();
      break;
    case 'ascendingPowerTask':
      ascendingPowerTask();
      break;
    case 'accurateShotTask':
      accurateShotTask();
      break;
    case 'atomicDividerTask':
      atomicDividerTask();
      break;
    case 'mortalComboTask':
      mortalComboTask();
      break;
  }

}
