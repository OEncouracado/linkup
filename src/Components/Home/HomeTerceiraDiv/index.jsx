import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import simples from "../../../Images/capturas/mavs-simples.jpg";
import medio from "../../../Images/capturas/medio.jpg";
import final from "../../../Images/capturas/Final.jpg";

function HomeTerceiraDiv() {
    return (
        <Container className="hometerceiradiv bg-light">
            <h3>Personalize do seu Jeito</h3>
            <Row>
                <Col md="4" className='ps-0'>
                    <img className='w-100' src={simples} alt="" srcset="" />
                </Col>
                <Col md="4">
                    <img className='w-100' src={medio} alt="" srcset="" />
                </Col>
                <Col md="4" className='pe-0'>
                    <img className='w-100' src={final} alt="" srcset="" />

                </Col>
            </Row>
        </Container>
    )
}

export default HomeTerceiraDiv
