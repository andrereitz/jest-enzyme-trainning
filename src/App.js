import logo from './logo.svg';
import './App.css';

import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  function handleIncrement(){
    if(error){
      setError(null);
    }

    setCount(count + 1);
  }

  function handleDecrement(){
    if(count == 0){
      setError('Error - Can\'t go below 0' );
    }else{
      if(error){
        setError('');
      }

      setCount(count - 1);
    }
  }

  return (
    <div className="App" data-test="component-app">
      <h1 data-test="counter-display">The counter is currently <span data-test="count">{count}</span></h1>
      <button onClick={() => handleIncrement()} data-test="increment-button">Increment</button>
      <button onClick={() => handleDecrement()} data-test="decrement-button">Decrement</button>
      {error &&
        <div data-test="error">{error}</div>
      }
    </div>
  );
}

export default App;
