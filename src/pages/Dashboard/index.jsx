import React, { useState, useEffect, useMemo } from "react";
import 'react-device-emulator/lib/styles/style.css';
// eslint-disable-next-line
import { useAuth, UserInfo, usePages, useStorage } from "../../hook";
import Topbar from "./../../Components/TopBar/index";
import DashboardPerfil from "../../Components/Dashboard/DashboardPerfil";
// eslint-disable-next-line
import DashboardMoldura from "../../Components/Dashboard/DashboardMoldura";
import DashboardLinkList from "../../Components/Dashboard/DashboardLinkList";
import DashboardNivel from "../../Components/Dashboard/DashboardNivel";
import Preview from "../../Components/preview";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
function Dashboard() {
  const { authUser } = useAuth();
  const id = authUser?.uid;
  const userArray = UserInfo(id);
  const pageArray = usePages(id);
  const pages = pageArray && pageArray[0];
  const stats = userArray && userArray[0];
  const imgPerfil = stats?.imagemPerfil;
  const userName = authUser?.displayName;
  const molduraAtual = stats?.moldura;
  const userMoldura = useMemo(
    () => ({
      id: 5000,
      src: molduraAtual,
      nome: "Moldura Atual",
    }),
    [molduraAtual]
  );

  console.log(userMoldura.src)
  // eslint-disable-next-line
  const [frames, setFrames] = useState([]);
  const [selectedFrame, setSelectedFrame] = useState(userMoldura);

  useEffect(() => {
    setSelectedFrame(userMoldura);
  }, [userMoldura]);


  return (
    <>
      <Topbar />
      <div className="dashboardFundo d-flex">
        {authUser && (
          <div className="dashboardLinks py-5 d-flex flex-column justify-content-center align-items-center">
            <Alert variant="info" className="mb-5">
              Sua página já está disponível aqui:{" "}
              <Link to={`/${userName}`} target="_blank" rel="noreferrer">
                {userName}
              </Link>
              .
            </Alert>
            <DashboardPerfil
              perfil={imgPerfil}
              selectedFrame={selectedFrame}
              username={userName}
            />
            <DashboardNivel
              nivel={stats?.nivelUser}
              xp={stats?.xp}
              maxxp={stats?.maxXp}
            />
            {/* <DashboardMoldura
              frames={frames}
              handleSelectFrame={handleSelectFrame}
            /> */}
            <DashboardLinkList pages={pages && pages} />
          </div>
        )}
        <div className="previewFundo pt-3">
          <Preview username={userName} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
