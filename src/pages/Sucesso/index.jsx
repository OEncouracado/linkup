import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SuccessPage() {
    const history = useHistory();

    const handleBackToHome = () => {
        history.push("/");  // Redireciona para a página inicial
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>Compra Concluída!</Card.Title>
                    <Card.Text>
                        Sua compra foi realizada com sucesso. Obrigado por utilizar nosso serviço!
                    </Card.Text>
                    <Button variant="success" onClick={handleBackToHome}>
                        Voltar para a página inicial
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default SuccessPage;
