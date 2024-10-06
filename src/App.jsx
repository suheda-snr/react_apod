import React from 'react';
import APOD from './APOD';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header>
        <h2>Astronomy Picture of the Day</h2>
      </header>
      <main>
        <APOD />
      </main>
    </div>
  );
};

export default App;