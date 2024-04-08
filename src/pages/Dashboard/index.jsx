import React, { useState } from "react";
import 'react-device-emulator/lib/styles/style.css';
import { useAuth } from "../../hook";
import Preview from "../../Components/preview";
import DashboardLeft from "../../Components/Dashboard/DashboardLeft";
import Personalizar from "../../Components/Personalizar";
import DashboardTopBar from "../../Components/Dashboard/DasboardTopBar";

function Dashboard() {
  const { authUser } = useAuth();
  const userName = authUser?.displayName;
  const avatar = authUser?.photoURL
  const [aba, setAba] = useState("dashboard");

  const handleSetAba = (valorAba) => {
    setAba(valorAba)
  }

  return (
    <>
      <DashboardTopBar handleSetAba={handleSetAba} photo={avatar} id={authUser?.id} />
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
