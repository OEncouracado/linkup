import React from "react";
import { useParams } from "react-router-dom";// eslint-disable-next-line
import { useLinkPages, UseLinkCss, UseLinkInfo, useAuth } from "./../../hook";
import PaginaPerfil from "./../../Components/Pagina/PaginaPerfil/index";
import PaginaNivel from "./../../Components/Pagina/PaginaNivel/index";
import PaginaLinkList from "./../../Components/Pagina/PaginaLinkList/index";
import { Helmet } from "react-helmet";// eslint-disable-next-line
import { Button, Container } from "react-bootstrap";

function Pagina() {
  const { usuario } = useParams();
  const pagesArray = useLinkPages(usuario);
  const cssArray = UseLinkCss(usuario);
  const infoArray = UseLinkInfo(usuario);
  const pages = pagesArray && pagesArray[0];
  const css = cssArray && cssArray[0];
  const stats = infoArray && infoArray[0];
  const estilo = {
    backgroundImage: `url(${stats?.userBackGround})`,
    backgroundColor: css?.corFundo,
  };

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className="paginaFundoWarp">
        <div className="paginaFundo pt-5" style={estilo}>
          <div className="paginaWarper m-auto pb-5 d-flex flex-column align-items-center">
            <PaginaPerfil
              perfil={stats?.imagemPerfil}
              username={stats?.username}
              selectedFrame={stats?.moldura}
              userStyle={css}
            />
            <PaginaNivel
              nivel={stats?.nivelUser}
              xp={stats?.xp}
              maxxp={stats?.maxXp}
              userStyle={css}
            />
            <PaginaLinkList pages={pages && pages} userStyle={css} />
            <Button className="mt-4">Crie seu Link</Button>
          </div>
        </div>
        <a
          href="/Singup"
          className="paginaFooter d-flex flex-column align-items-center"
        >
          <button className="paginaFooterBnt bn632-hover bn22 text-white paginaFooterItem">
            Linkgame.app/voce
          </button>
          <p className="text-white paginaFooterItem">
            Junte-se a {stats?.username} e crie sua própria aventura.
          </p>
        </a>
      </div>
    </>
  );
}

export default Pagina;
