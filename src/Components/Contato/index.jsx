import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ContactComponent = () => {
    return (
        <Container className='px-5 bg-success homeqeadiv text-light'>
            <Row className="px-5 pb-5" style={{ paddingTop: "9rem" }}>
                <Col md={7}>
                    <h2>Envie-nos um E-mail</h2>
                    <Form action="https://formsubmit.co/contato@mavsleo.com.br" method="POST">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className='mb-0'>Nome</Form.Label>
                            <Form.Control type="text" name="Nome" placeholder="Digite seu nome" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='mb-0'>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Digite seu email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSubject">
                            <Form.Label className='mb-0'>Assunto</Form.Label>
                            <Form.Control type="text" name="Assunto" placeholder="Assunto do email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicMessage">
                            <Form.Label className='mb-0'>Mensagem</Form.Label>
                            <Form.Control as="textarea" name="Mensagem" rows={5} placeholder="Digite sua mensagem" />
                        </Form.Group>
                        <Button variant="outline-light" type="submit" title='Enviar Mensagem'>
                            Enviar
                        </Button>
                    </Form>
                </Col>
                <Col md={1}>
                </Col>
                <Col md={4}>
                    <h2>Informações de Contato</h2>
                    <p><strong>Endereço:</strong> Rua Marechal Deodoro, SN, LT05 Qd06, São João de Meriti, RJ, CEP 25580-300</p>
                    <p><strong>Telefone:</strong> (21) 97408-7703</p>
                    <p><strong>Email:</strong> contato@mavsleo.com.br</p>
                    <p><strong>Horário de Funcionamento:</strong> Seg - Sex, 9:00 - 18:00</p>
                </Col>
            </Row>
        </Container>
    );
}

export default ContactComponent;
