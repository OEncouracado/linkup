import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import logo from "../../Images/linkuplogotemporario.png"
import { emailRegex } from '../Constants'
import { fb } from '../../shared/service';
import 'firebase/compat/auth';


function Signup() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirSenha, setConfirSenha] = useState('');
    const [username, setUsername] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirSenha, setMostrarConfirSenha] = useState(false);
    const [confirBotao, setConfirBotao] = useState(false);
    const [formUsernameVisivel, setFormUsernameVisivel] = useState(false);
    const [usernameValido, setUsernameValido] = useState(false);
    const [emailJaCadastrado, setEmailJaCadastrado] = useState(false);

    const handleEye = (campo) => {
        if (campo === 'senha') {
            setMostrarSenha(!mostrarSenha);
        } else if (campo === 'confirSenha') {
            setMostrarConfirSenha(!mostrarConfirSenha);
        }
    };

    // Verifica se o nome de usuário já existe na coleção 'UserNames'
    const verificarUsername = async (username) => {
        try {
            const snapshot = await fb.firestore.collection('UserNames').where("username", "==", username).get();

            if (!snapshot.empty) {
                // O username já existe no documento desta coleção
                setUsernameValido(false);
            } else {
                // O username não existe no documento desta coleção
                setUsernameValido(true);
            }
        } catch (error) {
            console.error('Erro ao verificar username:', error);
            // Trate o erro conforme necessário
        }
    };

    // Função para verificar se um e-mail já está cadastrado como usuário
    const verificarEmailCadastrado = async (email) => {
        try {
            const signInMethods = await fb.auth.fetchSignInMethodsForEmail(email);
            if (signInMethods.length > 0) {
                // O e-mail já está cadastrado como usuário
                console.log('O e-mail já está cadastrado como usuário');
                setEmailJaCadastrado(true);
            } else {
                // O e-mail não está cadastrado como usuário
                console.log('O e-mail não está cadastrado como usuário');
                setEmailJaCadastrado(false);
            }
        } catch (error) {
            console.error('Erro ao verificar o e-mail:', error);
        }
    };


    // Função para verificar se o botão deve ser habilitado
    const verificarHabilitacaoBotao = () => {
        // Verifique se todos os campos obrigatórios estão preenchidos
        if (email && emailRegex.test(email) && !emailJaCadastrado && senha && confirSenha && senha === confirSenha) {
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




    const handleSignup = () => {
        if (confirBotao) {
            // Cria o usuário no Firebase Authentication
            fb.auth.createUserWithEmailAndPassword(email, senha)
                .then((userCredential) => {
                    // User signed up successfully
                    const user = userCredential.user;

                    // Cria um documento na coleção 'UserStats' com os campos necessários
                    fb.collection('UserStats').doc(user.uid).set({
                        imagemPerfil: "", // Você pode definir um valor padrão aqui se necessário
                        maxXp: 0,
                        moldura: "", // Pode ser definido um valor padrão também
                        nivelUser: 1,
                        userBackGround: "", // Valor padrão
                        userId: user.uid,
                        username: username, // Usando o nome de usuário fornecido pelo usuário
                        xp: 0
                    });

                    // Adiciona o username à coleção 'UserNames'
                    fb.collection('UserNames').doc('FhD7GGxd24OzH9iH2HzS').update({
                        [username]: user.uid
                    });

                    console.log("Sucesso!");
                })
                .catch((error) => {
                    // Handle errors here
                    console.error("Erro ao criar usuário:", error);
                });
        }
    };




    return (
        <div className='d-flex'>
        <img src={logo} alt="logo linkup" className='logologinup p-3' />
        <div className="backFormupin d-flex flex-column align-items-center justify-content-center">
                <Button onClick={() => setFormUsernameVisivel(!formUsernameVisivel)}>clique aqui</Button>
                {formUsernameVisivel ? (<Form className='mx-auto p-3 text-dark'>
                    <h1>Junte-se a Nós</h1>
                    <p class="text-concrete text-md ">Venha conosco nessa jornada, e de
                        <span className='text-black text-uppercase font-weight-bold'> graça</span>!</p>
                    <Form.Group className="mb-3" controlId='emailSingup'>
                        <Form.Label>Crie um novo Usuário:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='crie um novo Usuário'
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                verificarUsername(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="d-grid gap-2 my-3"><Button onClick={handleSignup} disabled={!usernameValido} size='lg' className='botaoCriar rounded-pill' >Criar Conta</Button></Form.Group>
                </Form>) : (<Form className='mx-auto p-3 text-dark'>
                <h1>Junte-se a Nós</h1>
                <p class="text-concrete text-md ">Venha conosco nessa jornada, e de
                    <span className='text-black text-uppercase font-weight-bold'> graça</span>!</p>
                        <Form.Group className="" controlId='emailSingup'>
                    <Form.Label>Entre com seu E-mail:</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder=''
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                isInvalid={emailJaCadastrado}
                                isValid={!emailJaCadastrado && emailRegex.test(email)}
                            />
                            <Form.Control.Feedback type="invalid">
                                E-mail já Cadastrado.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid" />
                </Form.Group>
                        {/* {emailJaCadastrado ?
                            (<Form.Text className="text-danger mt-0">
                                Este e-mail já está cadastrado.
                            </Form.Text>) : (<></>)} */}
                        <Form.Group className="my-3" controlId='senhaSingup'>
                    <Form.Label>Entre com uma Senha:</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type={mostrarSenha ? 'text' : 'password'}
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        <InputGroup.Text
                            onClick={() => handleEye('senha')}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: 'white',
                            }}
                        >
                            {mostrarSenha ? <Eye /> : <EyeSlash />}
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId='confirSenhaSingup'>
                    <Form.Label>Repita a Senha:</Form.Label>
                    <InputGroup>
                                <Form.Control
                            type={mostrarConfirSenha ? 'text' : 'password'}
                            placeholder="Confirmar Senha"
                            value={confirSenha}
                            onChange={(e) => setConfirSenha(e.target.value)}
                            required
                        />
                        <InputGroup.Text
                            onClick={() => handleEye('confirSenha')}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: 'white',
                            }}
                        >
                            {mostrarConfirSenha ? <Eye /> : <EyeSlash />}
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId='mailmarketing'>
                    <Form.Check type='checkbox' label='Concordo em receber ofertas, notícias e atualizações da LinkUp' />
                </Form.Group>
                        <Form.Group className="d-grid gap-2 my-3"><Button onClick={() => setFormUsernameVisivel(true)} disabled={!confirBotao} size='lg' className='botaoCriar rounded-pill' >Criar Conta</Button></Form.Group>
                <div class="pt-lg text-center"><p class="text-concrete text-sm ">Ao Clicar <span class="font-semibold">Criar Conta</span>, você concorda com os nossos <a class="!text-concrete text-sm text-primary inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 underline" href="/#">Termos e Condições</a><br /> e confirma que leu a nossa <a class="!text-concrete text-sm text-primary inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 underline" href="/#">Politica de Privacidade</a>.</p></div>
                </Form>)}
        </div>
        <div className="fundoImgSingUp"></div>
    </div>
    )
}

export default Signup
