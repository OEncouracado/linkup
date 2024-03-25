import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import phone from "../../Images/smartphone.png";
import Topbar from './../../Components/TopBar/index';
import Perfil from '../../Components/Dashboard/DashboardPerfil';
import Moldura from '../../Components/Dashboard/DashboardMoldura';
import LinkList from '../../Components/Dashboard/DashboardLinkList';
import Preview from '../../Components/Dashboard/DashboardLink';
import { usePages, useAuth } from '../../hook';

function Dashboard() {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const pages = usePages(id);
    const level = 5;

    console.log(pages, authUser);
    const [frames, setFrames] = useState([]);
    const [selectedFrame, setSelectedFrame] = useState(null);

    useEffect(() => {
        // Simulação de busca de molduras e páginas
        const fakeFramesData = [{
            id: 1,
            src: "https://i.imgur.com/aQ6yS7F.png",
            nome: "Moldura 1"
        }, {
            id: 2,
            src: "https://i.imgur.com/2s4yS7F.png",
            nome: "Moldura 2"
        }, {
            id: 3,
            src: "https://i.imgur.com/3s4yS7F.png",
            nome: "Moldura 3"
        }];
        setFrames(fakeFramesData);
    }, []);

    const handleSelectFrame = (frames) => {
        setSelectedFrame(frames);
    };

    return (
        <>
            <Topbar />
            <div className='dashboardFundo d-flex'>
                <div className='dashboardLinks py-5 d-flex flex-column justify-content-center align-items-center'>
                    <Perfil level={level} selectedFrame={selectedFrame} />
                    <div className='d-flex flex-column align-items-center w-25'>
                        <h6>Nível <span className='text-success'>{level}</span></h6>
                        <ProgressBar className='bar xp-bar' striped animated variant='success' now={45} />
                    </div>
                    <LinkList pages={pages} />

                </div>
                <div className='previewFundo bg-primary'>
                    <Preview level={level} selectedFrame={selectedFrame} />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
