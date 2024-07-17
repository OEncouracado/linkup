import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";
import { useLightMode } from "../../Dashboard/LightModeContext";

function TrocaCorLink({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];
  const { isLightMode } = useLightMode();
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
  return (
    <div className="w-100 my-1">
      <Form className="" >
        <InputGroup style={{ margin: "auto", backgroundColor: "transparent" }}>
          <InputGroup.Text className={`w-50 ${isLightMode ? "text-dark" : "text-light"}`} style={{ backgroundColor: "transparent" }}>Cor do Botao: </InputGroup.Text>

          <Form.Control
            style={{ backgroundColor: "transparent" }}
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
