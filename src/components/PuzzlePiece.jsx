import React, { useState } from 'react';

const PuzzlePiece = ({ pieceId, correctPosition, onPiecePlaced }) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [isPlaced, setIsPlaced] = useState(false);
  
  const handleMouseDown = (e) => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const newPosition = {
      left: e.clientX,
      top: e.clientY,
    };
    setPosition(newPosition);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    
    if (Math.abs(position.left - correctPosition.left) < 30 &&
        Math.abs(position.top - correctPosition.top) < 30) {
      setPosition(correctPosition);
      setIsPlaced(true);
      onPiecePlaced(pieceId);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: position.left,
        top: position.top,
        pointerEvents: isPlaced ? 'none' : 'auto',
        zIndex: isPlaced ? '0' : '5',
        transition: isPlaced ? 'top 0.3s, left 0.3s' : 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Contenido o imagen de la pieza */}
    </div>
  );
};

export default PuzzlePiece;
