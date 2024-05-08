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
                <Form.Control
                    type="text"
                    value={linkUserName || linkUserNameAtual}
                    onChange={(e) => setlinkUserName(e.target.value)}
                    
                />
                <i className="iconShowEditUsername fa fa-check ms-2" onClick={handleSubmit}></i>
            </Form>
        </Container>
    );
}

export default TrocalinkUserName
