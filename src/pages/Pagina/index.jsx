import React from 'react'
import DashboardPerfil from '../../Components/Dashboard/DashboardPerfil'
import { useAuth, UserInfo, usePages } from './../../hook';
import DashboardNivel from '../../Components/Dashboard/DashboardNivel';
import PaginaLinkList from '../../Components/Pagina/PaginaLinkList';


function Pagina() {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const userArray = UserInfo(id);
    const pageArray = usePages(id);
    const pages = pageArray && pageArray[0];
    const stats = userArray && userArray[0];
    const imgPerfil = stats?.imagemPerfil;
    const userName = stats?.username;

    return (
        <div className='paginaFundo'>
            <div className='paginaWarper w-50 mt-5 m-auto d-flex flex-column align-items-center'>
                <DashboardPerfil perfil={imgPerfil} username={userName} />
                <DashboardNivel nivel={stats?.nivelUser} xp={stats?.xp} maxxp={stats?.maxXp}/>
                <PaginaLinkList pages={pages && (pages)}/>
            </div>

        </div>
    )
}

export default Pagina
