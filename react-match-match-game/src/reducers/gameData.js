const gameDataReducerDefaultState = [{ cardsSolved: 0, openedCards: [], openedCardsRefs: [] }];

export default (state = gameDataReducerDefaultState, action) => {
  switch (action.type) {
    case 'SOLVED_CARDS_INC':
      return [{
        ...state[0],
        cardsSolved: (state[0].cardsSolved + 2)
      }]
    case 'SOLVED_CARDS_RESET':
      return [{
        ...state[0],
        cardsSolved: 0
      }]
    case 'SET_TIME':
      return [{
        ...state[0],
        time: action.item.time
      }]
    case 'OPENED_CARDS_ADD':
      return [{
        ...state[0],
        openedCards: state[0].openedCards.concat(action.item.card),
        openedCardsRefs: state[0].openedCardsRefs.concat(action.item.ref)
      }]
    case 'OPENED_CARDS_RESET':
      return [{
        ...state[0],
        openedCards: [],
        openedCardsRefs: []
      }]

    default:
      return state;
  }
};