import React, { useState, useEffect, useMemo } from "react";
import "react-device-emulator/lib/styles/style.css";
// eslint-disable-next-line
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserInfo, useAuth, usePages } from "../../hook";
import TrocaCorFundo from "./TrocaCorFundo/index";
import TrocaCorLink from "./TrocarCorLink";
import TrocaCorTextoBotao from "./TrocarCorTextoLink";
import TrocaCorTextoNivel from "./TrocarCorTextoNivel";

function Personalizar() {
  const { authUser } = useAuth();
  const id = authUser?.uid;
  const userArray = UserInfo(id);
  const pageInfo = usePages(id);
  const pages = pageInfo?.Links;
  const stats = userArray && userArray[0];
  // eslint-disable-next-line
  const imgPerfil = stats?.imagemPerfil;
  const userName = authUser?.displayName;
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
  // eslint-disable-next-line
  const [selectedFrame, setSelectedFrame] = useState(userMoldura);

  useEffect(() => {
    setSelectedFrame(userMoldura);
  }, [userMoldura]);

  return (
    <>
      {authUser && (
        <div className="dashboardLinks pb-5 d-flex flex-column justify-content-center align-items-center">
          <Alert variant="info" className="mb-5">
            Sua página já está disponível aqui:{" "}
            <Link to={`/${userName}`} target="_blank" rel="noreferrer">
              {userName}
            </Link>
            .
          </Alert>
          <TrocaCorFundo userId={id} />
          <TrocaCorLink userId={id} />
          <TrocaCorTextoBotao userId={id} />
          <TrocaCorTextoNivel userId={id} />
        </div>
      )}
    </>
  );
}

export default Personalizar;
