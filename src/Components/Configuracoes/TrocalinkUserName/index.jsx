import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { UserInfo, useAuth } from '../../../hook';
import { fb } from '../../../shared/service';
import { useLightMode } from '../../Dashboard/LightModeContext';

function TrocalinkUserName() {
    const { isLightMode } = useLightMode();
    const { authUser } = useAuth();
    const userArray = UserInfo(authUser?.uid);
    const stats = userArray && userArray[0];
    const linkUserNameAtual = stats?.linkUserName;
    const [linkUserName, setlinkUserName] = useState(linkUserNameAtual);
    const [usernameValido, setUsernameValido] = useState(false);

    useEffect(() => {
        if (linkUserNameAtual) {
            setlinkUserName(linkUserNameAtual);
        }
    }, [linkUserNameAtual]);

    const verificarUsername = async (username) => {
        try {
            const userNamesRef = fb.firestore.collection('linkUserNames');
            const snapshot = await userNamesRef
                .where('linkUserNames', 'array-contains', username.toLowerCase())
                .get();

            if (snapshot.empty) {
                // O displayName não está em uso
                setUsernameValido(true);
            } else {
                // O displayName já está em uso
                setUsernameValido(false);
            }
        } catch (error) {
            console.error("Erro ao verificar o displayName:", error);
            throw error; // Você pode tratar o erro de acordo com sua lógica de tratamento de erros
        }
    };

    const handlelinkUserName = async (linkUserName) => {
        try {
            const lowerCaseUserName = linkUserName.toLowerCase();

            await fb?.firestore.collection("UserCss").doc(authUser.uid).update({ linkUserName: lowerCaseUserName });
            await fb?.firestore.collection("linkPages").doc(authUser.uid).update({ linkUserName: lowerCaseUserName });
            await fb?.firestore.collection("UserStats").doc(authUser.uid).update({ linkUserName: lowerCaseUserName });

            const linkUserNamesRef = fb?.firestore.collection("linkUserNames").doc("sHG2pavwu4O22AWIw0mU");
            const doc = await linkUserNamesRef.get();
            const linkUserNamesArray = doc.data().linkUserNames || [];
            const updatedlinkUserNamesArray = linkUserNamesArray.map(u => u === linkUserNameAtual.toLowerCase() ? lowerCaseUserName : u);

            await linkUserNamesRef.update({ linkUserNames: updatedlinkUserNamesArray });

            alert("Nome Alterado para " + linkUserName);
        } catch (error) {
            alert("Erro ao atualizar o displayName:" + error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handlelinkUserName(linkUserName);
        setlinkUserName('');
    };

    const handleBlur = () => {
        if (!linkUserName) {
            setlinkUserName(linkUserNameAtual);
        }
    };

    return (
        <Container className='mt-1'>
            <Form onSubmit={handleSubmit} className='d-flex flex-row align-items-center'>
                <Form.Group className="w-100" style={{ backgroundColor: "transparent" }}>
                    <Form.Control
                        style={{ backgroundColor: "transparent" }}
                        className={isLightMode ? "text-dark" : "text-light"}
                        type="text"
                        value={linkUserName}
                        onChange={(e) => { setlinkUserName(e.target.value.toLowerCase()); verificarUsername(e.target.value.toLowerCase()); }}
                        isInvalid={!usernameValido || !linkUserName}
                        isValid={usernameValido}
                        onBlur={handleBlur}
                    />
                    {linkUserName ? (
                        <Form.Control.Feedback type="invalid">
                            Esse Usuário já está Cadastrado.
                        </Form.Control.Feedback>
                    ) : (
                        <Form.Control.Feedback type="invalid">
                            Digite um usuário.
                        </Form.Control.Feedback>
                    )}
                    <Form.Control.Feedback type="valid" />
                </Form.Group>
                {usernameValido ? (
                    <i className="iconShowEditUsername fa fa-check ms-2" onClick={handleSubmit} />
                ) : (
                    <i className="fas fa-ban ms-2" style={{ cursor: "no-drop" }} />
                )}
            </Form>
        </Container>
    );
}

export default TrocalinkUserName;
