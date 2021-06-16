import './App.css';

import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';

function App() {
  const success = false;
  const secretWord = 'golf';
  const guessedWords = [];

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
