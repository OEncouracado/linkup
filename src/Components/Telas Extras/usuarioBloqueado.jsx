import React from "react";
import { useAuth } from "../../hook";
import { fb } from "../../shared/service";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UsuarioBloqueado() {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  const handleUnblockUser = async () => {
    try {
      await fb?.firestore.collection("UserStats").doc(authUser?.uid).update({
        isBlocked: false,
      });
      alert("Conta desbloqueada com sucesso.");
      navigate("/Login");
    } catch (error) {
      console.error("Erro ao desbloquear a conta:", error);
      alert("Ocorreu um erro ao desbloquear a conta.");
    }
  };

  return (
    <Container
      className="bg-dark m-0 d-flex align-items-center justify-content-center"
      style={{ height: "100dvh", maxWidth: "100dvw" }}
    >
      <Row className="text-light py-3">
        <Col className="d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-center mb-4">Sua Conta está bloqueada</h1>
          <p className="text-center mb-4">
            Clique no botão abaixo para desbloquear
          </p>
          <Button onClick={handleUnblockUser}>Desbloquear Conta</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default UsuarioBloqueado;
