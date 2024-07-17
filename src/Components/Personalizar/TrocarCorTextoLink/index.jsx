import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";
import { useLightMode } from "../../Dashboard/LightModeContext";

function TrocaCorTextoBotao({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];
  const { isLightMode } = useLightMode();
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
  return (
    <div className="w-100 my-1">
      <Form className="">
        <InputGroup style={{ margin: "auto", backgroundColor: "transparent" }}>
          <InputGroup.Text className={`w-50 ${isLightMode ? "text-dark" : "text-light"}`} style={{ backgroundColor: "transparent" }}>
            Cor do TextoBotao:{" "}
          </InputGroup.Text>

          <Form.Control
            style={{ backgroundColor: "transparent" }}
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
