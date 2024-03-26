// src/Components/Dashboard/DashboardLink/index.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

function DashboardLink({ link }) {
    return (<>
    <Container className='dashboardFundoLink bg-light d-flex justify-content-between align-items-center my-2'>
        <div className='w-25'>
            <i className="arrastarLink fa fa-ellipsis-v" aria-hidden="true"></i>
        </div>
        <a  
            className='w-50'
            href={"https://" + link}
            target="_blank"
            rel="noopener noreferrer">
            <Container>{link}</Container>
        </a>
        <Container className='configLinksIcons w-25 d-flex justify-content-end me-3'>
                <i class="fa fa-pencil-square mx-1" aria-hidden="true"></i>
                <i class="fa fa-minus-square" aria-hidden="true"></i>
            </Container>
    </Container>
    </>
    );
}

export default DashboardLink;
