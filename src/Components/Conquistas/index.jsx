import React, { useEffect, useState } from "react";
import { Col, Row, ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import { fb } from "../../shared/service";
import { UserInfo } from "../../hook";

function Conquistas({ id }) {
  const infoArray = UserInfo(id);
  const stats = infoArray && infoArray[0];
  const ArraycompletedObjectives = stats?.completedObjectives;

  const [showToast, setShowToast] = useState(false);
  const [completedObjectives, setCompletedObjectives] = useState([]);
  const [lastCompletedObjective, setLastCompletedObjective] = useState(null);

  useEffect(() => {
    if (ArraycompletedObjectives) {
      setCompletedObjectives(ArraycompletedObjectives);
    }
  }, [ArraycompletedObjectives]);

  useEffect(() => {
    const storedCompletedObjectives = JSON.parse(localStorage.getItem("completedObjectives")) || [];

    if (completedObjectives.length > 0) {
      const novoObjetivo = completedObjectives.find(obj => !storedCompletedObjectives.includes(obj));

      if (novoObjetivo !== undefined) {
        fb.firestore
          .collection("Objetivos")
          .doc("htsim9AD40DTTkCz9FJI")
          .get()
          .then((doc) => {
            if (doc.exists) {
              const objetivosMap = doc.data().objetivos;
              const objetivoConcluido = objetivosMap[novoObjetivo];
              console.log("Objetivo concluído:", objetivoConcluido);
              setLastCompletedObjective(objetivoConcluido);
              setShowToast(true);

              storedCompletedObjectives.push(novoObjetivo);
              localStorage.setItem("completedObjectives", JSON.stringify(storedCompletedObjectives));
            } else {
              console.log("Documento não encontrado");
            }
          })
          .catch((error) => {
            console.error("Erro ao buscar objetivo:", error);
          });
      }
    }
  }, [completedObjectives]);

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 0 }}>
        <Toast
          bg="dark"
          className={showToast ? "toast-slide-in" : "toast-slide-out"}
          onClose={handleToastClose}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Body className="conquista rounded">
            <Row>
              <Col xs="3" className="text-center my-auto">
                <img
                  src={lastCompletedObjective?.imagem}
                  alt=""
                  width="70%"
                  srcSet=""
                />
              </Col>
              <Col className="py-auto px-0">
                <h5 style={{ color: "#daa520" }}>Objetivo alcançado!</h5>
                <p className="mb-1 text-light">
                  {lastCompletedObjective?.titulo}
                </p>
              </Col>
            </Row>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Conquistas;
