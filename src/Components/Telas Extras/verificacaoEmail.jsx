import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from "../../Images/sublinkslogo.png"; // ajuste o caminho conforme necessário

function VerificacaoEmail() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/dashboard');
        }, 10000); // Redireciona para o dashboard após 10 segundos

        return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    }, [navigate]);

    return (
        <Container className='fundo3 bg-dark d-flex align-items-center justify-content-center'>
            <Container className="fundo2 text-center text-black w-75">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <img src={logo} alt="Logo LinkUp" className="mb-4" />
                        <h1>Verificação de E-mail Enviada!</h1>
                        <p className="lead">Você agora é um SubLinker! 🎮</p>
                        <p>Seu e-mail de verificação foi enviado com sucesso. Agora é só checar sua caixa de entrada (e não se esqueça de dar uma olhadinha na pasta de spam também, vai que, né?) e clicar no link de verificação para ativar sua conta.</p>
                        <p>Até logo, e que os jogos comecem! 🕹️</p>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default VerificacaoEmail
