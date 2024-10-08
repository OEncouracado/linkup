import React, { useState } from "react";
import { Row, Col, Container, Form, InputGroup } from "react-bootstrap";
import moca from "../../../Images/moca.png";
import { fb } from "../../../shared/service";

function PrimeiraDiv() {
  const [username, setUsername] = useState("");
  const [usernameValido, setUsernameValido] = useState(false);
  const verificarUsername = async (username) => {
    try {
      const userNamesRef = fb.firestore.collection("linkUserNames");
      const snapshot = await userNamesRef
        .where("linkUserNames", "array-contains", username)
        .get();

      if (snapshot.empty) {
        // O displayName não está em uso
        setUsernameValido(true);
      } else {
        // O displayName já está em uso
        setUsernameValido(false);
      }
    } catch (error) {
      console.error("Erro ao verificar o displayName:", error);
      throw error; // Você pode tratar o erro de acordo com sua lógica de tratamento de erros
    }
  };
  return (
    <Container className="HomePrimeiraDiv text-dark">
      <Row className="HomePrimeiraDivWarp">
        <Col md className="">
          <div className="HomePrimeiraDivBannerDireita">
            <h1 className="mb-4 ">
              Seus Links juntos, de maneira{" "}
              <span className="text-primary">fácil</span> e{" "}
              <span style={{ color: "#FF8800" }}>divertida</span>
            </h1>
            <h4 className="mb-3 ">Prepare-se para sua nova jornada</h4>
            <h5>Assegure seu nick e se torne uma lenda</h5>
            <Form.Group
              className="bg-dark p-3 rounded mb-3"
              style={{ height: "5rem" }}
            >
              <InputGroup>
                <InputGroup.Text>linkii.me/</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    verificarUsername(e.target.value);
                  }}
                  isInvalid={!usernameValido || !username}
                  isValid={usernameValido}
                  required
                />
                {username ? (
                  <Form.Control.Feedback type="invalid">
                    Esse Usuário já está Cadastrado.
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback type="invalid">
                    Digite um usuário.
                  </Form.Control.Feedback>
                )}
                <Form.Control.Feedback type="valid" />
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
        <Col md className="">
          <img src={moca} alt="moça" className="w-100" />
        </Col>
      </Row>
    </Container>
  );
}

export default PrimeiraDiv;
