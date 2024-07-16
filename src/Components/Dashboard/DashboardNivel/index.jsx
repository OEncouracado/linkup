import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const calculateLevelAndMaxXP = (xp) => {
    const base_xp = 100; // Define o quanto a dificuldade aumenta por nível
    let nivel = 1;
    let maxxp = base_xp;

    // Encontrar o nível atual
    while (xp >= maxxp) {
        nivel++;
        xp -= maxxp;
        maxxp = base_xp * nivel * nivel;
    }

    return { nivel, maxxp };
};

function DashboardNivel({ xp }) {
    const { nivel, maxxp } = calculateLevelAndMaxXP(xp);

    return (
        <div className='d-flex flex-column align-items-center w-100 my-3'>
            <h6 className='nivelLabel'>
                Nível <span className='text-success'>{nivel}</span>
            </h6>
            <ProgressBar title={`${xp}/${maxxp}`} className='bar xp-bar' striped animated variant='success' now={xp} max={maxxp} />
        </div>
    );
}

export default DashboardNivel;
