import React, { useState } from "react";
import perfilNull from "../../../Images/perfil/perfil.jpg";
import TrocaUserName from "../../TrocaUsername";

function DashboardPerfil({ username, perfil, selectedFrame }) {
  const [show, setShow] = useState(false);
  const handleShowChange = (value) => {
    setShow(value);
  };
  return (
    <div className="perfilsuperiorwarp d-flex flex-column justify-content-center">
      <div className="frameepefilwarp d-flex justify-content-center align-items-center">
        {selectedFrame.src && (
          <img
            src={selectedFrame.src}
            alt={selectedFrame.nome}
            className="dashboardMolduraPerfil"
          />
        )}
        <img
          src={perfil ? perfil : perfilNull}
          alt="imagem de perfil"
          srcSet=""
          className="dashboardImagePerfil rounded-circle"
        />
      </div>
      {!show ? (<div className="usernamePefilWarp bg-light d-flex justify-content-center align-items-center">
        <p className="mb-0 fw-bold text-center">{username}</p>
        <i className="iconShowEditUsername fa fa-pencil ms-3" aria-hidden="true" onClick={() => setShow(true)} />
      </div>) : (<div className="usernamePefilWarp bg-light d-flex justify-content-center align-items-center">
        <TrocaUserName onShowChange={handleShowChange} />
        <i className="iconShowEditUsername fa fa-times" aria-hidden="true" onClick={() => setShow(false)} />
      </div>)}
    </div>
  );
}

export default DashboardPerfil;
