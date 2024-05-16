import React from 'react'
import "./style.css"
import footer from "../../../Images/footer/footerbg2.png";
import { Container } from 'react-bootstrap';
import FooterContent from './footercontent';

function Footer() {
    return (
        <Container className="footerbg p-0">
            <div className="footerTop">
                <FooterContent />
            </div>
            <img src={footer} alt="" srcset="" className='footermid w-100' />
            <div className="footetbot"></div>
        </Container>
    )
}

export default Footer
