import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";
import { useLightMode } from "../../Dashboard/LightModeContext";

function TrocaFundoUserName({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];
  const { isLightMode } = useLightMode();
  const fundoUserNameAtual = css?.fundoUserName;
  const [newfundoUserName, setNewfundoUserName] = useState("");
  const handleTrocafundoUserName = async (e) => {
    setNewfundoUserName(e.target.value);
    try {
      await fb?.firestore
        .collection("UserCss")
        .doc(userId)
        .update({ fundoUserName: newfundoUserName });
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
          <InputGroup.Text className={`w-50 ${isLightMode ? "text-dark" : "text-light"}`} style={{ backgroundColor: "transparent" }}>Cor de Fundo do Username: </InputGroup.Text>

          <Form.Control
            style={{ backgroundColor: "transparent" }}
            type="color"
            id="fundoUserName"
            value={fundoUserNameAtual}
            title={"Selecione a Cor de Fundo do Username"}
            onChange={handleTrocafundoUserName}
          />
        </InputGroup>
      </Form>
    </div>
  );
}

export default TrocaFundoUserName;
