import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../hook";
import { fb } from "../../shared/service";
import { useNavigate } from "react-router-dom";

function BloquearUsuario() {
  const { authUser } = useAuth();
  const [isBlocked, setIsBlocked] = useState(false);
  const navigate = useNavigate();

  const handleBlockUser = async () => {
    try {
      await fb?.firestore.collection("UserStats").doc(authUser?.uid).update({
        isBlocked: true,
      });
      setIsBlocked(true);
      alert("Conta bloqueada com sucesso.");
      fb?.auth.signOut().then(() => {
        // Redirecionar o usuário após logout (exemplo com React Router)
        navigate("/");
      });
    } catch (error) {
      console.error("Erro ao bloquear a conta:", error);
      alert("Ocorreu um erro ao bloquear a conta." + error);
    }
  };
  const handleUnblockUser = async () => {
    try {
      await fb?.firestore.collection("UserStats").doc(authUser?.uid).update({
        isBlocked: false,
      });
      alert("Conta desbloqueada com sucesso.");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao desbloquear a conta:", error);
      alert("Ocorreu um erro ao desbloquear a conta.");
    }
  };
  return (
    <Button onClick={isBlocked ? handleUnblockUser : handleBlockUser}>
      {isBlocked ? "Conta Bloqueada" : "Bloquear Conta"}
    </Button>
  );
}

export default BloquearUsuario;
