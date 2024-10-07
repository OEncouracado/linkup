import React, { useEffect, useState } from "react";
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
import { fb } from "../../shared/service";
import Lojasublink from "../../Components/Loja";
import { Helmet } from "react-helmet";
import Gemas from "../../Components/Gemas";

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
  const [completedObjectives, setCompletedObjectives] = useState([]);

  useEffect(() => {
    const fetchObjectives = async () => {
      const userStatsRef = fb.firestore.collection("UserStats").doc(id);
      const doc = await userStatsRef.get();
      if (doc.exists) {
        setCompletedObjectives(doc.data().completedObjectives || []);
      }
    };

    fetchObjectives();
  }, [id]);

  useEffect(() => {
    const checkAndAddObjective4 = async () => {
      if (
        completedObjectives.length === 4 &&
        !completedObjectives.includes(4)
      ) {
        const updatedObjectives = [...completedObjectives, 4];

        // Adiciona XP ao completar o objetivo 4
        const xpToAdd = 200; // Valor de XP a ser adicionado
        const userStatsRef = fb.firestore.collection("UserStats").doc(id);
        await userStatsRef.update({
          completedObjectives: updatedObjectives,
          xp: fb.firestore.FieldValue.increment(xpToAdd), // Incrementa o XP
        });

        // Atualize o estado local
        setCompletedObjectives(updatedObjectives);
      }
    };

    checkAndAddObjective4();
  }, [completedObjectives, id]);

  const handleSetAba = (valorAba) => {
    setAba(valorAba);
  };

  const togglePreview = () => {
    setIsPreviewExpanded(!isPreviewExpanded); // Toggle expansion state
  };

  console.log("isLightMode :>> ", isLightMode);

  const getTitle = () => {
    switch (aba) {
      case "dashboard":
        return "Links";
      case "personalizar":
        return "Personalizar";
      case "colecionaveis":
        return "Colecionáveis";
      case "configuracoes":
        return "Configurações";
      case "loja":
        return "Loja";
      case "gemas":
        return "Gemas";
      default:
        return ""; // Ou um valor padrão, como "Página não encontrada"
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Linkii.me - ${getTitle()}`}</title>
      </Helmet>
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
            {aba === "loja" && <Lojasublink setAba={setAba} />}
            {aba === "gemas" && <Gemas />}
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
