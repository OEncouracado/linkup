import React, { useState } from "react";
import { useParams } from "react-router-dom"; // eslint-disable-next-line
import { useLinkPages, UseLinkCss, UseLinkInfo, useAuth } from "./../../hook";
import PaginaPerfil from "./../../Components/Pagina/PaginaPerfil/index"; // eslint-disable-next-line
import PaginaNivel from "./../../Components/Pagina/PaginaNivel/index";
import PaginaLinkList from "./../../Components/Pagina/PaginaLinkList/index";
import { Helmet } from "react-helmet"; // eslint-disable-next-line
import { Button, Container } from "react-bootstrap";

function Pagina() {
  const { usuario } = useParams();
  const pagesArray = useLinkPages(usuario);
  const cssArray = UseLinkCss(usuario);
  const infoArray = UseLinkInfo(usuario);
  const pages = pagesArray && pagesArray[0];
  const css = cssArray && cssArray[0];
  const stats = infoArray && infoArray[0];
  const [exibirA, setExibirA] = useState(true);

  const handleClose = () => {
    setExibirA(false);
  };
  // eslint-disable-next-line
  const fontePagina = { fontFamily: "fibra" };

  let estiloLinearGr = {};

  if (stats?.VIP && stats?.userBackGround && css?.bgTipo === "imagem") {
    estiloLinearGr = {
      backgroundImage: `url(${stats?.userBackGround})`,
    };
  } else if (css?.bgTipo === "corsolida") {
    estiloLinearGr = {
      backgroundColor: css?.corFundo,
    };
  } else if (css?.bgTipo === "gradiente") {
    estiloLinearGr = {
      background: `linear-gradient(180deg, ${css?.corFundo} 0%, ${css?.corFundo2} 100%)`,
    };
  }

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className="paginaFundoWarp">
        <div className="paginaFundo pt-0" style={estiloLinearGr}>
          <div className="paginaWarper mt-4 m-auto pb-5 d-flex flex-column align-items-center">
            <PaginaPerfil
              perfil={stats?.imagemPerfil}
              username={stats?.username}
              selectedFrame={stats?.moldura}
              rank={stats?.rank}
              userStyle={css}
            />
            {/* <PaginaNivel
              nivel={stats?.nivelUser}
              xp={stats?.xp}
              maxxp={stats?.maxXp}
              userStyle={css}
            /> */}
            <PaginaLinkList pages={pages && pages} userStyle={css} />
          </div>
          <div className="botaoCrieSeuLink text-center pb-3">
            <Button href="/Singup" className="mt-4">
              Crie seu Link
            </Button>
          </div>
        </div>
        {exibirA && (
          <>
            <div className="paginaFooter d-flex flex-column align-items-center">
              <button
                href="/Singup"
                className="paginaFooterBnt bn632-hover bn22 text-white paginaFooterItem"
              >
                Linkgame.app/voce
              </button>
              <div className="d-flex">
                <p className="text-white paginaFooterItem">
                  Junte-se a {stats?.username} e crie sua própria aventura.
                </p>
                <p className="fecharBtn text-white ms-4" onClick={handleClose}>
                  X
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Pagina;
