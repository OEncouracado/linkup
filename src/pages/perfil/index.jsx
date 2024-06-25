import React, { useState } from "react";
import "./style.css";
import { UserInfo, useAuth } from "../../hook";
import { useNavigate } from "react-router-dom";
import VIPModal from "./../../Components/Modais/VIPmodal";
import DashboardNivel from "./../../Components/Dashboard/DashboardNivel/index";
import PerfilRank from "./PerfilRank";
import { Form, Button, Col, Row } from "react-bootstrap";

function UserProfile() {
  const { authUser } = useAuth();
  console.log("authUser.phoneNumber :>> ", authUser?.phoneNumber);
  const id = authUser?.uid;
  const navigate = useNavigate();
  const infoArray = UserInfo(id);
  const stats = infoArray && infoArray[0];
  const [showModal, setShowModal] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const phoneNumberAtual = authUser?.phoneNumber;
  const [phoneNumero, setPhoneNumero] = useState(phoneNumberAtual);

  const closeModal = () => {
    setMensagem("");
    setShowModal(false);
  };

  const handleShowModal = () => {
    setMensagem("Conheça os benefícios do VIP");
    setShowModal(true);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumero(e.target.value);
  };

  const handlePhoneNumberUpdate = async () => {
    try {
      // Obtenha o usuário atualmente autenticado
      // Faça a atualização do displayName
      await authUser?.updateProfile({
        phoneNumber: phoneNumero,
      });
      alert("Número de telefone atualizado com sucesso!");
    } catch (error) {
      // Ocorreu um erro ao atualizar o número de telefone
      console.error("Erro ao atualizar o Telefone:", error);
      alert(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handlePhoneNumberUpdate();
    // Limpar o campo do formulário após a atualização
    setPhoneNumero('');
  };

  return (
    <>
      <i
        className="iconShowEditUsername fa fa-arrow-left m-2"
        aria-hidden="true"
        title="Voltar"
        onClick={() => navigate(-1)}
      ></i>
      <div className="container rounded bg-dark text-light mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center px-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                alt=""
                src={authUser?.photoURL}
              />
              <span>
                <i className="fa fa-pencil me-3 editIconPerfil" aria-hidden="true" />{" "}
                <i className="fa fa-trash deleteIconPerfil" aria-hidden="true" />
              </span>
              <span className="font-weight-bold">{authUser?.displayName}</span>
              <span className="text-white-50">{authUser?.email}</span>
              <DashboardNivel xp={stats?.xp} />
              <PerfilRank rank={stats?.rank} />
            </div>
          </div>
          <div className="col-md-7 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Perfil de Usuário</h4>
              </div>
              <Form onSubmit={handleSubmit}>
                <Row className="mt-2">
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nome"
                        value={authUser?.displayName}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Número</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="(00) 9 0000-0000"
                        defaultValue={phoneNumberAtual}
                        value={phoneNumero}
                        onChange={handlePhoneNumberChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control
                        disabled
                        type="text"
                        placeholder="enter email id"
                        title={
                          authUser?.emailVerified
                            ? "Não é possível alterar o E-mail"
                            : "Email não verificado"
                        }
                        value={authUser?.email}
                        isInvalid={!authUser?.emailVerified}
                        isValid={authUser?.emailVerified}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status VIP:</Form.Label>
                      <Form.Control
                        readOnly
                        onClick={stats?.VIP ? null : handleShowModal}
                        className="form-control clickable-text"
                        value={
                          stats?.VIP
                            ? "Ativo"
                            : "Inativo. Clique aqui para saber mais"
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="mt-5 text-center">
                  <Button type="submit" className="btn btn-primary profile-button">
                    Salvar
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <VIPModal show={showModal} onClose={closeModal} mensagem={mensagem} />
    </>
  );
}

export default UserProfile;
