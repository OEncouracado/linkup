import React, { useEffect } from 'react'
import { usePages, useAuth  } from './../../hook';
import Topbar from './../../Components/TopBar/index';
import { Container } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';


function Dashboard() {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const pages = usePages(id);

    useEffect(() => {
        console.log(pages);
    }, [pages]);


    return (<>
        <Topbar />
        <div className='dashboardFundo bg-dark d-flex flex-column'>
            <div className='dashboardLinks py-5 d-flex flex-column bg-warning justify-content-center align-items-center'>
                <div className='dashboardImagePerfil mb-3 rounded-circle'></div>
                <div className='d-flex flex-column align-items-center w-25'>
                    <h6>Minha XP</h6>
                    <div className='barwarper d-flex justify-content-between'>
                        <ProgressBar
                            className='bar xp-bar'
                            striped
                            animated
                            variant='success'
                            now={45} />
                        <i class="fa fa-question-circle" aria-hidden="true" />
                    </div>
                </div>
            </div>

            <div className='dashboardLinks  p-5'>
                <p>Links</p>
                <div className='d-flex flex-column'>
                    {pages?.map(p => (
                        (p.Links.map((l, index) => (
                            <div>
                                <a
                                    className='dashboardFundoLink bg-light d-flex justify-content-center align-items-center my-2'
                                    key={index}
                                    href={"https://" + l}
                                    target="_blank"
                                    rel="noopener noreferrer"><Container className='d-flex justify-content-center'>{l}</Container>
                                </a>
                            </div>
                        )))
                    ))}
                </div>
            </div>
        </div>
    </>)
}

export default Dashboard
