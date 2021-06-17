import PropTypes from 'prop-types';
import { useContext, useState } from 'react';

import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import stringsModule from './helpers/strings';

function Input({ secretWord }){
    const [success, setSuccess] = successContext.useSuccess();
    const language = useContext(languageContext);
    const [currentGuess, setCurrentGuess] = useState("");

    function handleClick(e){
        e.preventDefault();
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