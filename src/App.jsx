import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const Game = () => {

    useEffect(() => {
        Swal.fire('Welcome to the Game!');
    }, []);

    return (
        <>
        </>
    );
};

export default Game;
