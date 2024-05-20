import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import criacao from "../../../Images/capturas/criacaodelink.gif"


function HomeQuartaDiv() {
    return (
        <Container className="homequartadiv bg-success text-light">
            <h3 className='mt-4'>Como Funciona</h3>
            <Row className='hometerceiradivrow'>
                <Col md className='hometerceiradivcol'>
                    <img className='w-100 hometerceiradivimg' src={criacao} alt="" srcset="" />
                </Col>
                <Col md className='hometerceiradivcol'>
                    crie um link com nome e endereço de URL
                </Col>
            </Row>
        </Container>
    )
}

export default HomeQuartaDiv
