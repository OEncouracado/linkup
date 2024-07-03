import React, { useState } from 'react';
import { Button, Form, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./despedida.css"

function Despedida() {
    const [feedback, setFeedback] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleFeedbackSubmit = () => {
        // Aqui você pode enviar o feedback para o servidor ou salvá-lo no Firestore
        setShowAlert(true);
        setTimeout(() => navigate('/'), 3000); // Redireciona para a home após 3 segundos
    };

    return (<Container className='fundo bg-dark d-flex align-items-center justify-content-center'>
        <Container className="fundo2 text-center text-black w-75">
            {showAlert && <Alert variant="success" className="mt-3">Valeu pelo feedback! Redirecionando...</Alert>}
            <h1>Até Logo, Guerreiro(a)!🫡</h1>
            <p>
                Sentiremos sua falta! Antes de partir, que tal nos dar um feedback rápido?
                Sua opinião é importante para tornar o sublinks.me ainda melhor.
            </p>
            <Form>
                <Form.Group controlId="feedback" className='d-flex flex-column align-items-center mb-3'>
                    <Form.Label>Deixe seu feedback aqui:</Form.Label>
                    <Form.Control
                        className=''
                        as="textarea"
                        rows={5}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Escreva algo bacana..."
                    />
                </Form.Group>
                <Button variant="outline-dark" onClick={handleFeedbackSubmit}>
                    Enviar Feedback
                </Button>
            </Form>
        </Container>
    </Container>);
}

export default Despedida;
