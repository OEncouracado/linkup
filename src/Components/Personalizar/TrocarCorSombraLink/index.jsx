import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";

function TrocaCorSombraLink({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];

  const corSombraBotaoAtual = css?.corSombraBotao;
  const [newCorSombraBotao, setNewCorSombraBotao] = useState("");
  const handleTrocaCorSombraLink = async (e) => {
    setNewCorSombraBotao(e.target.value);
    try {
      await fb?.firestore
        .collection("UserCss")
        .doc(userId)
        .update({ corSombraBotao: newCorSombraBotao });
    } catch (error) {
      console.error(
        "Erro ao atualizar a cor de SombraBotao do usuário no servidor:",
        error
      );
    }
  };

  console.log("troca de cor de SombraBotao ", corSombraBotaoAtual);
  return (
    <div className="w-75 my-1">
      <Form className="">
        <InputGroup className="w-75" style={{ margin: "auto" }}>
          <InputGroup.Text className="w-50">
            Cor da Sombra do Botao:{" "}
          </InputGroup.Text>

          <Form.Control
            type="color"
            id="corSombraBotao"
            value={corSombraBotaoAtual}
            title={"Selecione a Cor de SombraBotao "}
            onChange={handleTrocaCorSombraLink}
          />
        </InputGroup>
      </Form>
    </div>
  );
}

export default TrocaCorSombraLink;
