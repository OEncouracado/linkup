import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";
import { useLightMode } from "../../Dashboard/LightModeContext";

function TrocaCorFundo2({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];
  const { isLightMode } = useLightMode();
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

  return (
    <div className="w-100 my-1">
      <Form className="">
        <InputGroup style={{ margin: "auto", backgroundColor: "transparent" }}>
          <InputGroup.Text className={`w-50 ${isLightMode ? "text-dark" : "text-light"}`} style={{ backgroundColor: "transparent" }}>Cor do Fundo: </InputGroup.Text>
          <Form.Control
            style={{ backgroundColor: "transparent" }}
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
