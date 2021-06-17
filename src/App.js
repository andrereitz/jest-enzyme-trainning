import { useEffect, useState, useReducer } from 'react';
import './App.css';

import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from './actions';

const reducer = (state, action) => {
  switch(action.type) {
    case 'setSecretWord':
        return { ...state, secretWord: action.payload }
    default: 
      throw new Error(`Inavlid action type: ${action.type}`)
  }
}

function App() {
  // const [secretWord, setSecretWord] = useState('');

  const [state, dispatch] = useReducer(
    reducer,
    { secretWord: '' }
  )

  const success = false;
  const guessedWords = [];

  const setSecretWord = (secretWord) => {
    dispatch({ type: 'setSecretWord', payload: secretWord });
  }

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, [])

  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input success={success} secretWord={state.secretWord} guessedWords={guessedWords} />
      <GuessedWords guessedWords={[ { guessedWord: 'girl', letterMatchCount: 3 } ]} />
    </div>
  );
}

export default App;
