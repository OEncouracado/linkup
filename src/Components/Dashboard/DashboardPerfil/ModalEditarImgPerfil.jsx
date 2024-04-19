import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import MyEditor from './AvatarEditor';
import MyDropzone from './Dropzone';

function ModalEditarImgPerfil({ show, setShowImg, perfil }) {
    const handleCloseImg = () => setShowImg(false);
    const [PerfilImgNovo, setPerfilImgNovo] = useState('')
    const imgAdd = () => PerfilImgNovo ? PerfilImgNovo : perfil;
    console.log('imgAdd :>> ', imgAdd());

    return (
        <Modal
            basic
            show={show}
            onHide={handleCloseImg}
            centered
            closeButton
            dialogClassName="modal-60w"
        >

            <Modal.Header closeButton>
                <Modal.Title>Editar Imagem de Perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column">
                {/* <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                        </section>
                    )}
                </Dropzone> */}
                <MyDropzone />
                <Form.Control
                    type="file"
                    onChange={e => (setPerfilImgNovo(e.target.value))} />
                <MyEditor perfil={imgAdd()} />

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseImg}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCloseImg}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEditarImgPerfil
