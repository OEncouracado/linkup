import React, { useState, useEffect, useMemo } from "react";
import "react-device-emulator/lib/styles/style.css";
import { Accordion, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserCss, UserInfo, useAuth } from "../../hook";
import TrocaCorFundo from "./TrocaCorFundo/index";
import TrocaCorLink from "./TrocarCorLink";
import TrocaCorTextoBotao from "./TrocarCorTextoLink";
// import TrocaCorTextoNivel from "./TrocarCorTextoNivel";
import TrocaCorSombraLink from "./TrocarCorSombraLink";
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
import PerfilEdit from "./TrocarImagemNome";

function Personalizar() {
  const { authUser } = useAuth();
  const id = authUser?.uid;
  const userArray = UserInfo(id);
  const stats = userArray && userArray[0];
  const cssArray = UserCss(id);
  const css = cssArray && cssArray[0];
  const userName = stats?.linkUserName;
  const molduraAtual = stats?.moldura;
  const userMoldura = useMemo(
    () => ({
      id: 5000,
      src: molduraAtual,
      nome: "Moldura Atual",
    }),
    [molduraAtual]
  );

  console.log(userMoldura.src);// eslint-disable-next-line
  const [frames, setFrames] = useState([]);// eslint-disable-next-line
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
          <Accordion alwaysOpen defaultActiveKey={["0", "1", "2", "3"]} className="personalizarContainers">
            <Accordion.Item eventKey="0" className="editFundo d-flex flex-column align-items-center">
              <Accordion.Header className="w-100">Imagem de Perfil e Alterar Nome</Accordion.Header>
              <Accordion.Body className="AccBody">
                <PerfilEdit />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className=" editFundo d-flex flex-column align-items-center ">
              <Accordion.Header className="w-100">Fundo</Accordion.Header>
              <Accordion.Body className="">
                <TrocarbgTipo userId={id} />
                {css?.bgTipo === "corsolida" ? <><TrocaCorFundo userId={id} /></> : null}
                {css?.bgTipo === "gradiente" ? <><TrocaCorFundo userId={id} /> <TrocaCorFundo2 userId={id} /></> : null}
                {css?.bgTipo === "imagem" ? <><TrocaruserBackGround userId={id} /></> : null}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className="editFundo d-flex flex-column align-items-center ">
              <Accordion.Header className="w-100">Botões de Link</Accordion.Header>
              <Accordion.Body className="">
                <TrocarRaiodaBorda userId={id} />
                <TrocaCorLink userId={id} />
                <TrocaCorSombraLink userId={id} />
                <TrocaCorTextoBotao userId={id} />
                {stats?.VIP ? <TrocarfundoImgBotao userId={id} /> : null}
                <TrocarborderStyle userId={id} />
                <TrocaborderColor userId={id} />
                <TrocarborderWith userId={id} />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3" className="editFundo d-flex flex-column align-items-center ">
              <Accordion.Header className="w-100">Nome do Usuário e Nível</Accordion.Header>
              <Accordion.Body className="">
                <TrocaFundoUserName userId={id} />
                <TrocaCorSombraUserName userId={id} />
                <TrocaCorTextoUserName userId={id} />
                {/* <TrocaCorTextoNivel userId={id} /> */}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      )}
    </>
  );
}

export default Personalizar;
