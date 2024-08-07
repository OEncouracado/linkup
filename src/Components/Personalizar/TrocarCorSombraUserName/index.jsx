import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";
import { useLightMode } from "../../Dashboard/LightModeContext";

function TrocaCorSombraUserName({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];
  const { isLightMode } = useLightMode();
  const corSombraUserNameAtual = css?.corSombraUserName;
  const [newcorSombraUserName, setNewcorSombraUserName] = useState("");
  const handleTrocaCorSombraUserName = async (e) => {
    setNewcorSombraUserName(e.target.value);
    try {
      await fb?.firestore
        .collection("UserCss")
        .doc(userId)
        .update({ corSombraUserName: newcorSombraUserName });
    } catch (error) {
      console.error(
        "Erro ao atualizar a cor de SombraBotao do usuário no servidor:",
        error
      );
    }
  };
  return (
    <div className="w-100 my-1">
      <Form className="">
        <InputGroup style={{ margin: "auto", backgroundColor: "transparent" }}>
          <InputGroup.Text className={`w-50 ${isLightMode ? "text-dark" : "text-light"}`} style={{ backgroundColor: "transparent" }}>
            Cor da Sombra do UserName:{" "}
          </InputGroup.Text>

          <Form.Control
            style={{ backgroundColor: "transparent" }}
            type="color"
            id="corSombraUserName"
            value={corSombraUserNameAtual}
            title={"Selecione a Cor de SombraBotao "}
            onChange={handleTrocaCorSombraUserName}
          />
        </InputGroup>
      </Form>
    </div>
  );
}

export default TrocaCorSombraUserName;
