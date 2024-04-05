import React, { useState } from 'react'
import { Container, Form } from 'react-bootstrap';
import { useAuth } from '../../hook';
import { fb } from '../../shared/service';

function TrocaUserName({ onShowChange }) {
    const { authUser } = useAuth();
    console.log("usuário ", authUser);
    const usernameAtual = authUser?.displayName;
    const [username, setUsername] = useState(usernameAtual);

    const handleUsername = async (username) => {
        try {
            // Obtenha o usuário atualmente autenticado

            // Faça a atualização do displayName
            await authUser.updateProfile({
                displayName: username
            });
            await fb?.firestore.collection("UserCss").doc(authUser.uid).update({ username: username });
            await fb?.firestore.collection("linkPages").doc(authUser.uid).update({ username: username });
            await fb?.firestore.collection("UserStats").doc(authUser.uid).update({ username: username });

            // Atualiza o documento na coleção "UserNames"
            const userNamesRef = fb?.firestore.collection("UserNames").doc("FhD7GGxd24OzH9iH2HzS");

            // Obtém o array "usernames" do documento
            const doc = await userNamesRef.get();
            const usernamesArray = doc.data().usernames || [];

            // Encontra e atualiza o username no array (se necessário)
            const updatedUsernamesArray = usernamesArray.map(u => u === usernameAtual ? username : u);

            // Atualiza o array "usernames" no documento
            await userNamesRef.update({ usernames: updatedUsernamesArray });

            // Atualização do displayName bem-sucedida
            console.log("DisplayName atualizado com sucesso!");
            alert("Nome Alterado para " + username);
            onShowChange(false)
        } catch (error) {
            // Ocorreu um erro ao atualizar o displayName
            console.error("Erro ao atualizar o displayName:", error);
            alert(error);
            onShowChange(false)
        }
    };

    // Componente React que contém um formulário para atualizar o displayName


    // Manipulador para enviar o formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleUsername(username);
        // Limpar o campo do formulário após a atualização
        setUsername('');
    };

    return (
        <Container className='mt-1'>
            <Form onSubmit={handleSubmit} className='d-flex flex-row align-items-center'>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={usernameAtual}
                />
                <i className="iconShowEditUsername fa fa-check ms-2" onClick={handleSubmit}></i>
            </Form>
        </Container>
    );
}

export default TrocaUserName
