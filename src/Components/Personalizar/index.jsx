import React, { useState, useEffect, useMemo } from "react";
import "react-device-emulator/lib/styles/style.css";
import { Card, Alert, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserCss, UserInfo, useAuth } from "../../hook";
import TrocaCorFundo from "./TrocaCorFundo/index";
import TrocaCorLink from "./TrocarCorLink";
import TrocaCorTextoBotao from "./TrocarCorTextoLink";
// import TrocaCorTextoNivel from "./TrocarCorTextoNivel";
import TrocaCorSombraLink from "./TrocarCorSombraLink";
import TrocaCorTextoUserName from "./TrocarCorTextoUsername";
import TrocaFundoUserName from "./TrocaFundoUserName";
import TrocaCorSombraUserName from "./TrocarCorSombraUserName";
import TrocarRaiodaBorda from "./TrocarRaiodaBorda/index";
import TrocaruserBackGround from "./TrocarUserBackGround";
import TrocarfundoImgBotao from "./TrocarfundoImgBotao";
import TrocarborderWith from "./TrocarborderWith";
import TrocaborderColor from "./TrocarborderColor";
import TrocarborderStyle from "./TrocarborderStyle";
import TrocarbgTipo from "./TrocarbgTipo";
import TrocaCorFundo2 from "./TrocaCorFundo2";
import PerfilEdit from "./TrocarImagemNome";
import Trocarfonte from "./TrocarFonte";
import TrocarMoldura from "./TrocarMoldura";
import { useLightMode } from "../Dashboard/LightModeContext";

function Personalizar() {
  const { authUser } = useAuth();
  const id = authUser?.uid;
  const userArray = UserInfo(id);
  const stats = userArray && userArray[0];
  const cssArray = UserCss(id);
  const css = cssArray && cssArray[0];
  const userName = stats?.linkUserName;
  const molduraAtual = stats?.moldura;
  const userMoldura = useMemo(
    () => ({
      id: 5000,
      src: molduraAtual,
      nome: "Moldura Atual",
    }),
    [molduraAtual]
  );

  // eslint-disable-next-line
  const [frames, setFrames] = useState([]); // eslint-disable-next-line
  const [selectedFrame, setSelectedFrame] = useState(userMoldura);

  useEffect(() => {
    setSelectedFrame(userMoldura);
  }, [userMoldura]);

  // eslint-disable-next-line
  const { isLightMode } = useLightMode();

  return (
    <>
      {authUser && (
        <div className="dashboardLinks d-flex flex-column align-items-center">
          <Alert variant="info" className="mb-2">
            Sua página já está disponível aqui:{" "}
            <Link to={`/${userName}`} target="_blank" rel="noreferrer">
              {userName}
            </Link>
            .
          </Alert>
          <Container>
            <Card bg={isLightMode ? "light" : "dark"} text={isLightMode ? "dark" : "light"} className="mb-3">
              <Card.Header style={isLightMode ? {} : { backgroundColor: "#272B2F" }}>Imagem de Perfil e Alterar Nome</Card.Header>
              <Card.Body className="AccBody">
                <Row className="w-100 h-100 m-0 p-0 align-items-start">
                  <Col md={5} className="text-dark mb-3 d-flex justify-content-center align-items-start">
                    <PerfilEdit />
                  </Col>
                  <Col md={7} className="p-0 pb-1 h-100">
                    <TrocarMoldura />
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card bg={isLightMode ? "light" : "dark"} text={isLightMode ? "dark" : "light"} className="mb-3">
              <Card.Header style={isLightMode ? {} : { backgroundColor: "#272B2F" }}>Fundo</Card.Header>
              <Card.Body>
                <TrocarbgTipo userId={id} />
                {css?.bgTipo === "corsolida" && <TrocaCorFundo userId={id} />}
                {css?.bgTipo === "gradiente" && (
                  <>
                    <TrocaCorFundo userId={id} />
                    <TrocaCorFundo2 userId={id} />
                  </>
                )}
                {css?.bgTipo === "imagem" && <TrocaruserBackGround userId={id} />}
              </Card.Body>
            </Card>

            <Card bg={isLightMode ? "light" : "dark"} text={isLightMode ? "dark" : "light"} className="mb-3">
              <Card.Header style={isLightMode ? {} : { backgroundColor: "#272B2F" }}>Fonte</Card.Header>
              <Card.Body>
                <Trocarfonte userId={id} />
              </Card.Body>
            </Card>

            <Card bg={isLightMode ? "light" : "dark"} text={isLightMode ? "dark" : "light"} className="mb-3">
              <Card.Header style={isLightMode ? {} : { backgroundColor: "#272B2F" }}>Botões de Link</Card.Header>
              <Card.Body>
                <TrocarRaiodaBorda userId={id} />
                <TrocaCorLink userId={id} />
                <TrocaCorSombraLink userId={id} />
                <TrocaCorTextoBotao userId={id} />
                {stats?.VIP && <TrocarfundoImgBotao userId={id} />}
                <TrocarborderStyle userId={id} />
                <TrocaborderColor userId={id} />
                <TrocarborderWith userId={id} />
              </Card.Body>
            </Card>

            <Card bg={isLightMode ? "light" : "dark"} text={isLightMode ? "dark" : "light"} className="mb-3">
              <Card.Header style={isLightMode ? {} : { backgroundColor: "#272B2F" }}>Nome do Usuário e Nível</Card.Header>
              <Card.Body>
                <TrocaFundoUserName userId={id} />
                <TrocaCorSombraUserName userId={id} />
                <TrocaCorTextoUserName userId={id} />
                {/* <TrocaCorTextoNivel userId={id} /> */}
              </Card.Body>
            </Card>
          </Container>
        </div>
      )}
    </>
  );
}

export default Personalizar;
