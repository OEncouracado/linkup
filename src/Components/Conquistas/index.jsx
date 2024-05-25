import React, { useEffect, useState } from "react";
import { Col, Row, ToastContainer } from "react-bootstrap";
import Button from "react-bootstrap/Button";
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
    if (completedObjectives?.length > 0) {
      const ultimoNumeroObjetivo =
        completedObjectives[completedObjectives.length - 1];
      fb.firestore
        .collection("Objetivos")
        .doc("htsim9AD40DTTkCz9FJI")
        .get()
        .then((doc) => {
          if (doc.exists) {
            const objetivosMap = doc.data().objetivos;
            const objetivoConcluido = objetivosMap[ultimoNumeroObjetivo];
            console.log("Objetivo concluído:", objetivoConcluido);
            setShowToast(true);
            setLastCompletedObjective(objetivoConcluido);
          } else {
            console.log("Documento não encontrado");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar objetivo:", error);
        });
    }
    // eslint-disable-next-line
  }, [completedObjectives]);

  const adicionarObjetivo = () => {
    if (!completedObjectives?.includes(1)) {
      const novosObjetivos = [...completedObjectives, 1];
      fb.firestore
        .collection("UserStats")
        .doc(id)
        .update({
          completedObjectives: novosObjetivos,
        })
        .then(() => {
          console.log("Objetivo adicionado com sucesso!");
          setCompletedObjectives(novosObjetivos);
        })
        .catch((error) => {
          console.error("Erro ao adicionar objetivo:", error);
        });
    }
  };

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
                  srcset=""
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
      <Button onClick={adicionarObjetivo}>Adicionar Objetivo</Button>
    </>
  );
}

export default Conquistas;
