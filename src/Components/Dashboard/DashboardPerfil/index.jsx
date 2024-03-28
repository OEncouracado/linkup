import React from 'react';
import perfilNull from "../../../Images/perfil/perfil.jpg";


function DashboardPerfil({ username, perfil, selectedFrame }) {
    console.log("informações de perfil", perfil, selectedFrame)

    return (
        <div className='perfilsuperiorwarp d-flex flex-column justify-content-center'>
            <div className='frameepefilwarp d-flex justify-content-center align-items-center'>
                {selectedFrame && (<img src={selectedFrame.src} alt={selectedFrame.nome} className='dashboardMolduraPerfil' />)}
                <img src={perfil ? perfil : perfilNull} alt="imagem de perfil" srcSet="" className='dashboardImagePerfil rounded-circle' />
            </div>
            <div className='usernamePefilWarp d-flex justify-content-center align-items-center'>
                <p className='mb-0 fw-bold'>{username}</p>
            </div>
        </div>
    );
}

export default DashboardPerfil;

