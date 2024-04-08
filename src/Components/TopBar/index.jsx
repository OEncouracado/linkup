import React from "react"; // eslint-disable-next-line
import { Image, Nav, NavDropdown, Navbar } from "react-bootstrap";
import tempLogo from "../../Images/linkuplogotemporariosfundo.png";
import { UserInfo, useAuth } from "../../hook";
import { fb } from "../../shared/service";
import { redirect } from "react-router-dom";

function Topbar() {
  const { isAuthed, authUser } = useAuth();
  const id = authUser?.uid;
  const userArray = UserInfo(id);
  const stats = userArray && userArray[0];
  const imgPerfil = stats?.imagemPerfil;
  const handleLogout = () => {
    if (window.confirm("Desconectar-se?")) {
      fb.auth
        .signOut()
        .then(() => {
          // Redirecionar o usuário após logout (exemplo com React Router)
          redirect("/");
        })
        .catch((error) => {
          console.error("Erro ao desconectar:", error);
        });
    }
  };

  return (<>
    <Navbar variant="dark" className="menuTopBar mt-2 px-5">
      <Navbar.Brand href="/">
        <i class="fa fa-link me-2" aria-hidden="true" />
        <Image className="logoimgtopbar" src={tempLogo}></Image>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="navLinksTopBar">
        <Nav className="navLinksTop d-flex">
          <Nav.Link href="#">Teste</Nav.Link>
          {isAuthed ? (
            <NavDropdown
              title={<Image className="perfilImgHomePage" src={imgPerfil} />}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">teste</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Desconectar
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link href="/dashboard">Login</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </>
  );
}

export default Topbar;
