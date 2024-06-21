import React, { useState, useMemo } from "react";
import "react-device-emulator/lib/styles/style.css";
// eslint-disable-next-line
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserInfo, useAuth, usePages } from "../../../hook";
import DashboardLinkList from "../DashboardLinkList";
function DashboardLeft() {
  const { authUser } = useAuth();
  const id = authUser?.uid;
  const userArray = UserInfo(id);
  const pageInfo = usePages(id);
  const pages = pageInfo?.Links;
  const stats = userArray && userArray[0];
  const userName = stats?.linkUserName;
  const molduraAtual = stats?.moldura;
  console.log("array de paginas", pageInfo);
  console.log("const pages", pages);
  const userMoldura = useMemo(
    () => ({
      id: 5000,
      src: molduraAtual,
      nome: "Moldura Atual",
    }),
    [molduraAtual]
  );

  console.log(userMoldura.src);
  // eslint-disable-next-line
  const [frames, setFrames] = useState([]);


  return (
    <>
      {authUser && (
        <div className="dashboardLinks pb-5 d-flex flex-column align-items-center">
          <Alert variant="info" className="mb-5">
            Sua página já está disponível aqui:{" "}
            <Link to={`/${userName}`} target="_blank" rel="noreferrer">
              {userName}
            </Link>
            .
          </Alert>
          <DashboardLinkList pages={pages && pages} userId={id} />
        </div>
      )}
    </>
  );
}

export default DashboardLeft;
