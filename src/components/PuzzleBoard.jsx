import React, { useState, useMemo } from 'react';
import PuzzlePiece from './PuzzlePiece';

const PuzzleBoard = () => {
  // Usamos useMemo para memorizar el array de niveles y evitar que cambie en cada renderizado
  const levels = useMemo(() => [
    [
      { left: 200, top: 100 },
      { left: 304, top: 100 },
      { left: 446, top: 233 },
      { left: 200, top: 204 },
    ],
    [
      { left: 100, top: 50 },
      { left: 220, top: 80 },
      { left: 340, top: 130 },
      { left: 460, top: 170 },
    ],
    // Añadir más niveles según sea necesario
  ], []);

  const [currentLevel, setCurrentLevel] = useState(0);
  const [placedPieces, setPlacedPieces] = useState([]);

  const handlePiecePlaced = (pieceId) => {
    setPlacedPieces((prev) => [...prev, pieceId]);
  };

  // UseEffect que verifica si todas las piezas están en su posición correcta
  React.useEffect(() => {
    if (placedPieces.length === levels[currentLevel].length) {
      alert(`¡Nivel ${currentLevel + 1} completado!`);
      setPlacedPieces([]);
      setCurrentLevel((prev) => Math.min(prev + 1, levels.length - 1));
    }
  }, [placedPieces, currentLevel, levels]);

  const handleNextLevel = () => {
    setCurrentLevel((prev) => Math.min(prev + 1, levels.length - 1));
    setPlacedPieces([]);
  };

  const handlePrevLevel = () => {
    setCurrentLevel((prev) => Math.max(prev - 1, 0));
    setPlacedPieces([]);
  };

  const handleRestartLevel = () => {
    setPlacedPieces([]);
  };

  const progressPercentage = ((currentLevel + 1) / levels.length) * 100;

  return (
    <div style={{ position: 'relative', width: '800px', height: '600px', border: '1px solid black' }}>
      {levels[currentLevel].map((position, index) => (
        <PuzzlePiece
          key={index}
          pieceId={index}
          correctPosition={position}
          onPiecePlaced={handlePiecePlaced}
        />
      ))}

      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
        <button onClick={handlePrevLevel} disabled={currentLevel === 0}>Nivel Anterior</button>
        <button onClick={handleRestartLevel}>Reiniciar Nivel</button>
        <button onClick={handleNextLevel} disabled={currentLevel === levels.length - 1}>Siguiente Nivel</button>
      </div>

      <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: '80%', backgroundColor: '#eee', height: '10px', borderRadius: '5px' }}>
        <div style={{ width: `${progressPercentage}%`, backgroundColor: '#4caf50', height: '100%', borderRadius: '5px' }}></div>
      </div>
    </div>
  );
};

export default PuzzleBoard;
