import React from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Image,
  NavDropdown,
} from "react-bootstrap";
import photoNull from "../../../Images/perfil/perfil.jpg";
import { fb } from "../../../shared/service";
import { useNavigate } from "react-router-dom";

function DashboardTopBar({ handleSetAba, photo }) {
  console.log("photo :>> ", photo);
  const navigate = useNavigate();
  const handleLogout = () => {
    if (window.confirm("Desconectar-se?")) {
      fb?.auth
        .signOut()
        .then(() => {
          // Redirecionar o usuário após logout (exemplo com React Router)
          navigate("/");
        })
        .catch((error) => {
          console.error("Erro ao desconectar:", error);
        });
    }
  };

  return (
    <Navbar variant="dark" bg="dark" sticky="top" className="DashboardTopBar">
      <Container className="">
        <Nav className="me-auto">
          <Nav.Link onClick={() => handleSetAba("dashboard")} title="Dashboard">
            Dashboard
          </Nav.Link>
          <Nav.Link onClick={() => handleSetAba("personalizar")}>
            Personalizar
          </Nav.Link>
          <Nav.Link
            onClick={() => handleSetAba("estatisticas")} //trocar para estatisticas
          >
            Estatísticas
          </Nav.Link>
          <Nav.Link onClick={() => handleSetAba("configuracoes")}>
            Configurações
          </Nav.Link>
        </Nav>
        <Button className="me-4">Teste</Button>

        <NavDropdown
          title={
            <Image
              className="ImgPerfilDashboardTopbar"
              src={photo ? photo : photoNull}
              roundedCircle
            />
          }
        >
          <NavDropdown.Item onClick={handleLogout}>
            <i class="fa fa-sign-out" aria-hidden="true" />
            Sair
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}

export default DashboardTopBar;