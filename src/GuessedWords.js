import React from 'react';
import PropTypes from 'prop-types';

import languageContext from './contexts/languageContext';
import stringsModule from './helpers/strings';

const GuessedWords = (props) => {
    const language = React.useContext(languageContext);
    const guessedWordsRows = props.guessedWords.map((word, index) => {
        return(
            <tr data-test="guessed-word" key={`word-${index}`}>
                <td>{ word.guessedWord }</td>
                <td>{ word.letterMatchCount }</td>
            </tr>
        )
    })

    return(
        <div data-test="component-guessed-words">
            { 
                props.guessedWords.length === 0 
                ?
                    <span data-test="guess-instructions">
                        {stringsModule.getStringByLanguage(language, 'guessPrompt')}
                    </span>
                :
                    <div data-test="guessed-words">
                        <h3>{stringsModule.getStringByLanguage(language, 'guessedWords')}</h3>
                        <table className="table table-sm">
                            <thead className="thead-light">
                                <tr>
                                    <th>{stringsModule.getStringByLanguage(language, 'guessColumnHeader')}</th>
                                    <th>{stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                { guessedWordsRows }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    )
}

GuessedWords.propTypes = {
    guessedWords: PropTypes.arrayOf(
        PropTypes.shape({
            guessedWord: PropTypes.string.isRequired,
            letterMatchCount: PropTypes.number.isRequired
        })
    ).isRequired,
};

export default GuessedWords;