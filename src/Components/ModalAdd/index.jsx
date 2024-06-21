import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fb } from "../../shared/service";
import { UserInfo } from "../../hook";

function ModalAdd({ show, setShow, userId }) {
  const infoArray = UserInfo(userId);
  const stats = infoArray && infoArray[0];
  const ArraycompletedObjectives = stats?.completedObjectives;
  const [completedObjectives, setCompletedObjectives] = useState([]);

  useEffect(() => {
    if (ArraycompletedObjectives) {
      setCompletedObjectives(ArraycompletedObjectives);
    }
  }, [ArraycompletedObjectives]);

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
      if (userId) {
        const userLinkPagesRef = linkPagesRef.doc(userId);
        const userLinkPagesDoc = await userLinkPagesRef.get();

        let linksArray = [];
        if (userLinkPagesDoc.exists) {
          linksArray = userLinkPagesDoc.data().Links || [];
        }

        const newLink = { nome: nomeLink, url: urlLink };
        const updatedLinksArray = [...linksArray, newLink];

        if (userLinkPagesDoc.exists) {
          await userLinkPagesRef.update({ Links: updatedLinksArray });
        } else {
          await userLinkPagesRef.set({ Links: [newLink] });
        }

        // Verificação e adição dos objetivos
        let newCompletedObjectives = [...completedObjectives];

        const addObjectiveIfNeeded = (objective) => {
          if (!newCompletedObjectives.includes(objective)) {
            newCompletedObjectives.push(objective);
          }
        };

        // Objetivo 0: Adicionou o primeiro link
        if (linksArray.length === 0) {
          addObjectiveIfNeeded(0);
        }

        // Objetivo 1: Adicionou 5 links
        if (updatedLinksArray.length === 5) {
          addObjectiveIfNeeded(1);
        }

        // Objetivo 2: Adicionou 10 links
        if (updatedLinksArray.length === 10) {
          addObjectiveIfNeeded(2);
        }

        if (newCompletedObjectives.length !== completedObjectives.length) {
          await fb.firestore.collection("UserStats").doc(userId).update({
            completedObjectives: newCompletedObjectives,
          });
          setCompletedObjectives(newCompletedObjectives);
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
