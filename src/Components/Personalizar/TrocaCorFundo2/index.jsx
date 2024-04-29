import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";

function TrocaCorFundo2({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];

  const corFundo2Atual = css?.corFundo2;
  const [newCorFundo2, setNewCorFundo2] = useState("");
  const handleTrocaCorFundo2 = async (e) => {
    setNewCorFundo2(e.target.value);
    try {
      await fb?.firestore
        .collection("UserCss")
        .doc(userId)
        .update({ corFundo2: newCorFundo2 });
    } catch (error) {
      console.error(
        "Erro ao atualizar a cor de fundo do usuário no servidor:",
        error
      );
    }
  };

  console.log("troca de cor de fundo ", corFundo2Atual);
  return (
    <div className="w-100 my-1">
      <Form className="">
        <InputGroup style={{ margin: "auto" }}>
          <InputGroup.Text className="w-50">Cor do Fundo: </InputGroup.Text>
          <Form.Control
            type="color"
            id="corFundo2"
            value={corFundo2Atual}
            title={"Selecione a Cor de Fundo "}
            onChange={handleTrocaCorFundo2}
          />
        </InputGroup>
      </Form>
    </div>
  );
}

export default TrocaCorFundo2;
