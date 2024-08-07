import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";
import { useLightMode } from "../../Dashboard/LightModeContext";

function TrocaCorTextoUserName({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];
  const { isLightMode } = useLightMode();
  const corTextoUserNameAtual = css?.corTextoUserName;
  const [newCorTextoUserName, setNewCorTextoUserName] = useState("");
  const handleTrocaCorTextoUserName = async (e) => {
    setNewCorTextoUserName(e.target.value);
    try {
      await fb?.firestore
        .collection("UserCss")
        .doc(userId)
        .update({ corTextoUserName: newCorTextoUserName });
    } catch (error) {
      console.error(
        "Erro ao atualizar a cor de Texto do UserName do usuário no servidor:",
        error
      );
    }
  };
  return (
    <div className="w-100 my-1">
      <Form className="">
        <InputGroup style={{ margin: "auto", backgroundColor: "transparent" }}>
          <InputGroup.Text className={`w-50 ${isLightMode ? "text-dark" : "text-light"}`} style={{ backgroundColor: "transparent" }}>
            Cor do TextoUserName:{" "}
          </InputGroup.Text>

          <Form.Control
            style={{ backgroundColor: "transparent" }}
            type="color"
            id="corTextoUserName"
            value={corTextoUserNameAtual}
            title={"Selecione a Cor de Texto do UserName "}
            onChange={handleTrocaCorTextoUserName}
          />
        </InputGroup>
      </Form>
    </div>
  );
}

export default TrocaCorTextoUserName;
