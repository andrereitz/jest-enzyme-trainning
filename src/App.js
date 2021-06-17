import { useEffect, useState } from 'react';
import './App.css';

import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from './actions';

function App() {
  const [secretWord, setSecretWord] = useState('');

  const success = false;
  const guessedWords = [];

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, [])

  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input success={success} secretWord={secretWord} guessedWords={guessedWords} />
      <GuessedWords guessedWords={[ { guessedWord: 'girl', letterMatchCount: 3 } ]} />
    </div>
  );
}

export default App;
