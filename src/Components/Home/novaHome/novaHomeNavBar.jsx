import React from 'react';
import { Container, Nav, Navbar, Offcanvas, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth , UserInfo } from './../../../hook';
import { useLightMode } from './../../Dashboard/LightModeContext';
import "./novaHome.css"

import logo from "../../../Images/logos/linkiimelogo.png";
import photoNull from "../../../Images/perfil/perfil.jpg";


const NovaHomeNavBar = () => {
    const {authUser} = useAuth();
    const isLightMode = useLightMode();
    const infoArray = UserInfo(authUser?.uid);
    const stats = infoArray && infoArray[0];
    const photo = authUser?.photoURL;
    const navigate = useNavigate();

    return (
        <div>
            <Navbar expand="md">
                <Container fluid className='text-dark'>
                    <Navbar.Brand>
                        <a href="/">
                            <img
                                className="ImgLogoHomeTopbar"
                                src={logo}
                                alt="logo"
                                srcSet=""
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
                                            srcSet=""
                                        />
                                    </a>
                                </Navbar.Brand>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                {authUser ? (
                                    <Container
                                        title='Ir para o Dashboard'
                                        onClick={() => navigate("/dashboard")}
                                        className={`my-1 mx-0 p-0 rounded-pill w-25 text-dark ${isLightMode ? "PerfilDashboardTopbarDark" : "PerfilDashboardTopbarDark text-light"}`}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <Image
                                            className={isLightMode ? "ImgPerfilDashboardTopbarDark" : "ImgPerfilDashboardTopbarDark"}
                                            src={photo ? photo : photoNull}
                                            roundedCircle
                                        />
                                        <small className="text-white mx-2 my-0">@{stats?.linkUserName}</small>
                                    </Container>
                                ) : (
                                    <>
                                        <Nav.Link className="singup-login" href="/Singup">Cadastrar-se</Nav.Link>
                                        <Nav.Link className="singup-login" href="/Login">Entrar</Nav.Link>
                                    </>
                                )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    );
};

export default NovaHomeNavBar;