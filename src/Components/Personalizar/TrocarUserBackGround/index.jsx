import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { fb } from "../../../shared/service/firebase";
import { UserInfo } from "../../../hook";
import { useLightMode } from "../../Dashboard/LightModeContext";
import "../../inputfile.css"

function TrocaruserBackGround({ userId }) {
  const id = userId;
  const statsArray = UserInfo(id);
  const stats = statsArray && statsArray[0];
  const VIP = stats?.VIP;
  const { isLightMode } = useLightMode();
  const [userBackGroundNovo, setuserBackGroundNovo] = useState(""); // eslint-disable-next-line
  const [uploadProgress, setUploadProgress] = useState(0); // Para mostrar o progresso do upload

  // Função para manipular a seleção de arquivo
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Obtenha o primeiro arquivo selecionado pelo usuário
    setuserBackGroundNovo(file); // Armazene o arquivo selecionado no estado
  };

  // Função para enviar o arquivo para o Firebase Storage
  const uploadFile = async () => {
    if (userBackGroundNovo) {
      const uid = id; // Substitua 'uid_do_usuario' pelo UID real do usuário
      const storageRefDel = fb?.storage.ref(`images/usuarios/${uid}/BG/`);
      const storageRef = fb?.storage.ref(
        `images/usuarios/${uid}/BG/${userBackGroundNovo.name}`
      );
      // Limpar todas as imagens da pasta
      await clearFolder(storageRefDel);

      const uploadTask = storageRef.put(userBackGroundNovo); // Crie uma referência para o local onde deseja armazenar o arquivo no Firebase Storage
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
          await fb?.firestore
            .collection("UserStats")
            .doc(id)
            .update({ userBackGround: downloadURL });
        }
      );
    }
  };

  const clearFolder = async (storageRefDel) => {
    try {
      const items = await storageRefDel.listAll();
      await Promise.all(items.items.map((item) => item.delete()));
    } catch (error) {
      console.error("Error clearing folder: ", error);
    }
  };

  const handleRemoverFundo = async () => {
    if (window.confirm("Tem certeza que deseja remover o fundo?")) {
      const storageRefDel = fb?.storage.ref(`images/usuarios/${id}/BG/`);
      await fb?.firestore
        .collection("UserStats")
        .doc(id)
        .update({ userBackGround: "" });
      await clearFolder(storageRefDel);
    }
  };


  return (
    <>
      {VIP ? (
        <div className="w-100 d-flex align-items-center">
          <Form.Control
            style={{ backgroundColor: "transparent" }}
            className={`formInput ${isLightMode ? "text-dark" : "text-light"}`}
            type="file"
            onChange={handleFileChange}
            onBlur={uploadFile}
          />
          <i
            className="fa fa-trash-o iconShowEditUsername ms-2"
            aria-hidden="true"
            onClick={handleRemoverFundo}
          />
        </div>
      ) : (
        <Form.Control type="file" disabled />
      )}
    </>
  );
}

export default TrocaruserBackGround;
