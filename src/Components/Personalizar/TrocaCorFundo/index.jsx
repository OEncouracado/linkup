import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";
import { useLightMode } from "../../Dashboard/LightModeContext";

function TrocaCorFundo({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];
  const { isLightMode } = useLightMode();
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

  return (
    <div className="w-100 my-1">
      <Form className="">
        <InputGroup style={{ margin: "auto", backgroundColor: "transparent" }}>
          <InputGroup.Text className={`w-50 ${isLightMode ? "text-dark" : "text-light"}`} style={{ backgroundColor: "transparent" }}>Cor do Fundo: </InputGroup.Text>
          <Form.Control
            style={{ backgroundColor: "transparent" }}
            className="w-50"
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
