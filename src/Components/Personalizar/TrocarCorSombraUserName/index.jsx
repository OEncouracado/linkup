import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";

function TrocaCorSombraUserName({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];

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

  console.log("troca de cor de SombraBotao ", corSombraUserNameAtual);
  return (
    <div className="w-100 my-1">
      <Form className="">
        <InputGroup style={{ margin: "auto" }}>
          <InputGroup.Text className="w-50">
            Cor da Sombra do UserName:{" "}
          </InputGroup.Text>

          <Form.Control
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
