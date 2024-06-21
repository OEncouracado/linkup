import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";

function TrocaborderColor({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];

  const borderColorAtual = css?.borderColor;
  const [newborderColor, setNewborderColor] = useState("");
  const handleTrocaborderColor = async (e) => {
    setNewborderColor(e.target.value);
    try {
      await fb?.firestore
        .collection("UserCss")
        .doc(userId)
        .update({ borderColor: newborderColor });
    } catch (error) {
      console.error(
        "Erro ao atualizar a cor da Borda do usuário no servidor:",
        error
      );
    }
  };
  return (
    <div className="w-100 my-1">
      <Form className="">
        <InputGroup style={{ margin: "auto" }}>
          <InputGroup.Text className="w-50">Cor da Borda: </InputGroup.Text>

          <Form.Control
            type="color"
            id="borderColor"
            value={borderColorAtual}
            title={"Selecione a Cor da Borda "}
            onChange={handleTrocaborderColor}
          />
        </InputGroup>
      </Form>
    </div>
  );
}

export default TrocaborderColor;
