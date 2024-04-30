import React, { useState } from "react";
import perfilNull from "../../../Images/perfil/perfil.jpg";
import TrocaUserName from "../../TrocaUsername";
import ModalEditarImgPerfil from "./ModalEditarImgPerfil";
import { fb } from "../../../shared/service";
import { useAuth } from "./../../../hook/authUser";

function DashboardPerfil({ id, username, perfil, selectedFrame }) {
  const { authUser } = useAuth();
  const [show, setShow] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [showIgm, setShowImg] = useState(false);
  const handleShowImg = () => setShowImg(true);

  // Função para deletar a imagem de perfil
  const handleDeleteImage = async () => {
    try {
      const confirmDelete = window.confirm(
        "Tem certeza de que deseja excluir sua imagem de perfil?"
      );
      if (confirmDelete) {
        const uid = id;
        const storageRef = fb?.storage.ref(`images/usuarios/${uid}/perfil`);
        await clearFolder(storageRef); // Exclua a imagem de perfil

        // Atualize a photoURL do usuário para a imagem padrão ou vazia, se necessário
        await authUser?.updateProfile({
          photoURL: "", // ou a URL da imagem padrão
        });

        // Atualize o campo imagemPerfil no documento UserStats para a imagem padrão ou vazia, se necessário
        await fb?.firestore.collection("UserStats").doc(uid).update({
          imagemPerfil: "", // ou a URL da imagem padrão
        });

        window.alert("Imagem de perfil excluída com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao excluir imagem de perfil: ", error);
    }
  };
  const clearFolder = async (storageRef) => {
    try {
      const items = await storageRef.listAll();
      await Promise.all(items.items.map((item) => item.delete()));
    } catch (error) {
      console.error("Error clearing folder: ", error);
    }
  };

  const handleShowChange = (value) => {
    setShow(value);
  };

  return (
    <div className="perfilsuperiorwarp d-flex flex-column justify-content-center">
      <div
        className="frameepefilwarp d-flex justify-content-center align-items-center"
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
        />
        {showIcons && (
          <div className="iconContainer">
            <i
              className="fa fa-pencil editIcon"
              onClick={handleShowImg}
              aria-hidden="true"
            />
            <i
              className="fa fa-trash deleteIcon"
              onClick={handleDeleteImage}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {!show ? (
        <div className="usernamePefilWarp bg-light d-flex justify-content-center align-items-center">
          <p className="username mb-0 fw-bold text-center">{username}</p>
          <i
            className="iconShowEditUsername fa fa-pencil ms-3"
            aria-hidden="true"
            onClick={() => setShow(true)}
          />
        </div>
      ) : (
        <div className="usernamePefilWarp bg-light d-flex justify-content-center align-items-center">
          <TrocaUserName onShowChange={handleShowChange} />
          <i
            className="iconShowEditUsername fa fa-times"
            aria-hidden="true"
            onClick={() => setShow(false)}
          />
        </div>
      )}
      <ModalEditarImgPerfil
        show={showIgm}
        setShowImg={setShowImg}
        perfil={perfil}
      />
    </div>
  );
}

export default DashboardPerfil;
