import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { UserCss } from "../../../hook";
import { fb } from "../../../shared/service";

function TrocarRaiodaBorda({ userId }) {
    const cssArray = UserCss(userId);
    const css = cssArray && cssArray[0];

    const raiodaBordaAtual = css?.raiodaBorda;
    const [newraiodaBorda, setNewraiodaBorda] = useState("");
    const handleTrocaraiodaBorda = async (e) => {
        setNewraiodaBorda(e.target.value);
        try {
            await fb?.firestore
                .collection("UserCss")
                .doc(userId)
                .update({ raiodaBorda: newraiodaBorda });
        } catch (error) {
            console.error(
                "Erro ao atualizar a cor de Texto do UserName do usuário no servidor:",
                error
            );
        }
    };

    console.log("troca de cor de TextoUserName ", raiodaBordaAtual);
    return (
        <div className="w-100 my-1">
            <Form className="">
                <Form.Group className="d-flex" style={{ margin: "auto", padding: ".6rem", backgroundColor: "#f8f8ff",border: "0.1rem solid #DEE2E6", borderRadius: "0.4rem"}}>
                    {/* <InputGroup.Text className="w-50">
                        Cor do TextoUserName:{" "}
                    </InputGroup.Text> */}
                    <Form.Label className='perfilImgZoomRangeLabel m-0 w-25'>Raio da Borda ({raiodaBordaAtual}):</Form.Label>

                    <Form.Range
                        className="w-75"
                        step={0.1}
                        defaultValue={0.0}
                        min={0.0}
                        max={2.0}
                        id="raiodaBorda"
                        value={raiodaBordaAtual}
                        onChange={handleTrocaraiodaBorda}
                    />
                </Form.Group>
            </Form>
        </div >
    );
}


export default TrocarRaiodaBorda
