import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";

function TrocaCorLink({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];

  const corBotaoAtual = css?.corBotao;
  const [newCorBotao, setNewCorBotao] = useState("");
  const handleTrocaCorLink = async (e) => {
    setNewCorBotao(e.target.value);
    try {
      await fb?.firestore
        .collection("UserCss")
        .doc(userId)
        .update({ corBotao: newCorBotao });
    } catch (error) {
      console.error(
        "Erro ao atualizar a cor de Botao do usuário no servidor:",
        error
      );
    }
  };

  console.log("troca de cor de Botao ", corBotaoAtual);
  return (
    <div className="w-50 my-1">
      <Form className="">
        <InputGroup className="w-75" style={{ margin: "auto" }}>
          <InputGroup.Text className="w-50">Cor do Botao: </InputGroup.Text>

          <Form.Control
            type="color"
            id="corBotao"
            value={corBotaoAtual}
            title={"Selecione a Cor de Botao "}
            onChange={handleTrocaCorLink}
          />
        </InputGroup>
      </Form>
    </div>
  );
}

export default TrocaCorLink;
