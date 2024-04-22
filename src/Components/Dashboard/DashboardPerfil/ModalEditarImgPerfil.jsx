import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import MyEditor from "./AvatarEditor";
import { fb } from "../../../shared/service/firebase";
import { useAuth } from "./../../../hook/authUser";

function ModalEditarImgPerfil({ show, setShowImg, perfil }) {
  const { authUser } = useAuth();
  const id = authUser?.uid;
  console.log("id :>> ", id);
  const handleCloseImg = () => {
    setShowImg(false);
    setPerfilImgNovo(null); // Limpar a imagem selecionada
  };
  const [perfilImgNovo, setPerfilImgNovo] = useState("");
  const imgAdd = () => (perfilImgNovo ? perfilImgNovo : perfil); // eslint-disable-next-line
  const [uploadProgress, setUploadProgress] = useState(0); // Para mostrar o progresso do upload

  // Função para manipular a seleção de arquivo
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Obtenha o primeiro arquivo selecionado pelo usuário
    setPerfilImgNovo(file); // Armazene o arquivo selecionado no estado
  };

  // Função para enviar o arquivo para o Firebase Storage
  const uploadFile = () => {
    if (perfilImgNovo) {
      const uid = id; // Substitua 'uid_do_usuario' pelo UID real do usuário
      const storageRef = fb?.storage.ref(
        `images/usuarios/${uid}/${perfilImgNovo.name}`
      );
      const uploadTask = storageRef.put(perfilImgNovo); // Crie uma referência para o local onde deseja armazenar o arquivo no Firebase Storage
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Obtenha o progresso do upload e atualize o estado
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          // Trate erros de upload, se houver
          console.error("Error uploading file: ", error);
        },
        async () => {
          // Se o upload for bem-sucedido, faça o que for necessário, como fechar o modal
          console.log("File uploaded successfully!");
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

          // Atualizar a photoURL do usuário
          await authUser.updateProfile({
            photoURL: downloadURL,
          });
          await fb?.firestore
            .collection("UserStats")
            .doc(id)
            .update({ imagemPerfil: downloadURL });

          handleCloseImg();
        }
      );
    }
  };

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
        <Form.Control
          type="file"
          onChange={handleFileChange}
          //   onChange={(e) => setPerfilImgNovo(e.target.value)}
        />
        {perfilImgNovo && <p>Arquivo selecionado: {perfilImgNovo.name}</p>}
        <MyEditor perfil={imgAdd()} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseImg}>
          Close
        </Button>
        <Button variant="primary" onClick={uploadFile}>
          Carregar Imagem
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditarImgPerfil;
