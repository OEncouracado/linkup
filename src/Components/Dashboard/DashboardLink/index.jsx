// src/Components/Dashboard/DashboardLink/index.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

function DashboardLink({ link }) {
    return (<>
        <a
            className='dashboardFundoLink bg-light d-flex justify-content-around align-items-center my-2'
            href={"https://" + link}
            target="_blank"
            rel="noopener noreferrer">
            <Container className='d-flex justify-content-center bg-danger'>{link}</Container>
            <div className='configLinksIcons bg-dark d-flex justify-content-center'>
                <i class="fa fa-plus-square ms-3" aria-hidden="true"></i>
                <i class="fa fa-pencil-square mx-1" aria-hidden="true"></i>
                <i class="fa fa-minus-square" aria-hidden="true"></i>
            </div>
        </a>
    </>
    );
}

export default DashboardLink;
