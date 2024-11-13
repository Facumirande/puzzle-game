// src/PuzzleBoard.jsx
import React from 'react';

function PuzzleBoard() {
  return (
    <section>
      <div className="layer middle-layer">
        <div className="container-center">
          <img
            className="cuadricula"
            src={`${process.env.PUBLIC_URL}/img/Cuadricula.png`}
            alt="cuadricula"
            id="marcoMadera"
          />
          <div className="img-container" id="mi-div">
            <img
              className="elephant-size"
              id="puzzleImg"
              src={`${process.env.PUBLIC_URL}/img/Elefante.jpg`}
              alt="Imagen de fondo"
            />
          </div>
        </div>
      </div>
      <section id="pieces">
        <img
          id="letraA"
          className="PiezasJuego"
          src={`${process.env.PUBLIC_URL}/img/Elefante/A.png`}
          alt="pieza-a"
        />
        <img
          id="letraB"
          className="PiezasJuego"
          src={`${process.env.PUBLIC_URL}/img/Elefante/B.png`}
          alt="pieza-b"
        />
        <img
          id="letraC"
          className="PiezasJuego"
          src={`${process.env.PUBLIC_URL}/img/Elefante/C.png`}
          alt="pieza-c"
        />
        <img
          id="letraD"
          className="PiezasJuego"
          src={`${process.env.PUBLIC_URL}/img/Elefante/D.png`}
          alt="pieza-d"
        />
      </section>
      <section>
        <img
          className="piecesBoard"
          id="piecesBoard"
          src={`${process.env.PUBLIC_URL}/img/PiecesBoard.png`}
          alt="Tablero"
        />
      </section>
      <section>
        <img className="crayon" id="crayon" src={`${process.env.PUBLIC_URL}/img/crayon.png`} alt="crayon" />
      </section>
      <section className="sound-switch me-3">
        <div className="form-check form-switch">
          <label className="form-check-label text-light" htmlFor="flexSwitchCheckChecked">
            Activar/Desactivar sonido de victoria
          </label>
          <input
            className="form-check-input d-flex"
            type="checkbox"
            role="switch"
            id="Activar"
            defaultChecked
          />
        </div>
        <h2 id="level-info">Nivel 1</h2>
      </section>
      <section>
        <button id="prevButton" className="btn btn-primary btn-position">Anterior</button>
        <button id="nextButton" className="btn btn-primary btn-position">Siguiente</button>
        <button id="restartButton" className="btn btn-primary btn-position">Resetear</button>
      </section>
    </section>
  );
}

export default PuzzleBoard;
