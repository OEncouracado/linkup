import React, { useEffect, useState } from "react";
import { Navbar, Container, Offcanvas, Image } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import logo from "../../../Images/logos/linkiimelogo.png";
import "./style.css";
import { useAuth, UserInfo  } from "../../../hook";
import photoNull from "../../../Images/perfil/perfil.jpg";
import { fb } from "../../../shared/service";
import { useNavigate } from "react-router-dom";
import { useLightMode } from './../../Dashboard/LightModeContext';

function HomeTopbar() {
  const {authUser} = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const isLightMode = useLightMode();
  const infoArray = UserInfo(authUser?.uid);
  const stats = infoArray && infoArray[0];
  const photo = authUser?.photoURL;
  const navigate = useNavigate();
  

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
          {authUser ? <Container
              onClick={()=> navigate("/dashboard")}
              className={`my-1 mx-0 p-0 rounded-pill w-25 text-dark ${isLightMode ? "PerfilDashboardTopbar" : "PerfilDashboardTopbarDark text-light"}`}
              style={{ cursor: "pointer" }}
            >
              <Image
                className={isLightMode ? "ImgPerfilDashboardTopbar" : "ImgPerfilDashboardTopbarDark"}
                src={photo ? photo : photoNull}
                roundedCircle
              />
              <small className="mx-2 my-0">@{stats?.linkUserName}</small>
              </Container>
              :<>
           
              <Nav.Link href="/Singup">Cadastrar-se</Nav.Link>
              <Nav.Link href="/Login">Entrar</Nav.Link>
              </>
            }
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default HomeTopbar;
