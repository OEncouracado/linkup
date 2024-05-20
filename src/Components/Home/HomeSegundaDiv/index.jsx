import React from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap"; // eslint-disable-next-line
import homensegundadiv from "../../../Images/homesegundadivdireita.png";

function HomeSegundaDiv() {
  return (
    <Container className="homesegundadiv bg-warning">
      <Row>
        {/* <Col md>
          <img className="w-100" src={homensegundadiv} alt="" srcset="" />
        </Col> */}
        <Col md className="w-100 mt-5 text-center">
          <h3>Evolua com seu Link</h3>
          <p className="">
            Nosso sistema de Ranks e Níveis para uma experiência única{" "}
          </p>
          <Container style={{ marginBottom: "1rem" }}>
            <Row>
              <Col>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/linkup-4b9cf.appspot.com/o/decoracao_rank%2FBronze.png?alt=media&token=0b86e1ba-d9f1-46b0-bfa1-9f9a782b8a41"
                  alt="Bronze"
                  srcset=""
                  className="w-100"
                />
                <p>Bronze</p>
              </Col>
              <Col>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/linkup-4b9cf.appspot.com/o/decoracao_rank%2FPrata.png?alt=media&token=f4437867-1d6c-46fa-bcc0-e3332fa1ae6a"
                  alt="Prata"
                  srcset=""
                  className="w-100"
                />
                <p>Prata</p>
              </Col>
              <Col>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/linkup-4b9cf.appspot.com/o/decoracao_rank%2FOuro.png?alt=media&token=175423d2-1e94-4ef0-ab6a-301d772da26e"
                  alt="Ouro"
                  srcset=""
                  className="w-100"
                />
                <p>Ouro</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/linkup-4b9cf.appspot.com/o/decoracao_rank%2FPlatina.png?alt=media&token=f515d923-494b-4e42-a2f4-9cbf6ab95045"
                  alt="Platina"
                  srcset=""
                  className="w-100"
                />
                <p>Platina</p>
              </Col>
              <Col>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/linkup-4b9cf.appspot.com/o/decoracao_rank%2FDiamante.png?alt=media&token=4005f26b-d1a8-4fad-917d-2b3d7a5f6e2f"
                  alt="Diamante"
                  srcset=""
                  className="w-100"
                />
                <p>Diamante</p>
              </Col>
              <Col>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/linkup-4b9cf.appspot.com/o/decoracao_rank%2FMestre.png?alt=media&token=a1911692-204d-4a9c-ad4f-8ed582fb1587 "
                  alt="Mestre"
                  srcset=""
                  className="w-100"
                />
                <p>Mestre</p>
              </Col>
            </Row>
          </Container>
          <p>Desbloqueie recompensas exclusivas por níveis e ranks</p>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeSegundaDiv;
