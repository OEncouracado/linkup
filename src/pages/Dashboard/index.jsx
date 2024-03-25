import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import Topbar from './../../Components/TopBar/index';
import DashboardPerfil from '../../Components/Dashboard/DashboardPerfil';
import DashboardMoldura from '../../Components/Dashboard/DashboardMoldura';
import DashboardLinkList from '../../Components/Dashboard/DashboardLinkList';
import Preview from '../../Components/Preview'; // Você mencionou que o componente de preview está em uma estrutura de pastas diferente
import { usePages, useAuth } from '../../hook';
import moldura from "../../Images/molduras/moldura.png";
import moldurabronze from "../../Images/molduras/moldurabronze.png";
import semMoldura from "../../Images/vazio.png";

function Dashboard() {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const pages = usePages(id);
    const level = 5;
    const [frames, setFrames] = useState([]);
    const [selectedFrame, setSelectedFrame] = useState(null);
    console.log(pages);
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
                nome: "Moldura 3"
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
                        <DashboardPerfil level={level} selectedFrame={selectedFrame} />
                        <DashboardMoldura frames={frames} handleSelectFrame={handleSelectFrame} />
                        <div className='d-flex flex-column align-items-center w-25'>
                            <h6>Nível <span className='text-success'>{level}</span></h6>
                            <ProgressBar className='bar xp-bar' striped animated variant='success' now={45} />
                        </div>
                        {pages && <DashboardLinkList pages={pages} />}
                    </div>
                )}
                <div className='previewFundo bg-primary'>
                    <Preview level={level} selectedFrame={selectedFrame} />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
