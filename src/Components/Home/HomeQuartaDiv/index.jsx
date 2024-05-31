import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import criacao from "../../../Images/capturas/criacaodelink.gif"
import cadastro from "../../../Images/capturas/cadastrar.gif"


function HomeQuartaDiv() {
    return (
        <Container id='comofunciona' className="homequartadiv bg-success text-light">
            <h3 className='my-4'>Como Funciona</h3>
            <a href="Singup"><Row className='hometerceiradivrow'>
                <Col md className='hometerceiradivcol'>
                    <p><span className='text-warning'>Clique aqui</span> para se cadastrar</p>
                    <p>O Cadastro é simples e o melhor<span> De Graça</span>!</p>
                    <p>Basta um email e uma senha ou entrar com seu usuário do Google</p>
                </Col>
                <Col md className='hometerceiradivcol'>
                    <img className='w-100 hometerceiradivimg' src={cadastro} alt="" srcset="" />
                </Col>
            </Row></a>
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
