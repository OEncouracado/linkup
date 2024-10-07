import React, { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import logo from "../../Images/logos/linkiimelogo.png";
import { emailRegex } from "../Constants";
import { fb } from "../../shared/service";
import "firebase/compat/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirSenha, setConfirSenha] = useState("");
  const [username, setUsername] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirSenha, setMostrarConfirSenha] = useState(false);
  const [confirBotao, setConfirBotao] = useState(false);
  const [formUsernameVisivel, setFormUsernameVisivel] = useState(false);
  const [usernameValido, setUsernameValido] = useState(false);
  const [emailJaCadastrado, setEmailJaCadastrado] = useState(false);
  const navigate = useNavigate("");

  const handleEye = (campo) => {
    if (campo === "senha") {
      setMostrarSenha(!mostrarSenha);
    } else if (campo === "confirSenha") {
      setMostrarConfirSenha(!mostrarConfirSenha);
    }
  };

  // Verifica se o nome de usuário já existe na coleção 'UserNames'
  const verificarUsername = async (username) => {
    try {
      const userNamesRef = fb.firestore.collection("linkUserNames");
      const snapshot = await userNamesRef
        .where("linkUserNames", "array-contains", username)
        .get();

      if (snapshot.empty) {
        // O displayName não está em uso
        setUsernameValido(true);
      } else {
        // O displayName já está em uso
        setUsernameValido(false);
      }
    } catch (error) {
      console.error("Erro ao verificar o displayName:", error);
      throw error; // Você pode tratar o erro de acordo com sua lógica de tratamento de erros
    }
  };

  // Função para verificar se um e-mail já está cadastrado como usuário
  const verificarEmailCadastrado = async (email) => {
    try {
      const signInMethods = await fb.auth.fetchSignInMethodsForEmail(email);
      if (signInMethods.length > 0) {
        // O e-mail já está cadastrado como usuário
        console.log("O e-mail já está cadastrado como usuário");
        setEmailJaCadastrado(true);
      } else {
        // O e-mail não está cadastrado como usuário
        console.log("O e-mail não está cadastrado como usuário");
        setEmailJaCadastrado(false);
      }
    } catch (error) {
      console.error("Erro ao verificar o e-mail:", error);
    }
  };

  // Função para verificar se o botão deve ser habilitado
  const verificarHabilitacaoBotao = () => {
    // Verifique se todos os campos obrigatórios estão preenchidos
    if (
      email &&
      emailRegex.test(email) &&
      !emailJaCadastrado &&
      senha &&
      confirSenha &&
      senha === confirSenha
    ) {
      // Outras verificações necessárias, se houver

      // Habilitar o botão se todas as condições forem atendidas
      setConfirBotao(true);
    } else {
      // Desabilitar o botão se alguma condição não for atendida
      setConfirBotao(false);
    }
  };
  useEffect(() => {
    verificarEmailCadastrado(email);
  }, [email]);
  // Chamada da função de verificação sempre que houver uma mudança nos campos do formulário
  useEffect(() => {
    verificarHabilitacaoBotao(); // eslint-disable-next-line
  }, [email, senha, confirSenha, emailJaCadastrado]);

  // Chamada da função de verificação sempre que houver uma mudança no campo de e-mail

  const handleSignup = async () => {
    if (confirBotao) {
      try {
        // Cria o usuário no Firebase Authentication
        const userCredential = await fb.auth.createUserWithEmailAndPassword(
          email,
          senha
        );
        const newuser = userCredential.user;

        await newuser.sendEmailVerification();
        // Cria um documento na coleção 'UserStats' com os campos necessários
        await fb?.firestore.collection("UserStats").doc(newuser.uid).set({
          VIP: false,
          completedObjectives: [],
          imagemPerfil: "", // Você pode definir um valor padrão aqui se necessário
          isBlocked: false,
          linkUserName: username,
          moldura: "", // Pode ser definido um valor padrão também
          rank: 0,
          userBackGround: "", // Valor padrão
          userId: newuser.uid,
          username: username, // Usando o nome de usuário fornecido pelo usuário
          xp: 0,
        });

        console.log("Documento 'UserStats' criado com sucesso");

        // Cria um documento na coleção 'UserCss'
        await fb?.firestore.collection("UserCss").doc(newuser.uid).set({
          userId: newuser.uid,
          username: username,
          linkUserName: username,
        });

        console.log("Documento 'UserCss' criado com sucesso");

        // Cria um documento na coleção 'linkPages'
        await fb?.firestore.collection("linkPages").doc(newuser.uid).set({
          Links: [],
          userId: newuser.uid,
          username: username,
          linkUserName: username,
        });
        // Atualiza o displayName com o username fornecido
        console.log("Documento 'linkPages' criado com sucesso");
        await newuser?.updateProfile({
          displayName: username,
        });
        console.log("DisplayName atualizado com sucesso para:", username);

        // Adiciona o username à coleção 'UserNames'
        try {
          await fb?.firestore
            .collection("UserNames")
            .doc("FhD7GGxd24OzH9iH2HzS")
            .update({
              usernames: fb.arrayUnion(username),
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
        console.log("Username adicionado à coleção 'UserNames'");

        // Adiciona o username à coleção 'linkUserNames'
        try {
          await fb?.firestore
            .collection("linkUserNames")
            .doc("sHG2pavwu4O22AWIw0mU")
            .update({
              linkUserNames: fb.arrayUnion(username),
            });
          console.log(
            "Nome de usuário adicionado com sucesso à coleção 'linkUserNames'"
          );
        } catch (error) {
          console.error(
            "Erro ao adicionar nome de usuário à coleção 'linkUserNames':",
            error
          );
        }

        console.log("Username adicionado à coleção 'linkUserNames'");
        // Realiza o envio do email de verificação

        // Realiza o login do usuário automaticamente
        await fb.auth.signInWithEmailAndPassword(email, senha);
        console.log("Login realizado automaticamente com sucesso!");
        navigate("/verificacaoEmail");
      } catch (error) {
        console.error("Erro durante o processo de criação do usuário:", error);
      }
    }
  };

  return (
    <Container style={{ maxWidth: "100dvw" }} className="d-flex m-0 p-0">
      <a href="/">
        <img src={logo} alt="logo linkup" className="logologinup p-3" />
      </a>
      <Container className="backFormupin d-flex flex-column align-items-center justify-content-center">
        {/* <Button onClick={() => setFormUsernameVisivel(!formUsernameVisivel)}>clique aqui</Button> */}
        {formUsernameVisivel ? (
          <Form className="mx-auto p-3 text-dark">
            <h1>Junte-se a Nós</h1>
            <p class="text-concrete text-md ">
              Venha conosco nessa jornada, e de
              <span className="text-black text-uppercase font-weight-bold">
                {" "}
                graça
              </span>
              !
            </p>
            <Form.Group className="mb-3" controlId="emailSingup">
              <Form.Label>Crie um novo Usuário:</Form.Label>
              <Form.Control
                type="text"
                placeholder="crie um novo Usuário"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  verificarUsername(e.target.value);
                }}
                isInvalid={!usernameValido || !username}
                isValid={usernameValido}
                required
              />
              {username ? (
                <Form.Control.Feedback type="invalid">
                  Esse Usuário já está Cadastrado.
                </Form.Control.Feedback>
              ) : (
                <Form.Control.Feedback type="invalid">
                  Digite um usuário.
                </Form.Control.Feedback>
              )}
              <Form.Control.Feedback type="valid" />
            </Form.Group>
            <Form.Group className="d-grid gap-2 my-3">
              <Button
                onClick={handleSignup}
                disabled={!usernameValido || !username}
                size="lg"
                className="botaoCriar rounded-pill"
              >
                Criar Conta
              </Button>
            </Form.Group>
          </Form>
        ) : (
          <Form className="mx-auto p-3 text-dark">
            <h1>Junte-se a Nós</h1>
            <p class="text-concrete text-md ">
              Venha conosco nessa jornada, e de
              <span className="text-black text-uppercase font-weight-bold">
                {" "}
                graça
              </span>
              !
            </p>
            <Form.Group className="" controlId="emailSingup">
              <Form.Label>Entre com seu E-mail:</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={emailJaCadastrado || !emailRegex.test(email)}
                isValid={!emailJaCadastrado && emailRegex.test(email)}
                required
              />
              <Form.Control.Feedback type="invalid">
                E-mail já Cadastrado.
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid" />
            </Form.Group>
            <Form.Group className="my-3" controlId="senhaSingup">
              <Form.Label>Entre com uma Senha:</Form.Label>
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
            <Form.Group className="mb-3" controlId="confirSenhaSingup">
              <Form.Label>Repita a Senha:</Form.Label>
              <InputGroup>
                <Form.Control
                  type={mostrarConfirSenha ? "text" : "password"}
                  placeholder="Confirmar Senha"
                  value={confirSenha}
                  onChange={(e) => setConfirSenha(e.target.value)}
                  required
                />
                <InputGroup.Text
                  onClick={() => handleEye("confirSenha")}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "white",
                  }}
                >
                  {mostrarConfirSenha ? <Eye /> : <EyeSlash />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="mailmarketing">
              <Form.Check
                type="checkbox"
                label="Concordo em receber ofertas, notícias e atualizações da LinkUp"
              />
            </Form.Group>
            <Form.Group className="d-grid gap-2 my-3">
              <Button
                onClick={() => setFormUsernameVisivel(true)}
                disabled={!confirBotao}
                size="lg"
                className="botaoCriar rounded-pill"
              >
                Criar Conta
              </Button>
            </Form.Group>
            <Container class="pt-lg text-center">
              <p class="text-dark text-sm ">
                Ao Clicar <span class="font-semibold">Criar Conta</span>, você
                concorda com os nossos{" "}
                <a
                  class="!text-concrete text-sm text-primary inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 underline"
                  href="/#"
                >
                  Termos e Condições
                </a>
                <br /> e confirma que leu a nossa{" "}
                <a
                  class="!text-concrete text-sm text-primary inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 underline"
                  href="/#"
                >
                  Politica de Privacidade
                </a>
                .
              </p>
              <p className="text-dark">
                Já possui uma Conta? Então{" "}
                <a
                  className="!text-concrete text-sm text-primary inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 underline"
                  href="/Login"
                >
                  Entre Aqui!
                </a>
              </p>
            </Container>
          </Form>
        )}
      </Container>
      <Container className="fundoImgSingUp d-none d-md-block"></Container>
    </Container>
  );
}

export default Signup;
