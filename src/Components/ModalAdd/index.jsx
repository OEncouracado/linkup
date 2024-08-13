import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fb } from "../../shared/service";
import { logEvent } from "./../../hook/analytics";
import { useLightMode } from "../Dashboard/LightModeContext";
import { Card, Col, Form, Row } from "react-bootstrap";
import "./modaladd.css";

function ModalAdd({ show, setShow, userId, setLinks }) {
  const [nomeLink, setNomeLink] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [completedObjectives, setCompletedObjectives] = useState([]);
  const { isLightMode } = useLightMode();

  useEffect(() => {
    const fetchObjectives = async () => {
      const userStatsRef = fb.firestore.collection("UserStats").doc(userId);
      const doc = await userStatsRef.get();
      if (doc.exists) {
        setCompletedObjectives(doc.data().completedObjectives || []);
      }
    };

    fetchObjectives();
  }, [userId]);

  const handleClose = () => {
    setShow(false);
    setNomeLink("");
    setUrlLink("");
  };

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

        // Verificar e adicionar prefixo ao URL, se necessário
        const formattedUrl =
          urlLink.startsWith("http://") || urlLink.startsWith("https://")
            ? urlLink
            : `http://${urlLink}`;

        // Gerar um novo ID único para o link
        const newLinkId =
          linksArray.length > 0
            ? Math.max(...linksArray.map((link) => Number(link.id) || 0)) + 1
            : 1;

        const newLink = { id: newLinkId, nome: nomeLink, url: formattedUrl };
        const updatedLinksArray = [...linksArray, newLink];

        if (userLinkPagesDoc.exists) {
          await userLinkPagesRef.update({ Links: updatedLinksArray });
        } else {
          await userLinkPagesRef.set({ Links: [newLink] });
        }

        // Verificação e adição dos objetivos e XP
        let newCompletedObjectives = [...completedObjectives];
        let xpToAdd = 0; // XP a ser adicionado

        const addObjectiveIfNeeded = (objective, xpReward) => {
          if (!newCompletedObjectives.includes(objective)) {
            newCompletedObjectives.push(objective);
            xpToAdd += xpReward; // Adiciona XP para o objetivo alcançado
          }
        };

        // Objetivo 0: Adicionou o primeiro link
        if (linksArray.length === 0) {
          addObjectiveIfNeeded(0, 10); // 10 XP para o primeiro link
        }

        // Objetivo 1: Adicionou 5 links
        if (updatedLinksArray.length === 5) {
          addObjectiveIfNeeded(1, 50); // 50 XP para 5 links
        }

        // Objetivo 2: Adicionou 10 links
        if (updatedLinksArray.length === 10) {
          addObjectiveIfNeeded(2, 100); // 100 XP para 10 links
        }

        // Se algum objetivo foi alcançado e há XP para adicionar
        if (newCompletedObjectives.length !== completedObjectives.length) {
          const userStatsRef = fb.firestore.collection("UserStats").doc(userId);
          const userStatsDoc = await userStatsRef.get();
          let currentXP = userStatsDoc.data().xp || 0;

          await userStatsRef.update({
            completedObjectives: newCompletedObjectives,
            xp: currentXP + xpToAdd, // Atualiza o XP do usuário
          });

          setCompletedObjectives(newCompletedObjectives);
        }

        logEvent("add_link", {
          userId: userId,
          linkName: nomeLink,
          linkUrl: formattedUrl,
        });
        setLinks(updatedLinksArray);
        handleClose();
        console.log("Novo link adicionado com sucesso!");
      } else {
        console.error(
          "Usuário não autenticado. Não é possível adicionar link."
        );
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
        className={isLightMode ? "text-dark" : "text-white"}
      >
        <Modal.Body style={{ backgroundColor: "transparent" }} className="">
          <Card
            bg={isLightMode ? "light" : "dark"}
            text={isLightMode ? "dark" : "light"}
          >
            <Card.Header
              style={isLightMode ? {} : { backgroundColor: "#272B2F" }}
            >
              <Card.Title className="">
                <Row className="me-2 align-items-center">
                  <Col xs={11}>
                    <h3 className="m-0">Adicionar Novo Link</h3>
                  </Col>
                  <Col className="" xs={1}>
                    <Button variant="outline-danger" onClick={handleClose}>
                      X
                    </Button>
                  </Col>
                </Row>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form className="my-1 d-flex flex-column">
                <Form.Control
                  style={isLightMode ? {} : { backgroundColor: "gray" }}
                  className={`mb-2 ${isLightMode ? "text-dark" : "text-light"}`}
                  type="text"
                  value={nomeLink}
                  onChange={(e) => setNomeLink(e.target.value)}
                  placeholder="Nome do Link"
                />
                <Form.Control
                  style={isLightMode ? {} : { backgroundColor: "gray" }}
                  className={`mb-2 ${isLightMode ? "text-dark" : "text-light"}`}
                  type="url"
                  value={urlLink}
                  onChange={(e) => setUrlLink(e.target.value)}
                  placeholder="URL do Link"
                />
              </Form>
            </Card.Body>
            <Card.Footer className="">
              <Row className="me-1 align-items-center">
                <Col className="">
                  <Button
                    variant="outline-success"
                    className=""
                    onClick={handleAddLink}
                  >
                    Adicionar Link
                  </Button>
                </Col>
                <Col className="d-flex justify-content-end pe-0 me-0">
                  <Button variant="outline-danger" onClick={handleClose}>
                    Fechar
                  </Button>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalAdd;
