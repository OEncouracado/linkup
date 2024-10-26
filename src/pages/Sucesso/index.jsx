import React, { useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hook";// Para obter o ID do usuário
import { gemPackages, updateUserGemas } from "../../shared/service/gemasServices";// Ajuste o caminho conforme necessário

function SuccessPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { authUser } = useAuth();
    const userId = authUser?.uid;

    // Função para atualizar as gemas do usuário
    const handleUpdateUserGemas = async (gemPackageId) => {
        const gemPackage = gemPackages.find(pkg => pkg.id === gemPackageId);
        if (gemPackage && userId) {
            await updateUserGemas(userId, gemPackage.gemCount);
        }
    };

    useEffect(() => {
        // Obtém o ID do pacote da URL (se você estiver passando como um parâmetro)
        const params = new URLSearchParams(location.search);
        const packageId = params.get("package"); // Altere conforme necessário

        if (packageId) {
            handleUpdateUserGemas(packageId);
        }
    }, [location, userId]);

    const handleBackToHome = () => {
        navigate("/dashboard");  // Redireciona para a página anterior
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
