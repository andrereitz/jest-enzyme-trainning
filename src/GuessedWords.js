import React from 'react';

import languageContext from './contexts/languageContext';
import guessedWordsContext from './contexts/guessedWordsContext';
import stringsModule from './helpers/strings';

const GuessedWords = () => {
    const [guessedWords] = guessedWordsContext.useGuessedWords();
    const language = React.useContext(languageContext);
    const guessedWordsRows = guessedWords.map((word, index) => {
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
                guessedWords.length === 0 
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

export default GuessedWords;