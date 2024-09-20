import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CancelPage() {
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate(-1);
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
