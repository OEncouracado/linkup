import React from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import homensegundadiv from "../../../Images/homesegundadivdireita.png";

function HomeSegundaDiv() {
  return (
    <Container className="homesegundadiv">
      <Row>
        <Col xs={6}>
          <img className="w-100" src={homensegundadiv} alt="" srcset="" />
        </Col>
        <Col xs={6}>
          <h3>Evolua com seu Link</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeSegundaDiv;
