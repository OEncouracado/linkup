import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import moca from "../../../Images/moca.png"

function PrimeiraDiv() {
    return (
        <Container className='HomePrimeiraDiv'>
            <Row>
                <Col className=''>
                    <div className='HomePrimeiraDivBannerDireita bg-success'>
                        <h3>Prepare-se para sua nova jornada</h3>
                    </div>
                </Col>
                <Col className='bg-danger'>
                    <img src={moca} alt="moça" className='w-100' />
                </Col>
            </Row>
        </Container>
    )
}

export default PrimeiraDiv
