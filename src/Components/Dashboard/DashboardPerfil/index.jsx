import React, { useState } from "react";
import perfilNull from "../../../Images/perfil/perfil.jpg";
import TrocaUserName from "../../TrocaUsername";
import { Modal , Button, Form } from "react-bootstrap";

function DashboardPerfil({ username, perfil, selectedFrame }) {
  const [show, setShow] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [showIgm, setShowImg] = useState(false);
  const handleCloseImg = () => setShowImg(false);
  const handleShowImg = () => setShowImg(true);

  const handleShowChange = (value) => {
    setShow(value);
  };
  return (
    <div className="perfilsuperiorwarp d-flex flex-column justify-content-center">
      <div className="frameepefilwarp d-flex justify-content-center align-items-center"
        onMouseEnter={() => setShowIcons(true)}
        onMouseLeave={() => setShowIcons(false)}
      >
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
        />{showIcons && (
          <div className="iconContainer">
            <i className="fa fa-pencil editIcon" onClick={handleShowImg} aria-hidden="true" />
            <i className="fa fa-trash deleteIcon" aria-hidden="true" />
          </div>
        )}
      </div>
      {!show ? (<div className="usernamePefilWarp bg-light d-flex justify-content-center align-items-center">
        <p className="mb-0 fw-bold text-center">{username}</p>
        <i className="iconShowEditUsername fa fa-pencil ms-3" aria-hidden="true" onClick={() => setShow(true)} />
      </div>) : (<div className="usernamePefilWarp bg-light d-flex justify-content-center align-items-center">
        <TrocaUserName onShowChange={handleShowChange} />
        <i className="iconShowEditUsername fa fa-times" aria-hidden="true" onClick={() => setShow(false)} />
      </div>)}
      <Modal basic show={showIgm} onHide={handleCloseImg} centered closeButton>
        <Modal.Header closeButton>
          <Modal.Title>Editar Imagem de Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="file"/>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseImg}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseImg}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default DashboardPerfil;
