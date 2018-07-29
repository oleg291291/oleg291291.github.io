import { createStore, combineReducers } from 'redux';
import gameDataReducer from '../reducers/gameData';
import profileDataReducer from '../reducers/profileData';

export default () => {
  const store = createStore(
    combineReducers({
      gameData: gameDataReducer,
      profileData: profileDataReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
