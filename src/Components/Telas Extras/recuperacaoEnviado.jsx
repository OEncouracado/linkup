import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function RecuperacaoEnviado() {
    return (
        <Container className='bg-dark m-0 d-flex align-items-center justify-content-center' style={{ height: "100dvh", maxWidth: "100dvw" }}>
            <Row className='text-light d-flex justify-content-center py-3'>
                <Col>
                    <h1 className='text-center mb-4'>Email de Recuperação de Senha Enviado.</h1>
                    <h6 className='text-center mb-4'>Favor verifique a sua Caixa de E-mails.</h6>
                    <a href="/Login">
                        <i
                            className="iconShowEditUsername fas fa-arrow-circle-left"
                            aria-hidden="true"
                            title="Voltar">
                            Voltar
                        </i>
                    </a>
                </Col>
            </Row>
        </Container>
    )
}

export default RecuperacaoEnviado
