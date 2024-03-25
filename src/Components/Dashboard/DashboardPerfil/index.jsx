// Perfil.jsx

import React from 'react';
import moldura from "../../../Images/molduras/moldura.png";
import moldurabronze from "../../../Images/molduras/moldurabronze.png";
import semMoldura from "../../../Images/vazio.png";
import perfil from "../../../Images/perfil/mavsleo.png";
import { ProgressBar } from 'react-bootstrap';

function Perfil({ level, selectedFrame }) {
    const molduraImagem = selectedFrame ? selectedFrame.src : semMoldura;

    return (
        <div className='perfilsuperiorwarp d-flex flex-column justify-content-center'>
            <div className='frameepefilwarp d-flex justify-content-center align-items-center'>
                {selectedFrame && <img src={molduraImagem} alt={selectedFrame.nome} className='dashboardMolduraPerfil' />}
                <img src={perfil} alt="imagem de perfil" srcSet="" className='dashboardImagePerfil' />
            </div>
            <div className='d-flex justify-content-center align-items-center mt-5 mb-2'>
                <h6>Nível <span className='text-success'>{level}</span></h6>
                <div className='barwarper d-flex justify-content-between'>
                    <ProgressBar className='bar xp-bar' striped animated variant='success' now={45} />
                    <i className="fa fa-question-circle" aria-hidden="true" />
                </div>
            </div>
        </div>
    );
}

export default Perfil;
