import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";
import { useLightMode } from "../../Dashboard/LightModeContext";

function TrocarborderStyle({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];
  const { isLightMode } = useLightMode();
  const borderStyleAtual = css?.borderStyle;
  const [newBorderStyle, setNewBorderStyle] = useState(borderStyleAtual);

  const handleTrocaborderStyle = async (e) => {
    const selectedBorderStyle = e.target.value;
    setNewBorderStyle(selectedBorderStyle);
    try {
      await fb?.firestore
        .collection("UserCss")
        .doc(userId)
        .update({ borderStyle: selectedBorderStyle });
    } catch (error) {
      console.error(
        "Erro ao atualizar o estilo de borda do usuário no servidor:",
        error
      );
    }
  };

  // Objeto com opções de borda em português
  const borderStyleOptions = {
    Nenhum: "none",
    "Linha sólida": "solid",
    "Linha tracejada": "dashed",
    Pontilhado: "dotted",
    "Linha dupla": "double",
    Sulco: "groove",
    Elevação: "ridge",
    Rebaixado: "inset",
    Elevado: "outset",
    Oculto: "hidden",
  };

  return (
    <div className="w-100 my-1">
      <Form className="">
        <InputGroup style={{ margin: "auto", backgroundColor: "transparent" }}>
          <InputGroup.Text className={`w-50 ${isLightMode ? "text-dark" : "text-light"}`} style={{ backgroundColor: "transparent" }}>Tipo de Borda:</InputGroup.Text>
          <Form.Select style={{ backgroundColor: "transparent" }} className={`w-25 ${isLightMode ? "text-dark" : "text-light"}`} value={newBorderStyle} onChange={handleTrocaborderStyle}>
            {Object.keys(borderStyleOptions).map((label) => (
              <option
                className={isLightMode ? "bg-light text-dark" : "bg-dark text-light"}
                key={borderStyleOptions[label]}
                value={borderStyleOptions[label]}
              >
                {label}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
      </Form>
    </div>
  );
}

export default TrocarborderStyle;
