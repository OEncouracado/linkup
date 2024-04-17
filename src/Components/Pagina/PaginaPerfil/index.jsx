import React from "react";
import perfilNull from "../../../Images/perfil/perfil.jpg";

function PaginaPerfil({ username, perfil, selectedFrame, userStyle }) {
  const estilo = {
    color: userStyle?.corTextoUserName,
    backgroundColor: userStyle?.fundoUserName,
    boxShadow: `0px 5px 15px ${userStyle?.corSombraUserName}`,
  };
  return (
    <div className="perfilsuperiorwarp d-flex bg-alert flex-column justify-content-center">
      <div className="frameepefilwarp d-flex justify-content-center align-items-center">
        {selectedFrame && (
          <img
            src={selectedFrame}
            alt={selectedFrame}
            className="paginaMolduraPerfil"
          />
        )}
        <img
          src={perfil ? perfil : perfilNull}
          alt="imagem de perfil"
          srcSet=""
          className="paginaImagePerfil rounded-circle"
        />
      </div>
      <div
        className="usernamePaginaWarp d-flex justify-content-center align-items-center"
        style={estilo}
      >
        <p className="paginaUsernamePerfil mb-0 fw-bold text-center">
          {username}
        </p>
      </div>
    </div>
  );
}

export default PaginaPerfil;
