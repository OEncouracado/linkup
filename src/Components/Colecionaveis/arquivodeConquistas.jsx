import React, { useEffect, useState } from "react";
import { Col, Row, Toast, Container } from "react-bootstrap";
import { fb } from "../../shared/service";
import { UserInfo } from "../../hook";

function ConquistasUsuario({ id }) {
  const infoArray = UserInfo(id);
  const stats = infoArray && infoArray[0];
  const ArraycompletedObjectives = stats?.completedObjectives;

  const [completedObjectives, setCompletedObjectives] = useState([]);
  const [allObjectives, setAllObjectives] = useState({});

  useEffect(() => {
    if (ArraycompletedObjectives) {
      setCompletedObjectives(ArraycompletedObjectives);
    }
  }, [ArraycompletedObjectives]);

  useEffect(() => {
    fb.firestore
      .collection("Objetivos")
      .doc("htsim9AD40DTTkCz9FJI")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setAllObjectives(doc.data().objetivos);
        } else {
          console.log("Documento não encontrado");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar objetivos:", error);
      });
  }, []);

  return (
    <Container>
      <Row>
        {completedObjectives.length > 0 ? (
          completedObjectives.map((objId, index) => (
            <Col md={6} key={index}>
              <Toast
                bg="dark"
                className="mb-3"
                title={allObjectives[objId]?.descricao}
              >
                <Toast.Body className="conquista rounded">
                  <Row>
                    <Col xs="3" className="text-center my-auto">
                      <img
                        src={allObjectives[objId]?.imagem}
                        alt=""
                        width="70%"
                        srcSet=""
                      />
                    </Col>
                    <Col className="py-auto ps-0">
                      <h5 style={{ color: "#daa520" }}>Objetivo alcançado!</h5>
                      <p className="mb-1 text-light">
                        {allObjectives[objId]?.titulo}
                      </p>
                    </Col>
                  </Row>
                </Toast.Body>
              </Toast>
            </Col>
          ))
        ) : (
          <p>O usuário não possui conquistas ainda.</p>
        )}
      </Row>
    </Container>
  );
}

export default ConquistasUsuario;
