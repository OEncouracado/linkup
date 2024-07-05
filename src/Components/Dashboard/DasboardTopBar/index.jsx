import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Image,
  Offcanvas,
  Row,
  Col,
} from "react-bootstrap";
import photoNull from "../../../Images/perfil/perfil.jpg";
import { fb } from "../../../shared/service";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../../hook";

function DashboardTopBar({ handleSetAba, photo, id }) {
  const infoArray = UserInfo(id);
  const stats = infoArray && infoArray[0];
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const handleCloseStart = () => setShowStart(false);
  const handleShowStart = () => setShowStart(true);

  const handleCloseEnd = () => setShowEnd(false);
  const handleShowEnd = () => setShowEnd(true);

  const navigate = useNavigate();
  const handleLogout = () => {
    if (window.confirm("Desconectar-se?")) {
      fb?.auth
        .signOut()
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Erro ao desconectar:", error);
        });
    }
  };

  return (
    <Navbar variant="dark" bg="dark" expand="md" className="DashboardTopBar">
      <Container>
        <Row className="w-100">
          <Col sm={10} xs={6}>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" onClick={handleShowStart} />
            <Navbar.Offcanvas
              className="offcanvasbg ps-3"
              id="offcanvasNavbar-expand-md"
              aria-labelledby="offcanvasNavbarLabel-expand-md"
              placement="start"
              show={showStart}
              onHide={handleCloseStart}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                  <img
                    className="ImgPerfilDashboardTopbar"
                    src={photo ? photo : photoNull}
                    alt=""
                  />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="me-auto">
                  <Nav.Link onClick={() => handleSetAba("dashboard")}>Links</Nav.Link>
                  <Nav.Link onClick={() => handleSetAba("personalizar")}>Personalizar</Nav.Link>
                  <Nav.Link onClick={() => handleSetAba("colecionaveis")}>Colecionáveis</Nav.Link>
                  <Nav.Link onClick={() => handleSetAba("configuracoes")}>Configurações</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Col>
          <Col sm={2} xs={6}>
            <Container onClick={handleShowEnd} className="my-1 p-0 PerfilDashboardTopbar rounded-pill text-light">
              <Image
                className="ImgPerfilDashboardTopbar"
                src={photo ? photo : photoNull}
                roundedCircle
              />
              <small className="mx-2 my-0">
                @{stats?.linkUserName}</small>
            </Container>
            <Offcanvas placement="end" show={showEnd} onHide={handleCloseEnd}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  <Container className="bg-dark-subtle rounded">
                    <Row>
                      <Col xs={3}><Image
                        className="ImgPerfilDashboardTopbarPerfil"
                        src={photo ? photo : photoNull}
                        roundedCircle
                      /></Col>
                      <Col className="my-1" xs={9}>
                        <h5 className="m-0">{stats?.username}</h5>
                        <small className="text-secondary">sublinks.me/{stats?.linkUserName}</small>
                      </Col>

                    </Row>
                  </Container>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="px-0">
                <Nav>
                  <Nav.Item className="perfilNavLink">
                    <Nav.Link href="/perfil">Perfil</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="perfilNavLink">
                    <Nav.Link onClick={handleLogout}>
                      Sair <i className="fa fa-sign-out ms-1" aria-hidden="true" />
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Offcanvas.Body>
            </Offcanvas>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default DashboardTopBar;
