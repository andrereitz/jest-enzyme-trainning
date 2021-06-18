import { combineReducers } from "redux";
import success from './successReducer';
import guessedWords from './guessedWord.reducer';

export default combineReducers({
    success,
    guessedWords
})