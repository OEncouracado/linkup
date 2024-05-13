import React from "react";
import { Button, Modal } from "react-bootstrap";

function VIPModal({ show, onClose, mensagem }) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Assine o VIP</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <p>{mensagem}</p>
                <img
                    className="w-50"
                    src="https://www.vipbrtelecom.com.br/_next/static/images/logo-9b15102ecdc39560f2d3371b1c9ec1b3.svg"
                    alt="VIP"
                />
                <p>Assine agora para aproveitar todos os benefícios!</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={onClose}>
                    Assinar VIP
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default VIPModal;
