// Components/Modais/PasswordChangeModal.js
import React, { useState } from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { useAuth } from "../../hook";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { Eye, EyeSlash } from 'react-bootstrap-icons';

function PasswordChangeModal({ show, onClose }) {
    const { authUser } = useAuth();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mostrarOldPassword, setMostrarOldPassword] = useState(false);
    const [mostrarNewPassword, setMostrarNewPassword] = useState(false);
    const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);

    const handleEye = (campo) => {
        if (campo === 'oldSenha') {
            setMostrarOldPassword(!mostrarOldPassword);
        } else if (campo === 'newSenha') {
            setMostrarNewPassword(!mostrarNewPassword);
        } else if (campo === 'confirmSenha') {
            setMostrarConfirmPassword(!mostrarConfirmPassword);
        }
    };
    const handlePasswordChange = async (e) => {
        e.preventDefault();

        // Verificar se a nova senha e a confirmação da nova senha coincidem
        if (newPassword !== confirmPassword) {
            alert("A nova senha e a confirmação da nova senha não coincidem.");
            return;
        }

        // Reautenticar o usuário com a senha antiga
        try {
            const credential = EmailAuthProvider.credential(authUser?.email, oldPassword);
            await reauthenticateWithCredential(authUser, credential);

            // Atualizar a senha
            await authUser.updatePassword(newPassword);
            alert("Senha atualizada com sucesso!");
            handleClose();
        } catch (error) {
            alert("Erro ao atualizar a senha: " + error.message);
        }
    };

    const handleClose = () => {
        setConfirmPassword("");
        setNewPassword("");
        setOldPassword("");
        setMostrarConfirmPassword(false);
        setMostrarNewPassword(false);
        setMostrarOldPassword(false);
        onClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header style={{ borderBottom: "none" }} closeButton>
                <Modal.Title>Troca de Senha</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handlePasswordChange}>
                    <Form.Group controlId="formOldPassword">
                        <Form.Label>Senha Antiga</Form.Label>
                        <InputGroup><Form.Control
                            type={mostrarOldPassword ? "text" : "password"}
                            placeholder="Digite a senha antiga"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                            <InputGroup.Text
                                onClick={() => handleEye('oldSenha')}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: 'white',
                                }}
                            >
                                {mostrarOldPassword ? <Eye /> : <EyeSlash />}
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formNewPassword" className="mt-3">
                        <Form.Label>Nova Senha</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={mostrarNewPassword ? "text" : "password"}
                                placeholder="Digite a nova senha"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <InputGroup.Text
                                onClick={() => handleEye('newSenha')}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: 'white',
                                }}
                            >
                                {mostrarNewPassword ? <Eye /> : <EyeSlash />}
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword" className="mt-3">
                        <Form.Label>Confirme a Nova Senha</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={mostrarConfirmPassword ? "text" : "password"}
                                placeholder="Confirme a nova senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                isInvalid={newPassword !== confirmPassword}
                            />
                            <InputGroup.Text
                                onClick={() => handleEye('confirmSenha')}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: 'white',
                                }}
                            >
                                {mostrarConfirmPassword ? <Eye /> : <EyeSlash />}
                            </InputGroup.Text>
                            <Form.Control.Feedback type="invalid">
                                As senhas não coincidem.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-4">
                        Atualizar Senha
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default PasswordChangeModal;
