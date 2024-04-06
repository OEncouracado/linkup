import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";

function TrocaCorTextoBotao({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];

  const corTextoBotaoAtual = css?.corTextoBotao;
  const [newCorTextoBotao, setNewCorTextoBotao] = useState("");
  const handleTrocaCorTextoBotao = async (e) => {
    setNewCorTextoBotao(e.target.value);
    try {
      await fb?.firestore
        .collection("UserCss")
        .doc(userId)
        .update({ corTextoBotao: newCorTextoBotao });
    } catch (error) {
      console.error(
        "Erro ao atualizar a cor de Texto do Botao do usuário no servidor:",
        error
      );
    }
  };

  console.log("troca de cor de TextoBotao ", corTextoBotaoAtual);
  return (
    <div className="w-75 my-1">
      <Form className="">
        <InputGroup className="w-75" style={{ margin: "auto" }}>
          <InputGroup.Text className="w-50">
            Cor do TextoBotao:{" "}
          </InputGroup.Text>

          <Form.Control
            type="color"
            id="corTextoBotao"
            value={corTextoBotaoAtual}
            title={"Selecione a Cor de Texto do Botao "}
            onChange={handleTrocaCorTextoBotao}
          />
        </InputGroup>
      </Form>
    </div>
  );
}

export default TrocaCorTextoBotao;
