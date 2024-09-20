import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function CancelPage() {
    const history = useHistory();

    const handleRetry = () => {
        history.push("/shop");  // Redireciona para a página da loja ou onde quer que o usuário tente novamente
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>Compra Cancelada</Card.Title>
                    <Card.Text>
                        Sua compra foi cancelada. Você pode tentar novamente ou voltar mais tarde.
                    </Card.Text>
                    <Button variant="warning" onClick={handleRetry}>
                        Tentar novamente
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default CancelPage;
