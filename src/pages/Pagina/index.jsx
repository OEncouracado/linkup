import React from "react";
import { useParams } from "react-router-dom";
import { useLinkPages, UseLinkCss, UseLinkInfo } from "./../../hook";
import PaginaPerfil from "./../../Components/Pagina/PaginaPerfil/index";
import PaginaNivel from "./../../Components/Pagina/PaginaNivel/index";
import PaginaLinkList from "./../../Components/Pagina/PaginaLinkList/index";

function Pagina() {
  const { usuario } = useParams();
  console.log("localização", usuario);
  const pagesArray = useLinkPages(usuario);
  const cssArray = UseLinkCss(usuario);
  const infoArray = UseLinkInfo(usuario);
  const pages = pagesArray && pagesArray[0];
  const css = cssArray && cssArray[0];
  const stats = infoArray && infoArray[0];

  console.log("definição das páginas", pages, stats);
  console.log("css", cssArray);
  const estilo = {
    backgroundImage: `url(${stats?.userBackGround})`,
  };

  return (
    <div className="paginaFundoWarp">
      <div className="paginaFundo pt-5" style={estilo}>
        <div className="paginaWarper m-auto d-flex flex-column align-items-center">
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
        </div>
      </div>
    </div>
  );
}

export default Pagina;
