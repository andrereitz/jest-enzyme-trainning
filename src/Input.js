import PropTypes from 'prop-types';
import { useContext, useState } from 'react';

import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';
import stringsModule from './helpers/strings';
import { getLetterMatchCount } from './helpers'

function Input({ secretWord }){
    const [success, setSuccess] = successContext.useSuccess();
    const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();
    const language = useContext(languageContext);
    const [currentGuess, setCurrentGuess] = useState("");

    function handleClick(e){
        e.preventDefault();

        const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
        const newGuessedWords = [...guessedWords, { guessedWord: currentGuess, letterMatchCount }];

        setGuessedWords(newGuessedWords);

        if(currentGuess === secretWord) setSuccess(true);

        setCurrentGuess("");
    }

    if(success){
        return <div data-test="component-input"></div>
    }

    return(
        <div data-test="component-input">
            <form className="form-inline">
                <input 
                    data-test="input-box" 
                    className="mb-2 mx-sm-3" 
                    type="text" 
                    placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')} 
                    value={currentGuess} 
                    onChange={(event) => setCurrentGuess(event.target.value)} 
                />
                <button 
                    data-test="submit-button"
                    className="btn btn-primary mb-2"
                    onClick={(e) => handleClick(e)}
                >
                    {stringsModule.getStringByLanguage(language, 'submit')}
                </button>
            </form>
        </div>
    )
}

Input.propTypes = {
    secretWord: PropTypes.string.isRequired,
}

export default Input;