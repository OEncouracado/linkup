import React, { useState } from "react";
import "./style.css";
import { UserInfo, useAuth } from "../../hook";
import { useNavigate } from "react-router-dom";
import VIPModal from "./../../Components/Modais/VIPmodal";
import DashboardNivel from "./../../Components/Dashboard/DashboardNivel/index";
import PerfilRank from "./PerfilRank";
import { Form, Button, Col, Row } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import br from "react-phone-number-input/locale/pt-BR";
import "react-phone-number-input/style.css";
import { RecaptchaVerifier, PhoneAuthProvider, updatePhoneNumber, sendEmailVerification } from "firebase/auth";
import PasswordChangeModal from "../../Components/Modais/PasswordChangeModal";

function UserProfile() {
  const { authUser } = useAuth();
  const id = authUser?.uid;
  const navigate = useNavigate();
  const infoArray = UserInfo(id);
  const stats = infoArray && infoArray[0];
  const [showModal, setShowModal] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const phoneNumberAtual = authUser?.phoneNumber;
  const [phoneNumero, setPhoneNumero] = useState(phoneNumberAtual);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);


  console.log('authUser :>> ', authUser);

  const closeModal = () => {
    setMensagem("");
    setShowModal(false);
  };

  const handleShowModal = () => {
    setMensagem("Conheça os benefícios do VIP");
    setShowModal(true);
  };

  const handleSendVerificationCode = async () => {
    try {
      const applicationVerifier = new RecaptchaVerifier('recaptcha-container', {}, authUser.auth);
      const provider = new PhoneAuthProvider(authUser.auth);
      const verificationId = await provider.verifyPhoneNumber(phoneNumero, applicationVerifier);
      setVerificationId(verificationId);
      setIsCodeSent(true);
      alert("Código de verificação enviado!");
    } catch (error) {
      console.error("Erro ao enviar o código de verificação:", error);
      alert(error.message);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await updatePhoneNumber(authUser, phoneCredential);
      alert("Número de telefone atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao verificar o código:", error);
      alert(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isCodeSent) {
      await handleSendVerificationCode();
    } else {
      await handleVerifyCode();
      setPhoneNumero('');
      setVerificationCode('');
      setIsCodeSent(false);
    }
  };

  const handleSendEmailVerification = async () => {
    try {
      await sendEmailVerification(authUser);
      alert(`Email de Verificação Enviado para ${authUser?.email}`);
    } catch (error) {
      alert("Erro ao enviar o Email de Verificação:", error.message);
    }
  }

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
                <i
                  className="fa fa-pencil me-3 editIconPerfil"
                  aria-hidden="true"
                />{" "}
                <i
                  className="fa fa-trash deleteIconPerfil"
                  aria-hidden="true"
                />
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
                  <Col md={8}>
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
                  <Col md={4}>
                    <Form.Group className="mb-3 d-flex flex-column">
                      <Form.Label>Senha</Form.Label>
                      <Button onClick={() => setShowPasswordModal(true)}>
                        Troque sua Senha
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Número</Form.Label>
                      <PhoneInput
                        labels={br}
                        defaultCountry="BR"
                        placeholder={phoneNumberAtual ? phoneNumberAtual : "(00) 9 0000-0000"}
                        value={phoneNumero}
                        onChange={setPhoneNumero}
                        onFocus={() => setPhoneNumero(phoneNumberAtual)}
                      />
                    </Form.Group>
                  </Col>
                  {isCodeSent && (
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Código de Verificação</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Insira o código de verificação"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  )}
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>E-mail</Form.Label>
                      {authUser?.emailVerified ? (<Form.Control
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
                      />) : (<Row className="">
                        <Col md={8}>
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
                        </Col>
                        <Col md={4}>
                            <Button type="button" onClick={handleSendEmailVerification}> Verificar E-Mail</Button>
                        </Col>
                      </Row>)}
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
                <div id="recaptcha-container"></div>
                <div className="mt-5 text-center">
                  <Button
                    type="submit"
                    className="btn btn-primary profile-button"
                  >
                    {isCodeSent ? "Verificar Código" : "Salvar"}
                  </Button>
                </div>
              </Form>

            </div>
          </div>
        </div>
      </div>
      <VIPModal show={showModal} onClose={closeModal} mensagem={mensagem} />
      <PasswordChangeModal show={showPasswordModal} onClose={() => setShowPasswordModal(false)} />
    </>
  );
}

export default UserProfile;
