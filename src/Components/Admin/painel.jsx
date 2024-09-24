import React, { useState } from "react";
import { useAuth, UserInfo } from "../../hook";
import logo from "../../Images/linkuplogo.png";
import { Col, Container, Nav, Row } from "react-bootstrap";
import "./Painel.css";
import { useNavigate } from "react-router-dom";
import HomeAdminPainel from "./home";
import UsuariosAdminPainel from "./usuarios";

function AdminDashboard() {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const infoArray = UserInfo(id); // eslint-disable-next-line
    const stats = infoArray && infoArray[0];
    const navigate = useNavigate();
    const [aba, setAba] = useState("home");

    return (
        <Container className="adminPainelbg">
            <Container className="adminPainel">
                <Row className="adminPainelTitle h-100">
                    <Col md={2} className="bg-dark p-0">
                        <Nav className="flex-column justify-content-around h-100">
                            <Nav.Link className="navLinkAdminPainel w-100" onClick={() => setAba("home")}>
                                <i class="fas fa-home" /> <span>Home</span>
                            </Nav.Link>
                            <Nav.Link className="navLinkAdminPainel" onClick={() => setAba("usuarios")}>
                                <i class="fas fa-user" /> <span>Gestão de Usuários</span>
                            </Nav.Link>
                            <Nav.Link className="navLinkAdminPainel" onClick={() => setAba("conteudo")}>
                                <i class="fas fa-hashtag    " /> <span>Gestão de Conteúdo</span>
                            </Nav.Link>
                            <Nav.Link className="navLinkAdminPainel" onClick={() => setAba("seguranca")}>
                                <i class="fas fa-user-shield" /> <span>Gestão de Segurança</span>
                            </Nav.Link>
                            <Nav.Link className="navLinkAdminPainel" onClick={() => setAba("relatorios")}>
                                <i class="fas fa-clipboard" /> <span>Relatórios</span>
                            </Nav.Link>
                            <Nav.Link className="navLinkAdminPainel" onClick={() => setAba("configuracoes")}>
                                <i class="fas fa-cogs" /> <span>Configurações</span>
                            </Nav.Link>
                            <Nav.Link className="navLinkAdminPainel" onClick={() => navigate("/dashboard")}>
                                <i class="fas fa-sign-out-alt    " /> <span>Sair</span>
                            </Nav.Link>
                        </Nav>
                    </Col>
                    <Col xs className="d-flex align-items-center text-dark">
                        {aba === "home" && <HomeAdminPainel user={authUser} />}
                        {aba === "usuarios" && <UsuariosAdminPainel user={authUser} />}
                        {aba === "conteudo" && <HomeAdminPainel user={authUser} />}
                        {aba === "seguranca" && <HomeAdminPainel user={authUser} />}
                        {aba === "relatorios" && <HomeAdminPainel user={authUser} />}
                        {aba === "configuracoes" && <HomeAdminPainel user={authUser} />}

                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default AdminDashboard;
