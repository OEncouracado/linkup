import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";

function TrocarborderWith({ userId }) {
  const cssArray = UserCss(userId);
  const css = cssArray && cssArray[0];
  const borderWithAtual = css?.borderWith;
  const [newborderWith, setNewborderWith] = useState("");
  const handleTrocaborderWith = async (e) => {
    setNewborderWith(e.target.value);
    try {
      await fb?.firestore
        .collection("UserCss")
        .doc(userId)
        .update({ borderWith: newborderWith });
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
        <Form.Group
          className="d-flex"
          style={{
            margin: "auto",
            padding: ".6rem",
            backgroundColor: "transparent",
            border: "0.1rem solid #DEE2E6", 
            borderRadius: "0.4rem"
          }}
        >
          <Form.Label className="perfilImgZoomRangeLabel m-0 w-25">
            Espessura ({borderWithAtual}):
          </Form.Label>

          <Form.Range
            className="w-75"
            step={0.01}
            defaultValue={0.0}
            min={0.0}
            max={0.5}
            id="borderWith"
            value={borderWithAtual}
            onChange={handleTrocaborderWith}
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default TrocarborderWith;
