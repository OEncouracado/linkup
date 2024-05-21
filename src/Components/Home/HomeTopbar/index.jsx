import React from "react";
import { Navbar, Container, Offcanvas } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import logo from "../../../Images/linkuplogotemporariosfundo.png";
import "./style.css";

function HomeTopbar() {
  return (
    <Navbar
      expand="md"
      className=" HomeTopbar rounded-pill px-4 my-4"
      fixed="top"
    >
      <Container fluid>
        <Navbar.Brand>
          <a href="/">
            <img className="ImgLogoHomeTopbar" src={logo} alt="" srcset="" />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
        <Navbar.Offcanvas
          className="offcanvasbg"
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
              <Navbar.Brand>
                <a href="/">
                  <img
                    className="ImgLogoHomeTopbar"
                    src={logo}
                    alt=""
                    srcset=""
                  />
                </a>
              </Navbar.Brand>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/Singup">Cadastrar-se</Nav.Link>
              <Nav.Link href="/Login">Entrar</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>

    // <Navbar
    //   variant="light"
    //   fixed="top"
    //   className="HomeTopbar rounded-pill px-4 my-4"
    //   expand="md"
    // >
    //   <Container className="">
    //     <Navbar.Brand>
    //       <a href="/">
    //         <img className="ImgLogoHomeTopbar" src={logo} alt="" srcset="" />
    //       </a>
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //     <Navbar.Collapse id="responsive-navbar-nav">
    //       <Nav.Item>
    //         <Button variant="outline-secondary" href="/Singup">
    //           Cadastrar-se
    //         </Button>
    //         <Button
    //           variant="outline-success"
    //           className="ms-3 rounded-pill"
    //           href="/Login"
    //         >
    //           Entrar
    //         </Button>
    //       </Nav.Item>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
}

export default HomeTopbar;
