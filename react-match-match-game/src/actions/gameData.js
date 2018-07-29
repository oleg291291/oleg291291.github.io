import uuid from 'uuid';

export const solvedCardsInc = (
) => ({
  type: 'SOLVED_CARDS_INC',
}); 
export const solvedCardsReset = (
) => ({
  type: 'SOLVED_CARDS_RESET',
}); 
export const timerInc = () => ({
  type: 'TIMER_INC'
}); 
export const setTime = (timeValue) => ({
  type: 'SET_TIME',
  item: {
    time: timeValue
  }
}); 
export const openedCardsAdd = (cardValue, myRef) => ({
  type: 'OPENED_CARDS_ADD',
  item: {
    card: cardValue,
    ref: myRef
  }
}); 
export const openedCardsReset = () => ({
  type: 'OPENED_CARDS_RESET',
}); 
