import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./style.css";

function HomeDivPreco() {
  return (
    <Container className="precos ">
      <h1 className="text-center mb-4">Planos de Preços</h1>
      <Row className="justify-content-center w-75">
        <Col md={4}>
          <Card className="Card mb-4">
            <Card.Body className="cardbody text-center">
              <Card.Title>Grátis</Card.Title>
              <Card.Text>R$0 / mês</Card.Text>
              <ul className="list-unstyled">
                <li>Acesso básico</li>
                <li>Funcionalidades limitadas</li>
                <li>Suporte via email</li>
              </ul>
              <Button variant="outline-primary">Selecionar</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="Card mb-4">
            <Card.Body className="cardbody text-center">
              <Card.Title>Pago</Card.Title>
              <Card.Text>R$14,90 / mês</Card.Text>
              <ul className="list-unstyled">
                <li>Acesso completo</li>
                <li>Todas as funcionalidades</li>
                <li>Suporte prioritário</li>
              </ul>
              <Button variant="primary">Selecionar</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="Card mb-4">
            <Card.Body className="cardbody text-center">
              <Card.Title>Anual - Economize</Card.Title>
              <Card.Text>R$9,90 / mês</Card.Text>
              <ul className="list-unstyled">
                <li>Acesso completo</li>
                <li>Todas as funcionalidades</li>
                <li>Suporte prioritário</li>
              </ul>
              <Button variant="primary">Selecionar</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeDivPreco;
