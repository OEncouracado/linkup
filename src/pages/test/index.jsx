import React, { useState } from 'react'
import { Container, Form } from 'react-bootstrap';
import { useAuth } from '../../hook';

function Teste() {
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

            // Atualização do displayName bem-sucedida
            console.log("DisplayName atualizado com sucesso!");
            alert("Nome Alterado para " + username);
        } catch (error) {
            // Ocorreu um erro ao atualizar o displayName
            console.error("Erro ao atualizar o displayName:", error);
            alert(error)
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
        <Container style={{ marginTop: "25%" }}>
            <Form onSubmit={handleSubmit}>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={username}
                />
                <button type="submit">Atualizar Nome de Usuário</button>
            </Form>
        </Container>
    );
}

export default Teste
