import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";
import { useLightMode } from "../../Dashboard/LightModeContext";

function Trocarfonte({ userId }) {
  const { isLightMode } = useLightMode();
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];

  const fonteAtual = css?.fonte;
  const [newfonte, setNewfonte] = useState(fonteAtual);

  const handleTrocafonte = async (e) => {
    const selectedfonte = e.target.value;
    setNewfonte(selectedfonte);
    try {
      await fb?.firestore
        .collection("UserCss")
        .doc(userId)
        .update({ fonte: selectedfonte });
    } catch (error) {
      console.error(
        "Erro ao atualizar o estilo de fonte do usuário no servidor:",
        error
      );
    }
  };

  // Objeto com opções de fontes
  const fonteOptions = {
    "Arial": "Arial, sans-serif",
    "Roboto": "'Roboto', sans-serif",
    "Verdana": "Verdana, sans-serif",
    "Times New Roman": "Times New Roman, serif",
    "Courier New": "Courier New, monospace",
    "Georgia": "Georgia, serif",
    "Palatino": "Palatino, serif",
    "Garamond": "Garamond, serif",
    "Comic Sans MS": "Comic Sans MS, sans-serif",
    "Trebuchet MS": "Trebuchet MS, sans-serif",
    "Arial Black": "Arial Black, sans-serif",
    "Impact": "Impact, sans-serif"
  };

  return (
    <div className="w-100 my-1">
      <Form className="">
        <InputGroup style={{ margin: "auto" }}>
          <InputGroup.Text style={{ backgroundColor: "transparent" }} className={`w-25 ${isLightMode ? "text-dark" : "text-light"}`}>Fonte:</InputGroup.Text>
          <Form.Select style={{ backgroundColor: "transparent" }} className={`w-25 ${isLightMode ? "text-dark" : "text-light"}`} value={newfonte} onChange={handleTrocafonte}>
            {Object.keys(fonteOptions).map((label) => (
              <option className={isLightMode ? "bg-light text-dark" : "bg-dark text-light"} key={fonteOptions[label]} value={fonteOptions[label]}>
                {label}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
      </Form>
    </div>
  );
}

export default Trocarfonte;
