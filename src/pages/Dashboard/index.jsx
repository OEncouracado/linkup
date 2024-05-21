import React, { useState } from "react";
import "react-device-emulator/lib/styles/style.css";
import { UserInfo, useAuth } from "../../hook";
import Preview from "../../Components/preview";
import DashboardLeft from "../../Components/Dashboard/DashboardLeft";
import Personalizar from "../../Components/Personalizar";
import DashboardTopBar from "../../Components/Dashboard/DasboardTopBar";
import Configuracoes from "../../Components/Configuracoes";
import { Col, Container, Row } from 'react-bootstrap';

function Dashboard() {
  const { authUser } = useAuth();
  const id = authUser?.uid;
  const infoArray = UserInfo(id);
  const stats = infoArray && infoArray[0];
  const userName = stats?.linkUserName;
  const avatar = authUser?.photoURL;
  const [aba, setAba] = useState("dashboard");

  const handleSetAba = (valorAba) => {
    setAba(valorAba);
  };

  return (
    <>
      <DashboardTopBar handleSetAba={handleSetAba} photo={avatar} id={id} />
      <Container className="dashboardFundo d-flex justify-content-center me-0">
        <Row className="w-100">
          <Col md={8} >
            {aba === "dashboard" && <DashboardLeft />}
            {aba === "personalizar" && <Personalizar />}
            {aba === "estatisticas" && <DashboardLeft />}
            {aba === "configuracoes" && <Configuracoes />}
          </Col>
          <Col md={4} className="previewFundo py-3">
            <Preview username={userName} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
