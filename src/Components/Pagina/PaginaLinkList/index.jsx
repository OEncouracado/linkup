import React from "react";
import PaginaLink from "../PaginaLink";

function PaginaLinkList({ pages, userStyle, usuario }) {
  return (
    <div className="paginaLinksList d-flex flex-column align-items-center">
      {pages?.Links.map((link, index) => (
        <PaginaLink
          key={index}
          url={link.url}
          nome={link.nome}
          linkEstilo={userStyle}
          usuario={usuario} // Passe o nome do usuário
        />
      ))}
    </div>
  );
}

export default PaginaLinkList;
