import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import logo from "../../Images/sublinkslogo.png";
import { emailRegex } from "../Constants";
import { fb } from "../../shared/service";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [confirBotao, setConfirBotao] = useState(false);
  const [mostrarErro, setMostrarErro] = useState(false);
  const [erroVariant, setErroVariant] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleEye = (campo) => {
    if (campo === "senha") {
      setMostrarSenha(!mostrarSenha);
    }
  };

  const verificarHabilitacaoBotao = () => {
    if (email && emailRegex.test(email) && senha) {
      setConfirBotao(true);
    } else {
      setConfirBotao(false);
    }
  };

  useEffect(() => {
    verificarHabilitacaoBotao(); // eslint-disable-next-line
  }, [email, senha]);

  useEffect(() => {
    if (erro) {
      const timer = setTimeout(() => {
        setMostrarErro(false);
        setErro("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [erro]);

  const handleLogin = () => {
    if (confirBotao) {
      setErro("");
      fb?.auth
        .signInWithEmailAndPassword(email, senha)
        .then(async (res) => {
          if (!res.user) {
            setErroVariant("danger");
            setErro(
              "Estamos com problemas para conseguir fazer você logar, por favor tente novamente."
            );
            setMostrarErro(true);
          } else {
            const userDoc = await fb?.firestore
              .collection("UserStats")
              .doc(res.user.uid)
              .get();
            const userData = userDoc.data();

            if (userData.isBlocked) {
              navigate("/bloqueado");
            } else {
              setErroVariant("success");
              setErro("Logado com Sucesso");
              setMostrarErro(true);
              // Redirecionar para o dashboard ou outra página
              navigate("/dashboard");
            }
          }
        })
        .catch((err) => {
          if (err.code === "auth/invalid-login-credentials") {
            setErroVariant("danger");
            setErro("Credenciais Invalidas");
            setMostrarErro(true);
          } else {
            setErroVariant("danger");
            setErro("Erro Desconhecido");
            setMostrarErro(true);
          }
        });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await fb?.auth.signInWithPopup(fb.googleProvider);
      const user = result.user;

      const userStatsDoc = await fb?.firestore
        .collection("UserStats")
        .doc(user.uid)
        .get();
      const userCssDoc = await fb?.firestore
        .collection("UserCss")
        .doc(user.uid)
        .get();
      const linkPagesDoc = await fb?.firestore
        .collection("linkPages")
        .doc(user.uid)
        .get();

      if (!userStatsDoc.exists || !userCssDoc.exists || !linkPagesDoc.exists) {
        await fb?.firestore.collection("UserStats").doc(user.uid).set({
          VIP: false,
          completedObjectives: [],
          imagemPerfil: user.photoURL, // Você pode definir um valor padrão aqui se necessário
          isBlocked: false,
          linkUserName: user.displayName,
          moldura: "", // Pode ser definido um valor padrão também
          rank: 0,
          userBackGround: "", // Valor padrão       
          userId: user.uid,
          username: user.displayName,
          xp: 0,
        });
        await fb?.firestore.collection("UserCss").doc(user.uid).set({
          userId: user.uid,
          username: user.displayName,
          linkUserName: user.displayName,
        });
        await fb?.firestore.collection("linkPages").doc(user.uid).set({
          Links: [],
          userId: user.uid,
          username: user.displayName,
          linkUserName: user.displayName,
        });

        try {
          await fb?.firestore
            .collection("UserNames")
            .doc("FhD7GGxd24OzH9iH2HzS")
            .update({
              usernames: fb.arrayUnion(user.displayName),
            });
          console.log(
            "Nome de usuário adicionado com sucesso à coleção 'UserNames'"
          );
        } catch (error) {
          console.error(
            "Erro ao adicionar nome de usuário à coleção 'UserNames':",
            error
          );
        }

        try {
          await fb?.firestore
            .collection("linkUserNames")
            .doc("sHG2pavwu4O22AWIw0mU")
            .update({
              linkUserNames: fb.arrayUnion(user.displayName),
            });
          console.log(
            "Nome de usuário adicionado com sucesso à coleção 'LinkUserName'"
          );
        } catch (error) {
          console.error(
            "Erro ao adicionar nome de usuário à coleção 'LinkUserName':",
            error
          );
        }
      }

      console.log(
        "Documentos criados (se necessário) com sucesso para o usuário:",
        user.displayName
      );
    } catch (error) {
      console.error("Erro durante o login com o Google:", error);
    }
  };

  return (
    <Container style={{ maxWidth: "100dvw" }} className="d-flex m-0 p-0">
      <a href="/"><img src={logo} alt="logo linkup" className="logologinup p-3 m-0" /></a>
      <Container className="backFormupin d-flex flex-column align-items-center justify-content-center">
        <Form className="mx-auto pt-3 text-dark">
          <h1>Bem Vindo de Volta!</h1>
          <p className="text-concrete text-md">
            Que bom te ver por aqui denovo!
          </p>
          <Form.Group className="mb-3" controlId="emailLogin">
            <Form.Label>E-mail:</Form.Label>
            <Form.Control
              type="email"
              placeholder="seuemail@seuprovedor.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="senhaLogin">
            <Form.Label>Senha:</Form.Label>
            <InputGroup>
              <Form.Control
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <InputGroup.Text
                onClick={() => handleEye("senha")}
                style={{
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
              >
                {mostrarSenha ? <Eye /> : <EyeSlash />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <a href="recuperacao">
            <small>Esqueci minha senha</small>
          </a>
          <Form.Group className="d-grid gap-2 my-4">
            <Button
              onClick={handleLogin}
              disabled={!confirBotao}
              size="lg"
              className="botaoCriar rounded-pill"
            >
              Entrar
            </Button>
          </Form.Group>
          <Alert
            className="alertaLogin"
            variant={erroVariant}
            show={mostrarErro}
          >
            <p>{erro}</p>
          </Alert>
        </Form>
        <p>OU</p>
        <Button
          variant="light"
          size="md"
          id="btn-Google"
          onClick={handleGoogleLogin}
          className="mb-3 border"
        >
          <div className="">
            <img
              src="https://linkme.bio/wp-content/themes/linkme/img/icon-google.svg"
              className="me-3"
              style={{ width: "1rem" }}
              alt="Google logo"
            />
            <span>Entrar com o Google</span>
          </div>
        </Button>
        <small className="mb-3">
          Não tem uma conta? Sem problemas{" "}
          <Link to={"/Singup"}>clique aqui</Link>
        </small>
      </Container>
      <Container className="fundoImgSingUp d-none d-md-block" />
    </Container>
  );
}

export default Login;
