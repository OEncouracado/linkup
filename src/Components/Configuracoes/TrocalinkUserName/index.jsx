import React, { useState } from 'react'
import { Container, Form } from 'react-bootstrap';
import { UserInfo, useAuth } from '../../../hook';
import { fb } from '../../../shared/service';


function TrocalinkUserName() {
    const { authUser } = useAuth();
    const userArray = UserInfo(authUser?.uid);
    const stats = userArray && userArray[0];
    const linkUserNameAtual = stats?.linkUserName;
    const [linkUserName, setlinkUserName] = useState(linkUserNameAtual);
    const [usernameValido, setUsernameValido] = useState(false);

    const verificarUsername = async (username) => {
        try {
            const userNamesRef = fb.firestore.collection('linkUserNames');
            const snapshot = await userNamesRef.where('linkUserNames', 'array-contains', username).get();

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
            // Obtenha o usuário atualmente autenticado

            // Faça a atualização do displayName
            // await authUser.updateProfile({
            //     displayName: linkUserName
            // });
            await fb?.firestore.collection("UserCss").doc(authUser.uid).update({ linkUserName: linkUserName });
            await fb?.firestore.collection("linkPages").doc(authUser.uid).update({ linkUserName: linkUserName });
            await fb?.firestore.collection("UserStats").doc(authUser.uid).update({ linkUserName: linkUserName });

            // Atualiza o documento na coleção "linkUserNames"
            const linkUserNamesRef = fb?.firestore.collection("linkUserNames").doc("sHG2pavwu4O22AWIw0mU");

            // Obtém o array "linkUserNames" do documento
            const doc = await linkUserNamesRef.get();
            const linkUserNamesArray = doc.data().linkUserNames || [];

            // Encontra e atualiza o linkUserName no array (se necessário)
            const updatedlinkUserNamesArray = linkUserNamesArray.map(u => u === linkUserNameAtual ? linkUserName : u);

            // Atualiza o array "linkUserNames" no documento
            await linkUserNamesRef.update({ linkUserNames: updatedlinkUserNamesArray });

            // Atualização do displayName bem-sucedida
            alert("Nome Alterado para " + linkUserName);
        } catch (error) {
            // Ocorreu um erro ao atualizar o displayName
            alert("Erro ao atualizar o displayName:" + error);
        }
    };

    // Componente React que contém um formulário para atualizar o displayName


    // Manipulador para enviar o formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        await handlelinkUserName(linkUserName);
        // Limpar o campo do formulário após a atualização
        setlinkUserName('');
    };

    return (
        <Container className='mt-1'>
            <Form onSubmit={handleSubmit} className='d-flex flex-row align-items-center'>
                <Form.Group className="w-100">
                <Form.Control
                    type="text"
                    value={linkUserName || linkUserNameAtual}
                        onChange={(e) => { setlinkUserName(e.target.value); verificarUsername(e.target.value); }}
                        isInvalid={!usernameValido || !linkUserName}
                        isValid={usernameValido}
                />
                    {linkUserName ? (<Form.Control.Feedback type="invalid">
                        Esse Usuário já está Cadastrado.
                    </Form.Control.Feedback>) : (<Form.Control.Feedback type="invalid">
                        Digite um usuário.
                    </Form.Control.Feedback>)}
                    <Form.Control.Feedback type="valid" />
                </Form.Group>
                {usernameValido ? <i className="iconShowEditUsername fa fa-check ms-2" onClick={handleSubmit} /> : <i class="fas fa-ban ms-2" style={{ cursor: "no-drop" }} />}

            </Form>

        </Container>
    );
}

export default TrocalinkUserName
