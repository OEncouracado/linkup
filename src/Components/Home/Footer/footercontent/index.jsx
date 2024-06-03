import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../../../Images/linkuplogo.png";

function FooterContent() {
  return (
    <>
      <Container className="footerContent text-white pt-3">
        <Row>
          <Col md className="colEsquerda">
            <div className="colEsquerdaWarper">
              <a className="w-100 d-flex" href="/">
                <img
                  src={logo}
                  alt=""
                  srcset=""
                  className="w-75 colEsquerdaImg"
                />
              </a>
              <p className="textLeft">
                Seus Links juntos, de maneira{" "}
                <span className="text-success">fácil</span> e{" "}
                <span className="text-danger"> divertida</span>!
              </p>
            </div>
          </Col>
          <Col md className="colCentro">
            <div className="colCentroWarper mt-5">
              <h3 className="colCentroTitle">Siga-nos</h3>
              <Container className="mt-5">
                <p className="mb-4">
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    Blog (em breve)
                  </a>
                </p>
                <p className="mb-4">
                  <a
                    href="https://www.instagram.com/mavsleowebdesign/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </p>
                <p className="mb-4">
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    Twitter / X
                  </a>
                </p>
                <p className="mb-4">
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </p>
              </Container>
            </div>
          </Col>
          <Col md className="colDireita">
            <div className="colCentroWarper mt-5">
              <h3 className="colCentroTitle">Institucional</h3>
              <Container className="mt-5">
                <p
                  className="mb-4"
                  title="pressione [ENTER] para pular o tutorial"
                >
                  <a href="#comofunciona">Como Funciona</a>
                </p>
                <p className="mb-4" title="Cash e Pay-to-win">
                  <a href="#divPlanos">Planos e VIP</a>
                </p>
                <p className="mb-4" title="Perguntas Frequentes">
                  <a href="/">Perguntas Frequentes</a>
                </p>
                <p className="mb-4" title="/ALL">
                  <a href="/">Contato</a>
                </p>
                <p className="mb-4" title="Objection!">
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    Contratos e Termos
                  </a>
                </p>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FooterContent;
