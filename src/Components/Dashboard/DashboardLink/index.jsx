import React from 'react';
import { Container } from 'react-bootstrap';

function Link({ link }) {
    console.log(link);
    const url = `https://${link?.src}`;

    return (
        <div key={link.id}> {/* Adicione uma key única para cada link */}
            <a
                className='dashboardFundoLink bg-light d-flex justify-content-center align-items-center my-2'
                href={url}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Container className='d-flex justify-content-center'>{link.link}</Container>
            </a>
        </div>
    );
}

export default Link;
