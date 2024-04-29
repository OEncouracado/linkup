import React, { useState } from "react";
import { Button, InputGroup, Modal } from "react-bootstrap";
import {  UserCss, UserInfo } from "../../../hook";
import { fb } from "../../../shared/service";

function TrocarbgTipo({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];
  const userArray = UserInfo(userId);
  const stats = userArray && userArray[0];
  const bgTipoAtual = css?.bgTipo;
  // eslint-disable-next-line
  const [newbgTipo, setNewbgTipo] = useState(bgTipoAtual);
  const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal

  const handleTrocabgTipo = async (selectedbgTipo) => {
    if (selectedbgTipo === "imagem" && !stats?.VIP) {
      // Verifica se o tipo de fundo selecionado é imagem e se o usuário não é VIP
      setShowModal(true); // Exibe o modal de assinatura VIP
    } else {
      setNewbgTipo(selectedbgTipo);
      try {
        await fb?.firestore
          .collection("UserCss")
          .doc(userId)
          .update({ bgTipo: selectedbgTipo });
      } catch (error) {
        console.error(
          "Erro ao atualizar o estilo de borda do usuário no servidor:",
          error
        );
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Componente para selecionar a cor sólida
  const SolidColorSelector = () => (
    <div
      className="solid-color-selector"
      style={{
        width: "33%",
        height: "100%",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        border: "1px solid #dee2e6",
        backgroundColor: css?.corFundo,
        cursor: "pointer",
      }}
      onClick={() => handleTrocabgTipo("corsolida")}
    />
  );

  // Componente para selecionar o gradiente
  const GradientSelector = () => (
    <div
      className="gradient-selector"
      style={{
        width: "33%",
        height: "100%",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        border: "1px solid #dee2e6",
        background: `linear-gradient(180deg, ${css?.corFundo}, ${css?.corFundo2})`,
        cursor: "pointer",
      }}
      onClick={() => handleTrocabgTipo("gradiente")}
    />
  );
  const ImgSelector = () => (
    <div
      className="solid-color-selector"
      style={{
        width: "33%",
        height: "100%",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        border: "1px solid #dee2e6",
        backgroundImage: `URL(https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg)`,
        backgroundSize:"contain",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center",
        cursor: "pointer",
      }}
      onClick={() => handleTrocabgTipo("imagem")}
    />
  );

  return (
    <div className="w-100 my-1">
      <InputGroup style={{ margin: "auto",  border: "0.1rem solid #DEE2E6", borderRadius: "0.4rem" }}>
        <InputGroup.Text style={{ border: "solid #DEE2E6", borderWidth:"0 0.1rem 0 0" }}className="w-50">Tipo de Fundo:</InputGroup.Text>
        <div className="w-50" style={{ display: "flex",paddingBottom: "0.2rem",paddingTop: "0.2rem", }}>
          <SolidColorSelector />
          <GradientSelector />
          <ImgSelector />
        </div>
      </InputGroup>
      {/* Modal de assinatura VIP */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Assine o VIP</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Para selecionar uma imagem de fundo, você precisa ser VIP.</p>
          <img className="w-50" src="https://www.vipbrtelecom.com.br/_next/static/images/logo-9b15102ecdc39560f2d3371b1c9ec1b3.svg" alt="VIP" />
          <p>Assine agora para aproveitar todos os benefícios!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={closeModal}>
            Assinar VIP
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TrocarbgTipo;
