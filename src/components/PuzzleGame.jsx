// src/components/PuzzleGame.jsx
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Swal from 'sweetalert2';

function PuzzleGame() {
  const [nivel, setNivel] = useState(1);
  const [piezaAOK, setPiezaAOK] = useState(false);
  const [piezaBOK, setPiezaBOK] = useState(false);
  const [piezaCOK, setPiezaCOK] = useState(false);
  const [piezaDOK, setPiezaDOK] = useState(false);

  const piezasRefs = useRef([]);
  const marcoMaderaRef = useRef(null);
  const miDivRef = useRef(null);
  const piecesBoardRef = useRef(null);
  const crayonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);
  const restartButtonRef = useRef(null);

  const [selectedPiece, setSelectedPiece] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const piecePositions = useMemo(() => ({
    A: { left: 200, top: 100 },
    B: { left: 304, top: 100 },
    C: { left: 446, top: 233 },
    D: { left: 200, top: 204 },
  }), []);

  const updatePositions = () => {
    if (!miDivRef.current || !nextButtonRef.current || !prevButtonRef.current || !restartButtonRef.current || !piecesBoardRef.current || !crayonRef.current) {
      return;
    }

    const anchoDiv = miDivRef.current.offsetWidth;
    const altoDiv = miDivRef.current.offsetHeight;
    const coordenadaLeft = miDivRef.current.offsetLeft;
    const coordenadaTop = miDivRef.current.offsetTop;
    const anchoPorcentual = anchoDiv / 100;
    const altoPorcentual = altoDiv / 100;

    nextButtonRef.current.style.left = `${coordenadaLeft + anchoPorcentual * 137}px`;
    nextButtonRef.current.style.top = `${coordenadaTop + anchoPorcentual * 30}px`;
    prevButtonRef.current.style.left = `${coordenadaLeft + anchoPorcentual * 117}px`;
    prevButtonRef.current.style.top = `${coordenadaTop + anchoPorcentual * 30}px`;
    restartButtonRef.current.style.left = `${coordenadaLeft + anchoPorcentual * 157}px`;
    restartButtonRef.current.style.top = `${coordenadaTop + anchoPorcentual * 30}px`;
    piecesBoardRef.current.style.left = `${coordenadaLeft + anchoPorcentual * 110}px`;
    piecesBoardRef.current.style.top = `${coordenadaTop + altoPorcentual * 39}px`;
    crayonRef.current.style.left = `${coordenadaLeft + anchoPorcentual * 187}px`;
    crayonRef.current.style.top = `${coordenadaTop + altoPorcentual * 80}px`;
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => {
      window.removeEventListener('resize', updatePositions);
    };
  }, []);

  const verificarGanador = useCallback(() => {
    if (piezaAOK && piezaBOK && piezaCOK && piezaDOK) {
      Swal.fire({
        title: `¡Felicidades, avanzaste al nivel ${nivel + 1}!`,
        width: 540,
        color: 'rgb(0, 0, 0)',
        background: '#fff',
        backdrop: `
          rgba(0, 0, 0, 0.421)
          url("/img/confetti.gif")
          center top
          no-repeat
        `,
      });
      setNivel((prev) => prev + 1);
      setPiezaAOK(false);
      setPiezaBOK(false);
      setPiezaCOK(false);
      setPiezaDOK(false);
    }
  }, [nivel, piezaAOK, piezaBOK, piezaCOK, piezaDOK]);

  const handleMouseDown = (index) => (e) => {
    const piece = piezasRefs.current[index];
    e.preventDefault(); // Evita el comportamiento de arrastre predeterminado
    const offsetX = e.clientX - piece.getBoundingClientRect().left;
    const offsetY = e.clientY - piece.getBoundingClientRect().top;

    setSelectedPiece(piece);
    setOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = useCallback((e) => {
    if (!selectedPiece) return;

    const x = e.clientX - offset.x;
    const y = e.clientY - offset.y;
    selectedPiece.style.left = `${x}px`;
    selectedPiece.style.top = `${y}px`;
  }, [selectedPiece, offset]);

  const handleMouseUp = useCallback(() => {
    if (!selectedPiece) return;

    const pieceId = selectedPiece.getAttribute('data-piece');
    const targetPosition = piecePositions[pieceId];
    const x = parseFloat(selectedPiece.style.left);
    const y = parseFloat(selectedPiece.style.top);

    if (Math.abs(x - targetPosition.left) < 30 && Math.abs(y - targetPosition.top) < 30) {
      selectedPiece.style.left = `${targetPosition.left}px`;
      selectedPiece.style.top = `${targetPosition.top}px`;
      selectedPiece.style.pointerEvents = 'none';

      switch (pieceId) {
        case 'A':
          setPiezaAOK(true);
          break;
        case 'B':
          setPiezaBOK(true);
          break;
        case 'C':
          setPiezaCOK(true);
          break;
        case 'D':
          setPiezaDOK(true);
          break;
        default:
          break;
      }
    }

    setSelectedPiece(null);
    verificarGanador();
  }, [selectedPiece, piecePositions, verificarGanador]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div ref={miDivRef} className="puzzle-container">
      <img ref={marcoMaderaRef} src="/img/marcoMadera.png" alt="Marco de madera" />
      <div ref={piecesBoardRef} className="pieces-board">
        {['A', 'B', 'C', 'D'].map((pieceId, index) => (
          <img
            key={pieceId}
            ref={(el) => (piezasRefs.current[index] = el)}
            data-piece={pieceId}
            src={`/img/Elefante/${pieceId}.png`}
            alt={`Pieza ${pieceId}`}
            className="PiezasJuego"
            onMouseDown={handleMouseDown(index)}
            style={{ position: 'absolute', cursor: 'pointer', userSelect: 'none' }}
          />
        ))}
      </div>
      <button ref={nextButtonRef}>Siguiente</button>
      <button ref={prevButtonRef}>Anterior</button>
      <button ref={restartButtonRef}>Resetear</button>
      <audio id="win" src="/sound/win.mp3" />
    </div>
  );
}

export default PuzzleGame;
