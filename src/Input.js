import PropTypes from 'prop-types';
import { useState } from 'react';

function Input({ secretWord }){
    const [currentGuess, setCurrentGuess] = useState("");

    function handleClick(e){
        e.preventDefault();
        setCurrentGuess("");
    }

    return(
        <div data-test="component-input">
            <form className="form-inline">
                <input 
                    data-test="input-box" 
                    className="mb-2 mx-sm-3" 
                    type="text" 
                    placeholder="enter guess" 
                    value={currentGuess} 
                    onChange={(event) => setCurrentGuess(event.target.value)} 
                />
                <button 
                    data-test="submit-button"
                    className="btn btn-primary mb-2"
                    onClick={(e) => handleClick(e)}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

Input.propTypes = {
    secretWord: PropTypes.string.isRequired,
}

export default Input;