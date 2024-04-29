import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";

function TrocaCorFundo({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];

  const corFundoAtual = css?.corFundo;
  const [newCorFundo, setNewCorFundo] = useState("");
  const handleTrocaCorFundo = async (e) => {
    setNewCorFundo(e.target.value);
    try {
      await fb?.firestore
        .collection("UserCss")
        .doc(userId)
        .update({ corFundo: newCorFundo });
    } catch (error) {
      console.error(
        "Erro ao atualizar a cor de fundo do usuário no servidor:",
        error
      );
    }
  };

  console.log("troca de cor de fundo ", corFundoAtual);
  return (
    <div className="w-100 my-1">
      <Form className="">
        <InputGroup style={{ margin: "auto" }}>
          <InputGroup.Text className="w-50">Cor do Fundo: </InputGroup.Text>
          <Form.Control
            type="color"
            id="corFundo"
            value={corFundoAtual}
            title={"Selecione a Cor de Fundo "}
            onChange={handleTrocaCorFundo}
          />
        </InputGroup>
      </Form>
    </div>
  );
}

export default TrocaCorFundo;
