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
import DashboardProfile from "./../../Components/Dashboard/DashBoardProfile/index";
import MiniProfile from "../../Components/Dashboard/DashBoardProfile/MiniProfile";
import { useLightMode } from "./../../Components/Dashboard/LightModeContext";

function Dashboard() {
  const { isLightMode } = useLightMode();
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

  console.log("isLightMode :>> ", isLightMode);

  return (
    <>
      <DashboardTopBar handleSetAba={handleSetAba} photo={avatar} id={id} />
      <Conquistas id={id} />
      <Container
        className="dashboardFundo d-flex justify-content-center me-0"
        style={
          isLightMode
            ? { backgroundColor: "white" }
            : { backgroundColor: "#6C757D" }
        }
      >
        <Row className="w-100">
          <Col md={2} className="profileFundo">
            <MiniProfile photo={avatar} />
            <DashboardProfile />
          </Col>
          <Col md={6} className="dashboardprincipal">
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
            className={`previewFundo pt-3 ${
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
