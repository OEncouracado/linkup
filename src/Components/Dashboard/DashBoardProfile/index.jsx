import React from "react";
import { Container } from "react-bootstrap";
import { useAuth, UserInfo } from "../../../hook";
import DashboardNivel from "../DashboardNivel";
import PerfilRank from "../../../pages/perfil/PerfilRank";
import gema from "../../../Images/gemas/gema.png"
import { useLightMode } from "../LightModeContext";

function DashboardProfile() {
  const { authUser } = useAuth();
  const id = authUser?.uid;
  const infoArray = UserInfo(id);
  const stats = infoArray && infoArray[0];
  const gemas = stats?.gemas;
  console.log(gemas);
  const { isLightMode } = useLightMode(); // Usar o contexto

  return (
    <Container
      className="profileContainers rounded"
      style={
        isLightMode
          ? { backgroundColor: "#F8F9FA", color: "black" }
          : { backgroundColor: "#212529", color: "white" }
      }
    >
      <div className="d-flex flex-column align-items-center text-center px-3">
        <img
          className="rounded-circle mt-4"
          width="150px"
          alt=""
          src={authUser?.photoURL}
        />

        <span className="font-weight-bold">{authUser?.displayName}</span>
        <span
          className=""
          style={isLightMode ? { color: "#3a3a3a" } : { color: "darkgray" }}
        >
          {authUser?.email}
        </span>
        <DashboardNivel xp={stats?.xp} />
        <PerfilRank rank={stats?.rank} />
        <div title={`Gemas do Usuário: ${gemas}`} className="userGemas bg-dark rounded mb-2 py-1 px-2" >
          <div className="d-flex justify-content-center align-items-center">
            <img
              className="me-1"
              src={gema}
              alt="gema"
              style={{ width: "1rem" }}
            />{" : "}
            {gemas}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default DashboardProfile;
