import React, { useState } from 'react';

// Definimos la interfaz para las propiedades del componente
interface Props {
  letraB: string;
  setLetraB: React.Dispatch<React.SetStateAction<string>>;
}

const MiComponente: React.FC<Props> = ({ letraB, setLetraB }) => {
  // Definimos el estado con tipo explícito
  const [letraA, setLetraA] = useState<string>('');

  // Manejador de eventos con tipo explícito
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLetraA('Nuevo valor');
  };

  // Desestructuración de las propiedades
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLetraB(e.target.value);
  };

  return (
    <div>
      <input type="text" value={letraB} onChange={handleChange} />
      <button onClick={handleClick}>Actualizar Letra A</button>
      <p>Letra A: {letraA}</p>
      <p>Letra B: {letraB}</p>
    </div>
  );
};

export default MiComponente;
