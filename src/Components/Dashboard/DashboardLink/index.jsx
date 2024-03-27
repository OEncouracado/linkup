// src/Components/Dashboard/DashboardLink/index.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

function DashboardLink({ url, nome }) {
    return (<>
    <Container className='dashboardFundoLink bg-light d-flex justify-content-between align-items-center my-2'>
        <div className='arrastarWarp'>
            <i className="arrastarLink fa fa-ellipsis-v" aria-hidden="true"></i>
        </div>
        <div className='linkENome d-flex flex-column align-items-start'>
            <Container>
                <p>{nome}</p>
            </Container>
            <Container className='linkUrl'>
                <p> {url} </p>
            </Container>
        </div>
        <Container className='configLinksIcons w-25 d-flex justify-content-end me-3'>
                <i class="fa fa-pencil-square mx-1" aria-hidden="true"></i>
                <i class="fa fa-minus-square" aria-hidden="true"></i>
            </Container>
    </Container>
    </>
    );
}

export default DashboardLink;
