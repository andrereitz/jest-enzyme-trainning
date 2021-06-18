import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Input({ secretWord }){
    const [currentGuess, setCurrentGuess] = useState("");
    const success = useSelector(state => state.success)

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

export default Input;