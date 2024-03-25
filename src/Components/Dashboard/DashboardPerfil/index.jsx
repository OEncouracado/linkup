import React from 'react';
import perfil from "../../../Images/perfil/mavsleo.png"; // Importe a imagem do perfil aqui

function DashboardPerfil({ selectedFrame }) {
    console.log(selectedFrame)

    return (
        <div className='perfilsuperiorwarp d-flex flex-column justify-content-center'>
            <div className='frameepefilwarp d-flex justify-content-center align-items-center'>
                {selectedFrame && (<img src={selectedFrame.src} alt={selectedFrame.nome} className='dashboardMolduraPerfil' />)}
                <img src={perfil} alt="imagem de perfil" srcSet="" className='dashboardImagePerfil' />
            </div>
        </div>
    );
}

export default DashboardPerfil;

