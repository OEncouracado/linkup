import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import Topbar from './../../Components/TopBar/index';
import DashboardPerfil from '../../Components/Dashboard/DashboardPerfil';
import DashboardMoldura from '../../Components/Dashboard/DashboardMoldura';
// import DashboardLinkList from '../../Components/Dashboard/DashboardLinkList';
import Preview from '../../Components/Preview'; // Você mencionou que o componente de preview está em uma estrutura de pastas diferente
import { useAuth, UserInfo, usePages } from '../../hook';
import moldura from "../../Images/molduras/moldura.png";
import moldurabronze from "../../Images/molduras/moldurabronze.png";
import semMoldura from "../../Images/vazio.png";

function Dashboard() {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    console.log(id);
    const pagesArray = usePages(id);
    console.log("paginas", pagesArray)
    const pages = pagesArray[0];
    console.log("paginas", pages.Links)
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
        console.log("SelectedFrame = ", selectedFrame)
    };

    return (
        <>
            <Topbar />
            <div className='dashboardFundo d-flex'>
                {authUser && (
                    <div className='dashboardLinks py-5 d-flex flex-column justify-content-center align-items-center'>
                        <DashboardPerfil selectedFrame={selectedFrame} />
                        <DashboardMoldura frames={frames} handleSelectFrame={handleSelectFrame} />
                        <div className='d-flex flex-column align-items-center w-25'>
                            <h6>Nível <span className='text-success'>{5}</span></h6>
                            <ProgressBar className='bar xp-bar' striped animated variant='success' now={50} max={100} />
                        </div>
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
