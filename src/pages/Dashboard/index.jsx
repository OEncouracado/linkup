import React, { useState } from "react";
import "react-device-emulator/lib/styles/style.css";
import { UserInfo, useAuth } from "../../hook";
import Preview from "../../Components/preview";
import DashboardLeft from "../../Components/Dashboard/DashboardLeft";
import Personalizar from "../../Components/Personalizar";
import DashboardTopBar from "../../Components/Dashboard/DasboardTopBar";
import Configuracoes from "../../Components/Configuracoes";
import { Button, Col, Container, Row } from "react-bootstrap";
import Conquistas from "../../Components/Conquistas";
import Colecionaveis from "../../Components/Colecionaveis";

function Dashboard() {
  const { authUser } = useAuth();
  const id = authUser?.uid;
  const infoArray = UserInfo(id);
  const stats = infoArray && infoArray[0];
  const userName = stats?.linkUserName;
  const avatar = authUser?.photoURL;
  const [aba, setAba] = useState("dashboard");
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false); // State for controlling expansion

  const handleSetAba = (valorAba) => {
    setAba(valorAba);
  };
  const togglePreview = () => {
    setIsPreviewExpanded(!isPreviewExpanded); // Toggle expansion state
  };

  return (
    <>
      <DashboardTopBar handleSetAba={handleSetAba} photo={avatar} id={id} />
      <Conquistas id={id} />
      <Container className="dashboardFundo d-flex justify-content-center me-0">
        <Row className="w-100">
          <Col md={8} className="dashboardprincipal">
            {aba === "dashboard" && <DashboardLeft />}
            {aba === "personalizar" && <Personalizar />}
            {aba === "colecionaveis" && <Colecionaveis />}
            {aba === "configuracoes" && <Configuracoes />}
            <Button
              className="expand-btn"
              onClick={togglePreview}
              aria-expanded={isPreviewExpanded}
            >
              {isPreviewExpanded ? "Recolher Preview" : "Preview"}
            </Button>
          </Col>
          <Col
            md={4}
            className={`previewFundo py-3 ${
              isPreviewExpanded ? "expanded" : ""
            }`}
          >
            <Preview username={userName} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
