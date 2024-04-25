import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";

function TrocaFundoUserName({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];

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

  console.log("troca de cor de fundo ", fundoUserNameAtual);
  return (
    <div className="w-100 my-1">
      <Form className="">
        <InputGroup style={{ margin: "auto" }}>
          <InputGroup.Text className="w-50">Cor de Fundo do Username: </InputGroup.Text>

          <Form.Control
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
