// src/App.jsx
import React, { useState } from 'react';
import PuzzleBoard from '../src/components/PuzzleBoard'

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleAccept = () => {
    setShowIntro(false);
  };

  return (
    <div className="App">
      {showIntro ? (
        <div className="center">
          <div className="intro">
            <h1>Bienvenido al Juego de Puzzle</h1>
            <button onClick={handleAccept} className="btn btn-primary">Aceptar</button>
          </div>
        </div>
      ) : (
        <PuzzleBoard />
      )}
    </div>
  );
}

export default App;
