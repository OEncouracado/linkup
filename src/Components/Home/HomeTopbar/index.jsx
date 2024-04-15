import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import logo from "../../../Images/linkuplogotemporariosfundo.png";

function HomeTopbar() {
  return (
    <Navbar
      bg="light"
      variant="light"
      fixed="top"
      className="HomeTopbar rounded-pill px-4 my-4"
    >
      <Container className="">
        <Navbar.Brand>
          <a href="/">
            <img className="ImgLogoHomeTopbar" src={logo} alt="" srcset="" />
          </a>
        </Navbar.Brand>
        <Nav.Item>
          <Button variant="outline-secondary" href="/Singup">
            Cadastrar-se
          </Button>
          <Button
            variant="outline-success"
            className="ms-3 rounded-pill"
            href="/Login"
          >
            Entrar
          </Button>
        </Nav.Item>
      </Container>
    </Navbar>
  );
}

export default HomeTopbar;
