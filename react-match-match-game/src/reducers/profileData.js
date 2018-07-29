const gameDataReducerDefaultState = [];

export default (state = gameDataReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_PROFILE_INFO':
      return [
        action.item
      ];
    default:
      return state;
  }
};