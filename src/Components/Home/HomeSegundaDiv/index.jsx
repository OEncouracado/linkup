import React from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

function HomeSegundaDiv() {
  return (
    <Container className="homesegundadiv">
      <Row>
        <Col xs={6}>imagem</Col>
        <Col xs={6}>Teste</Col>
      </Row>
    </Container>
  );
}

export default HomeSegundaDiv;
