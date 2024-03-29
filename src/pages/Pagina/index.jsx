import React, { useEffect } from 'react'
import { useAuth, UserInfo, usePages, UserCss } from './../../hook';
import PaginaLinkList from '../../Components/Pagina/PaginaLinkList';
import PaginaPerfil from '../../Components/Pagina/PaginaPerfil';
import PaginaNivel from './../../Components/Pagina/PaginaNivel/index';
import { useLocation, useParams } from 'react-router-dom';


function Pagina() {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const userArray = UserInfo(id);
    const pageArray = usePages(id);
    const styleArray = UserCss(id);
    const pages = pageArray && pageArray[0];
    const stats = userArray && userArray[0];
    const estilo = styleArray && styleArray[0];
    const imgPerfil = stats?.imagemPerfil;
    const userName = stats?.username;
    const moldura = stats?.moldura;
    console.log('Estilos personalizados', styleArray);
    const userNameLink ={};
    const location = useLocation();
    const params = useParams();

    useEffect(()=>{
        console.log("localização", params)
    },[params]);
    return (
        <div className='paginaFundo pt-5'>
            <div className='paginaWarper m-auto d-flex flex-column align-items-center'>
                <PaginaPerfil perfil={imgPerfil} username={userName} selectedFrame={moldura} userStyle={estilo} />
                <PaginaNivel nivel={stats?.nivelUser} xp={stats?.xp} maxxp={stats?.maxXp} userStyle={estilo} />
                <PaginaLinkList pages={pages && (pages)} userStyle={estilo} />
            </div>

        </div>
    )
}

export default Pagina
