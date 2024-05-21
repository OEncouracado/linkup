import React, { useState, useEffect, useMemo } from "react";
import "react-device-emulator/lib/styles/style.css";
// eslint-disable-next-line
import { Alert, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserCss, UserInfo, useAuth, usePages } from "../../hook";
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
import TrocarRaiodaBorda from "./TrocarRaiodaBorda/index";
import TrocaruserBackGround from "./TrocarUserBackGround";
import TrocarfundoImgBotao from "./TrocarfundoImgBotao";
import TrocarborderWith from "./TrocarborderWith";
import TrocaborderColor from "./TrocarborderColor";
import TrocarborderStyle from "./TrocarborderStyle";
import TrocarbgTipo from "./TrocarbgTipo";
import TrocaCorFundo2 from "./TrocaCorFundo2";

function Personalizar() {
  const { authUser } = useAuth();
  const id = authUser?.uid;
  const userArray = UserInfo(id);
  const stats = userArray && userArray[0];
  const pageInfo = usePages(id);
  const cssArray = UserCss(id);
  const css = cssArray && cssArray[0];
  const pages = pageInfo?.Links;
  // eslint-disable-next-line
  const imgPerfil = stats?.imagemPerfil;
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
  // eslint-disable-next-line
  const [selectedFrame, setSelectedFrame] = useState(userMoldura);

  useEffect(() => {
    setSelectedFrame(userMoldura);
  }, [userMoldura]);

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
          <Container className="personalizarContainers editFundo d-flex flex-column align-items-center py-2 px-3 ">
            <input type="image" src="" alt="" />
            <TrocarbgTipo userId={id}/>
            {css?.bgTipo === "corsolida" ? <><TrocaCorFundo userId={id} /></> : null }
            {css?.bgTipo === "gradiente" ? <><TrocaCorFundo userId={id} /> <TrocaCorFundo2 userId={id} /></> : null }
            {css?.bgTipo === "imagem" ? <><TrocaruserBackGround userId={id} /></> : null }
            
          </Container>
          <Container className="personalizarContainers editLinks d-flex flex-column align-items-center py-2 px-3 ">
            <TrocarRaiodaBorda userId={id} />
            <TrocaCorLink userId={id} />
            <TrocaCorSombraLink userId={id} />
            <TrocaCorTextoBotao userId={id} />
            {stats?.VIP ? <TrocarfundoImgBotao userId={id} /> : null}
            <TrocarborderWith userId={id} />
            <TrocaborderColor userId={id} />
            <TrocarborderStyle userId={id} />
          </Container>

          <Container className="personalizarContainers editPerfil d-flex flex-column align-items-center py-2 px-3 ">
            <TrocaFundoUserName userId={id} />
            <TrocaCorSombraUserName userId={id} />
            <TrocaCorTextoUserName userId={id} />
            <TrocaCorTextoNivel userId={id} />
          </Container>
        </div>
      )}
    </>
  );
}

export default Personalizar;
