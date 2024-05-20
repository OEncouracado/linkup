import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import simples from "../../../Images/capturas/mavs-simples.jpg";
import medio from "../../../Images/capturas/medio.jpg";
import final from "../../../Images/capturas/Final.jpg";

function HomeTerceiraDiv() {
    return (
        <Container className="hometerceiradiv bg-light">
            <h3 className='mt-4'>Personalize do seu Jeito</h3>
            <Row className='hometerceiradivrow'>
                <Col md className='hometerceiradivcol'>
                    <img className='w-100 hometerceiradivimg' src={simples} alt="" srcset="" />
                </Col>
                <Col md className='hometerceiradivcol'>
                    <img className='w-100 hometerceiradivimg' src={medio} alt="" srcset="" />
                </Col>
                <Col md className='hometerceiradivcol'>
                    <img className='w-100 hometerceiradivimg' src={final} alt="" srcset="" />

                </Col>
            </Row>
            <p>Personalize e crie páginas únicas e incríveis!</p>
        </Container>
    )
}

export default HomeTerceiraDiv
