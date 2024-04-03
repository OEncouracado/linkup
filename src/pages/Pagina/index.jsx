import React from "react";
import { useParams } from "react-router-dom";
import { useLinkPages, UseLinkCss, UseLinkInfo, useAuth } from "./../../hook";
import PaginaPerfil from "./../../Components/Pagina/PaginaPerfil/index";
import PaginaNivel from "./../../Components/Pagina/PaginaNivel/index";
import PaginaLinkList from "./../../Components/Pagina/PaginaLinkList/index";
import { Helmet } from 'react-helmet';

function Pagina() {
  const { usuario } = useParams();
  const { authUser } = useAuth();
  const username = authUser?.displayName;
  const pagesArray = useLinkPages(usuario);
  const cssArray = UseLinkCss(usuario);
  const infoArray = UseLinkInfo(usuario);
  const pages = pagesArray && pagesArray[0];
  const css = cssArray && cssArray[0];
  const stats = infoArray && infoArray[0];
  const estilo = {
    backgroundImage: `url(${stats?.userBackGround})`,
  };

  return (<>
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
    <div className="paginaFundoWarp">
      <div className="paginaFundo pt-5" style={estilo}>
        <div className="paginaWarper m-auto d-flex flex-column align-items-center">
          <PaginaPerfil
            perfil={stats?.imagemPerfil}
            username={username}
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
        </div>
      </div>
    </div>
  </>);
}

export default Pagina;
