import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fb } from "../../shared/service";

function ModalAdd({ show, setShow }) {
  // Corrigido para receber corretamente show e setShow
  const handleClose = () => {
    setShow(false);
    // Limpar os campos do formulário
    setNomeLink("");
    setUrlLink("");
  };
  const [nomeLink, setNomeLink] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const handleAddLink = async () => {
    const linkPagesRef = fb.firestore.collection("linkPages");

    try {
      const linkPagesSnapshot = await linkPagesRef.get();

      linkPagesSnapshot.forEach(async (doc) => {
        const linksArray = doc.data().Links;

        const newLink = { nome: nomeLink, url: urlLink };

        const updatedLinksArray = [...linksArray, newLink];

        await linkPagesRef.doc(doc.id).update({ Links: updatedLinksArray });
        handleClose(true);
        console.log("Novo mapa adicionado com sucesso!");
      });
    } catch (error) {
      console.error("Erro ao adicionar novo mapa:", error);
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
          <Modal.Title>Adcionar Novo Link</Modal.Title>
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
