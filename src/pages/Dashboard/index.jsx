import React, { useState } from "react";
import 'react-device-emulator/lib/styles/style.css';
import { useAuth } from "../../hook";
import Topbar from "./../../Components/TopBar/index";
import Preview from "../../Components/preview";
import DashboardLeft from "../../Components/Dashboard/DashboardLeft";
import Personalizar from "../../Components/Personalizar";
import { Navbar, Container, Nav } from 'react-bootstrap';

function Dashboard() {
  const { authUser } = useAuth();
  const userName = authUser?.displayName;
  const [aba, setAba] = useState("dashboard");

  const handleSetAba = (valorAba) => {
    setAba(valorAba)
  }

  return (
    <>
      <Topbar />
      <Navbar className="">
        <Container>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => handleSetAba("dashboard")}
              title="Dashboard" >Dashboard</Nav.Link>
            <Nav.Link
              onClick={() => handleSetAba("personalizar")}
            >
              Personalizar
            </Nav.Link>
            <Nav.Link
              onClick={() => handleSetAba("estatisticas")} //trocar para estatisticas
            >
              Estatísticas
            </Nav.Link><Nav.Link
              onClick={() => handleSetAba("configuracoes")}
            >
              Configurações
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="dashboardFundo d-flex">
        {aba === "dashboard" && <DashboardLeft />}
        {aba === "personalizar" && <Personalizar />}
        {aba === "estatisticas" && <DashboardLeft />}
        {aba === "configuracoes" && <DashboardLeft />}
        <div className="previewFundo pt-3">
          <Preview username={userName} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
