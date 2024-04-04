import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fb } from "../../shared/service";


function ModalAdd({ show, setShow, userId }) {

  const handleClose = () => {
    setShow(false);
    setNomeLink("");
    setUrlLink("");
  };
  const [nomeLink, setNomeLink] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const handleAddLink = async () => {
    const linkPagesRef = fb.firestore.collection("linkPages");

    try {
      // Verifique se o usuário está autenticado antes de adicionar o link
      if (userId) {
        const userLinkPagesRef = linkPagesRef.doc(userId); // Referência ao documento do usuário

        // Obtém o documento do usuário
        const userLinkPagesDoc = await userLinkPagesRef.get();

        // Verifica se o documento do usuário já existe
        if (userLinkPagesDoc.exists) {
          const linksArray = userLinkPagesDoc.data().Links || [];

          const newLink = { nome: nomeLink, url: urlLink };

          const updatedLinksArray = [...linksArray, newLink];

          await userLinkPagesRef.update({ Links: updatedLinksArray });
        } else {
          // Se o documento do usuário não existir, cria um novo com o ID do usuário como nome do documento
          await userLinkPagesRef.set({ Links: [{ nome: nomeLink, url: urlLink }] });
        }

        handleClose(true);
        console.log("Novo link adicionado com sucesso!");
      } else {
        console.error("Usuário não autenticado. Não é possível adicionar link.");
      }
    } catch (error) {
      console.error("Erro ao adicionar novo link:", error);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Novo Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="my-1 d-flex flex-column">
            <input
              className="mb-2"
              type="text"
              value={nomeLink}
              onChange={(e) => setNomeLink(e.target.value)}
              placeholder="Nome do Link"
            />
            <input
              type="text"
              value={urlLink}
              onChange={(e) => setUrlLink(e.target.value)}
              placeholder="URL do Link"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddLink}>Adicionar Link</Button>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAdd;
