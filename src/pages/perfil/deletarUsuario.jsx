import React, { useState } from 'react';
import { Button, Modal, Form, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fb } from '../../shared/service';
import { UserInfo, useAuth } from '../../hook';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

function DeletarUsuario() {
    const { authUser } = useAuth();
    const userArray = UserInfo(authUser?.uid);
    const stats = userArray && userArray[0];
    const linkUserNameAtual = stats?.linkUserName;
    const usernameAtual = stats?.username;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        setSenha('');
        setErro('');
        setMostrarPassword(false);
    };
    const handleShow = () => setShowModal(true);

    const handleEye = (campo) => {
        if (campo === 'oldSenha') {
            setMostrarPassword(!mostrarPassword);
        };
    };



    const handleDeleteAccount = async () => {
        try {
            const credential = EmailAuthProvider?.credential(authUser?.email, senha);
            // Reautenticar o usuário
            await reauthenticateWithCredential(authUser, credential)

            const linkUserNamesRef = fb?.firestore.collection("linkUserNames").doc("sHG2pavwu4O22AWIw0mU");
            const userNamesRef = fb?.firestore.collection("UserNames").doc("FhD7GGxd24OzH9iH2HzS");

            // Remove linkUserNameAtual e usernameAtual dos arrays
            await fb?.firestore.runTransaction(async (transaction) => {
                const linkUserNamesDoc = await transaction.get(linkUserNamesRef);
                const userNamesDoc = await transaction.get(userNamesRef);

                if (!linkUserNamesDoc.exists || !userNamesDoc.exists) {
                    throw new Error("Documentos não encontrados!");
                }

                const linkUserNamesArray = linkUserNamesDoc.data().linkUserNames || [];
                const usernamesArray = userNamesDoc.data().usernames || [];

                const newLinkUserNamesArray = linkUserNamesArray.filter(name => name !== linkUserNameAtual);
                const newUsernamesArray = usernamesArray.filter(name => name !== usernameAtual);

                transaction.update(linkUserNamesRef, { linkUserNames: newLinkUserNamesArray });
                transaction.update(userNamesRef, { usernames: newUsernamesArray });
            });

            // Deletar documentos no Firestore
            const batch = fb?.firestore.batch();
            const userStatsRef = fb?.firestore.collection('UserStats').doc(authUser?.uid);
            const userCssRef = fb?.firestore.collection('UserCss').doc(authUser?.uid);
            const linkPagesRef = fb?.firestore.collection('linkPages').doc(authUser?.uid);

            batch.delete(userStatsRef);
            batch.delete(userCssRef);
            batch.delete(linkPagesRef);

            await batch.commit();

            // Deletar o usuário da autenticação
            await authUser?.delete();

            navigate('/despedida');
        } catch (error) {
            console.error("Erro ao deletar a conta:", error);
            setErro('Erro ao deletar a conta. Verifique sua senha e tente novamente.');
        }
    };

    return (
        <>
            <Button className='mb-3' variant="outline-danger" onClick={handleShow}>
                Deletar Conta
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação de exclusão de Conta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="warning">
                        <p>
                            <strong>Atenção:</strong> Esta ação é permanente e não pode ser desfeita.
                            Todos os seus dados serão apagados permanentemente, incluindo suas estatísticas,
                            configurações e links.
                        </p>
                    </Alert>
                    <Form>
                        <Form.Group controlId="senha">
                            <Form.Label>Por favor, digite sua senha abaixo para confirmar a exclusão da conta.</Form.Label>
                            <InputGroup>
                            <Form.Control
                                    type={mostrarPassword ? "text" : "password"}
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                                <InputGroup.Text
                                    onClick={() => handleEye('oldSenha')}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: 'white',
                                    }}
                                >
                                    {mostrarPassword ? <Eye /> : <EyeSlash />}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    {erro && <Alert variant="danger" className="mt-3">{erro}</Alert>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteAccount}>
                        Confirmar Exclusão
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeletarUsuario;
