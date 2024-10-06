import React, { useEffect, useState } from "react";
import { Navbar, Container, Offcanvas } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import logo from "../../../Images/logos/linkiimelogo.png";
import "./style.css";

function HomeTopbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      expand="md"
      className={`px-4  ${
        isScrolled ? "navbar-scrolled" : "HomeTopbar rounded-pill"
      }`}
      fixed="top"
    >
      <Container fluid>
        <Navbar.Brand>
          <a href="/">
            <img
              className="ImgLogoHomeTopbar"
              src={logo}
              alt="logo"
              srcset=""
            />
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
  );
}

export default HomeTopbar;
