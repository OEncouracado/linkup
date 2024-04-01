import React from "react";

function PaginaLink({ url, nome, linkEstilo }) {
  const userEstilo = {
    backgroundColor: linkEstilo?.corBotao,
    color: linkEstilo?.corTextoBotao,
    boxShadow: `0px 5px 15px ${linkEstilo?.corSombraBotao}`,
  };
  return (
    <a
      className="paginaLink"
      style={userEstilo}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="linkPage">{nome}</div>
    </a>
  );
}

export default PaginaLink;
