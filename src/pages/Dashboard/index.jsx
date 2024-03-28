import React, { useState, useEffect, useMemo } from 'react';
// eslint-disable-next-line
import { useAuth, UserInfo, usePages, useStorage } from '../../hook';
import Topbar from './../../Components/TopBar/index';
import DashboardPerfil from '../../Components/Dashboard/DashboardPerfil';
import DashboardMoldura from '../../Components/Dashboard/DashboardMoldura';
import DashboardLinkList from '../../Components/Dashboard/DashboardLinkList';
import DashboardNivel from '../../Components/Dashboard/DashboardNivel';
import Preview from '../../Components/preview';
import moldura from "../../Images/molduras/moldura.png";
import moldurabronze from "../../Images/molduras/moldurabronze.png";
import semMoldura from "../../Images/vazio.png";
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Dashboard() {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const userArray = UserInfo(id);
    const pageArray = usePages(id);
    const pages = pageArray && pageArray[0];
    const stats = userArray && userArray[0];
    const imgPerfil = stats?.imagemPerfil;
    const userName = stats?.username;
    const molduraAtual = stats?.moldura;
    const userMoldura = useMemo(() => ({
        id: 5000,
        src: molduraAtual,
        nome: "Moldura Atual",
    }), [molduraAtual]);
    const [frames, setFrames] = useState([]);
    const [selectedFrame, setSelectedFrame] = useState(userMoldura);
    console.log("moldurabd", molduraAtual);
    console.log("moldura", selectedFrame);
    console.log("moldura usuario", userMoldura.src);
    // console.log(userArray);
    // console.log("Status", stats.imagemPerfil);
    // const imgPerfil = null;
    // console.log("imagem", imgPerfil);
    // const perfil = useStorage(imgPerfil);
    // console.log("imagem", perfil);


    useEffect(() => {
        setSelectedFrame(userMoldura);
    }, [userMoldura]);
    useEffect(() => {
        // Simulação de busca de molduras e páginas
        const fakeFramesData = [
            {
                id: 0,
                src: semMoldura,
                nome: "Remover Molduras"
            },
            {
                id: 1,
                src: moldurabronze,
                nome: "Moldura Bronze"
            },
            {
                id: 2,
                src: moldura,
                nome: "Moldura 1"
            },
        ];
        setFrames(fakeFramesData);
    }, []);

    const handleSelectFrame = (frame) => {
        if (frame.id === 0) {
            setSelectedFrame(null); // Define o estado selectedFrame como null
        } else {
            setSelectedFrame(frame); // Define o estado selectedFrame como a moldura selecionada
        }
    };

    return (
        <>
            <Topbar />
            <div className='dashboardFundo d-flex'>
                {authUser && (
                    <div className='dashboardLinks py-5 d-flex flex-column justify-content-center align-items-center'>
                        <Alert variant='info' className='mb-5'>Sua página já está disponível aqui: <Link to={'/pagina'}>{userName}</Link>.</Alert>
                        <DashboardPerfil perfil={imgPerfil} selectedFrame={selectedFrame} username={userName} />
                        <DashboardNivel nivel={stats?.nivelUser} xp={stats?.xp} maxxp={stats?.maxXp} />
                        <DashboardMoldura frames={frames} handleSelectFrame={handleSelectFrame} />
                        <DashboardLinkList pages={pages && (pages)} />
                    </div>
                )}
                <div className="previewFundo pt-3">
                    <Preview />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
