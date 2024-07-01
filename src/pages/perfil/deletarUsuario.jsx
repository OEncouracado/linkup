import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fb } from '../../shared/service';
import { useAuth } from '../../hook';

function DeletarUsuario() {
    const { authUser } = useAuth();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleDeleteAccount = async () => {
        try {
            const user = fb.auth().currentUser;
            const credential = fb.auth.EmailAuthProvider.credential(user.email, senha);

            // Reautenticar o usuário
            await user.reauthenticateWithCredential(credential);

            // Deletar documentos no Firestore
            const batch = fb.firestore().batch();
            const userRef = fb.firestore().collection('users').doc(user.uid);
            const userStatsRef = fb.firestore().collection('UserStats').doc(user.uid);
            const userCssRef = fb.firestore().collection('UserCss').doc(user.uid);
            const linkPagesRef = fb.firestore().collection('linkPages').doc(user.uid);

            batch.delete(userRef);
            batch.delete(userStatsRef);
            batch.delete(userCssRef);
            batch.delete(linkPagesRef);

            await batch.commit();

            // Deletar o usuário da autenticação
            await user.delete();

            navigate('/signup');
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
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
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
