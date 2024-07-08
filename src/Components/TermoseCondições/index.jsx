import React, { useState } from "react";
import TermosCondicoes from "./TermosCondicoes";
import HomeTopbar from "./../Home/HomeTopbar/index";
import Footer from "../Home/Footer";
import { Container, Row, Col } from "react-bootstrap";
import ace from "../../Images/ace-attornet.png";
import PoliticaCookies from "./PoliticaCookies";
import PoliticaPrivacidade from "./PoliticaPrivacidade";
import "./style.css";

function Termos() {
  const [contrato, setContrato] = useState("termoscondicoes");

  const renderContratoAtual = () => {
    if (contrato === "termoscondicoes") {
      return <TermosCondicoes />;
    } else if (contrato === "politicacookies") {
      return <PoliticaCookies />;
    } else if (contrato === "politicaprivacidade") {
      return <PoliticaPrivacidade />;
    }
  };

  return (
    <>
      <HomeTopbar />
      <Container
        className="bg-dark text-light"
        style={{ maxWidth: "100dvw", paddingTop: "8rem" }}
      >
        <Row>
          <Col
            style={{
              padding: "2%",
            }}
            md={4}
          >
            <img src={ace} alt="" srcSet="" />
          </Col>
          <Col style={{ color: "grey" }} md={2}>
            <p
              className="linkContato"
              style={{ cursor: "pointer" }}
              onClick={() => setContrato("termoscondicoes")}
            >
              Termos e Condições
            </p>
            <p
              className="linkContato"
              style={{ cursor: "pointer" }}
              onClick={() => setContrato("politicacookies")}
            >
              Política de Cookies
            </p>
            <p
              className="linkContato"
              style={{ cursor: "pointer" }}
              onClick={() => setContrato("politicaprivacidade")}
            >
              Política de Privacidade
            </p>
          </Col>
          <Col style={{ height: "100dvh", overflowY: "scroll" }}>
            <Container>{renderContratoAtual()}</Container>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Termos;
