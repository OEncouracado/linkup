import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import Topbar from './../../Components/TopBar/index';
import DashboardPerfil from '../../Components/Dashboard/DashboardPerfil';
import DashboardMoldura from '../../Components/Dashboard/DashboardMoldura';
import DashboardLinkList from '../../Components/Dashboard/DashboardLinkList';
import Preview from '../../Components/preview';
// eslint-disable-next-line
import { useAuth, UserInfo, usePages, useStorage } from '../../hook';
import moldura from "../../Images/molduras/moldura.png";
import moldurabronze from "../../Images/molduras/moldurabronze.png";
import semMoldura from "../../Images/vazio.png";

function Dashboard() {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const userArray = UserInfo(id);
    const pageArray = usePages(id);
    console.log(pageArray);
    console.log(userArray);
    const pages = pageArray && pageArray[0];
    const stats = userArray && userArray[0];
    // console.log("Status", stats.imagemPerfil);
    const imgPerfil = stats.imagemPerfil;
    // console.log("imagem", imgPerfil);
    // const perfil = useStorage(imgPerfil);
    // console.log("imagem", perfil);
    const [frames, setFrames] = useState([]);
    const [selectedFrame, setSelectedFrame] = useState(null);


    useEffect(() => {
        // Simulação de busca de molduras e páginas
        const fakeFramesData = [
            {
                id: 1,
                src: moldura,
                nome: "Moldura 1"
            },
            {
                id: 2,
                src: moldurabronze,
                nome: "Moldura Bronze"
            },
            {
                id: 3,
                src: semMoldura,
                nome: "Remover Molduras"
            }
        ];
        setFrames(fakeFramesData);
    }, []);

    const handleSelectFrame = (frame) => {
        if (frame.id === 3) {
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
                        <DashboardPerfil perfil={imgPerfil} selectedFrame={selectedFrame} />
                        <DashboardMoldura frames={frames} handleSelectFrame={handleSelectFrame} />
                        <div className='d-flex flex-column align-items-center w-25'>
                            <h6>Nível <span className='text-success'>{stats.nivelUser}</span></h6>
                            <ProgressBar className='bar xp-bar' striped animated variant='success' now={stats.xp} max={stats.maxXp} />
                        </div>
                        <DashboardLinkList pages={pages && (pages)} />
                    </div>
                )}
                <div className='previewFundo bg-primary'>
                    <Preview />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
