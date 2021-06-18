import { combineReducers } from "redux";
import success from './successReducer';
import guessedWords from './guessedWord.reducer';
import secretWord from "./secretWord.reducer";

export default combineReducers({
    success,
    guessedWords,
    secretWord
})