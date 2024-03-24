import React, { useEffect, useState } from 'react';
import { usePages, useAuth } from './../../hook';
import Topbar from './../../Components/TopBar/index';
import { Container } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import perfil from "../../Images/perfil/mavsleo.png";
import moldura from "../../Images/molduras/moldura.png";
import moldurabronze from "../../Images/molduras/moldurabronze.png";
import phone from "../../Images/smartphone.png";


function Dashboard() {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const pages = usePages(id);
    const level = 5;

    const [frames, setFrames] = useState([]);
    const [selectedFrame, setSelectedFrame] = useState(null);

    useEffect(() => {
        // Simulação de busca de molduras a partir de uma fonte de dados (por exemplo, uma API)
        // Aqui você pode fazer uma solicitação para recuperar os dados das molduras de onde quer que estejam armazenadas
        // Por enquanto, vamos apenas simular alguns dados de molduras
        const fakeFramesData = [
            { id: 1, src: moldura, nome: "Moldura 1" },
            { id: 2, src: moldurabronze, nome: "Elo Bronze" },
            // Adicione mais molduras conforme necessário
        ];
        setFrames(fakeFramesData);
    }, []);

    const handleSelectFrame = (frame) => {
        setSelectedFrame(frame);
    };

    useEffect(() => {
        console.log(pages);
    }, [pages]);

    return (
        <>
            <Topbar />
            <div className='dashboardFundo d-flex'>
                <div className='dashboardLinks py-5 d-flex flex-column justify-content-center align-items-center'>
                    <div className='perfilsuperiorwarp  d-flex flex-column justify-content-center'>
                        <div className='frameepefilwarp d-flex justify-content-center align-items-center'>
                            {selectedFrame && (<img src={selectedFrame.src} alt={selectedFrame.nome} className='dashboardMolduraPerfil' />)}
                            <img src={perfil} alt="imagem de perfil" srcSet="" className='dashboardImagePerfil' />
                        </div>
                        <div className=' d-flex justify-content-center align-items-center mt-5 mb-2'>
                        {frames.map(frame => (
                                <img
                                    key={frame.id}
                                    src={frame.src}
                                    alt={`moldura ${frame.id}`}
                                    className='mx-2 frameOption'
                                    onClick={() => handleSelectFrame(frame)}
                                />
                            ))}
                            </div>
                    </div>
                    <div className='d-flex flex-column align-items-center w-25'>
                        <h6>Nível <span className='text-success'>{level}</span></h6>
                        <div className='barwarper d-flex justify-content-between'>
                            <ProgressBar
                                className='bar xp-bar'
                                striped
                                animated
                                variant='success'
                                now={45}
                            />
                            <i className="fa fa-question-circle" aria-hidden="true" />
                        </div>
                    </div>
                

                <div className='linksList pt-4'>
                    <p className='dashboardtituloLinks'>Links</p>
                    <div className='d-flex flex-column'>
                        {pages?.map(p => (
                            (p.Links.map((l, index) => (
                                <div key={index}>
                                    <a
                                        className='dashboardFundoLink bg-light d-flex justify-content-center align-items-center my-2'
                                        href={"https://" + l}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <Container className='d-flex justify-content-center'>{l}</Container>
                                    </a>
                                </div>
                            )))
                        ))}
                    </div>
                </div>
            </div>
            <Container className='previewFundo'>
                <div className='d-flex justify-content-center pt-4'>
                    <img className='smartPhone' src={phone} alt="" srcset="" />
                </div>
            </Container>
            </div>
        </>
    );
}

export default Dashboard;
