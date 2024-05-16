import React from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import homensegundadiv from "../../../Images/homesegundadivdireita.png";

function HomeSegundaDiv() {
  return (
    <Container className="homesegundadiv bg-warning">
      <Row>
        <Col md>
          <img className="w-100" src={homensegundadiv} alt="" srcset="" />
        </Col>
        <Col md className="w-100 mt-5">
          <h3>Evolua com seu Link</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeSegundaDiv;
