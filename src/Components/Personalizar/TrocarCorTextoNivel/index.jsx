import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";

function TrocaCorTextoNivel({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];

  const corTextoNivelAtual = css?.corTextoNivel;
  const [newCorTextoNivel, setNewCorTextoNivel] = useState("");
  const handleTrocaCorTextoNivel = async (e) => {
    setNewCorTextoNivel(e.target.value);
    try {
      await fb?.firestore
        .collection("UserCss")
        .doc(userId)
        .update({ corTextoNivel: newCorTextoNivel });
    } catch (error) {
      console.error(
        "Erro ao atualizar a cor de Texto do Nivel do usuário no servidor:",
        error
      );
    }
  };
  return (
    <div className="w-100 my-1">
      <Form className="">
        <InputGroup style={{ margin: "auto" }}>
          <InputGroup.Text className="w-50">
            Cor do TextoNivel:{" "}
          </InputGroup.Text>

          <Form.Control
            type="color"
            id="corTextoNivel"
            value={corTextoNivelAtual}
            title={"Selecione a Cor de Texto do Nivel "}
            onChange={handleTrocaCorTextoNivel}
          />
        </InputGroup>
      </Form>
    </div>
  );
}

export default TrocaCorTextoNivel;
