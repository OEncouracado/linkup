import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import gameOverImg from '../../Images/youshallnotpass.jpg'; // Imagem de referência gamer

function NotAuthorized() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000); // Redireciona após 5 segundos

        return () => clearTimeout(timer); // Limpa o timeout se o componente desmontar
    }, [navigate]);

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row>
                <Col className="text-center">
                    <Card bg="dark" text="light" className="p-3">
                        <Card.Img variant="top" src={gameOverImg} style={{ width: '15rem', margin: 'auto' }} />
                        <Card.Body>
                            <Card.Title>Access Denied!</Card.Title>
                            <Card.Text>You Shall Not Pass! 🚫</Card.Text>
                            <Card.Text>Redirecting you to the main page...</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default NotAuthorized;
