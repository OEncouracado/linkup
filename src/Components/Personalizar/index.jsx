import React, { useState, useEffect, useMemo } from "react";
import "react-device-emulator/lib/styles/style.css";
// eslint-disable-next-line
import { Alert, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserInfo, useAuth, usePages } from "../../hook";
import TrocaCorFundo from "./TrocaCorFundo/index";
import TrocaCorLink from "./TrocarCorLink";
import TrocaCorTextoBotao from "./TrocarCorTextoLink";
import TrocaCorTextoNivel from "./TrocarCorTextoNivel";
import TrocaCorSombraLink from "./TrocarCorSombraLink";
// eslint-disable-next-line
import { fb } from "../../shared/service";
import TrocaCorTextoUserName from "./TrocarCorTextoUsername";
import TrocaFundoUserName from "./TrocaFundoUserName";
import TrocaCorSombraUserName from "./TrocarCorSombraUserName";
import TrocarRaiodaBorda from './TrocarRaiodaBorda/index';

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

  // const handleNovoCss = async () => {
  //   fb?.firestore.collection('UserCss').doc(id).set({
  //     corBotao: "#fff",
  //     corFundo: "#fff",
  //     corSombraBotao: "#000",
  //     corSombraUserName: "#000",
  //     corTextoBotao: "#000",
  //     corTextoNivel: "#000",
  //     corTextoUserName: "#000",
  //     fundoUserName: "#fff",
  //     userId: id,
  //     username: userName,
  //   });
  // }

  const handleNovoStats = async () => {
    fb?.firestore.collection("UserStats").doc(id).set({
      imagemPerfil: authUser?.photoURL, // Você pode definir um valor padrão aqui se necessário
      maxXp: 3000,
      moldura: "", // Pode ser definido um valor padrão também
      nivelUser: 9,
      userBackGround: "", // Valor padrão
      userId: id,
      username: "irocl4d", // Usando o nome de usuário fornecido pelo usuário
      xp: 23,
    });
  };

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

          <Container className="personalizarContainers editVariableNumber d-flex flex-column align-items-center py-2 px-3 w-75">
            <TrocarRaiodaBorda userId={id} />
          </Container>

          <Container className="personalizarContainers editColorsWarp d-flex flex-column align-items-center py-2 px-3 w-75">
            <TrocaCorFundo userId={id} />
            <TrocaFundoUserName userId={id} />
            <TrocaCorLink userId={id} />
            <TrocaCorSombraLink userId={id} />
            <TrocaCorSombraUserName userId={id} />
            <TrocaCorTextoBotao userId={id} />
            <TrocaCorTextoUserName userId={id} />
            <TrocaCorTextoNivel userId={id} />
          </Container>
          {/* <Button onClick={handleNovoCss}>
            Novo Css
          </Button> */}
        </div>
      )}
    </>
  );
}

export default Personalizar;
