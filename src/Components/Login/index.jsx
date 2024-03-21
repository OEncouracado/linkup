import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import logo from "../../Images/linkuplogotemporario.png"
import { emailRegex } from '../Constants'
import { fb } from '../../shared/service';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [confirBotao, setConfirBotao] = useState(false);
    const [mostrarErro, setMostrarErro] = useState(false);
    const [erroVariant, setErroVariant] = useState('');
    const [erro, setErro] = useState('');

    const handleEye = (campo) => {
        if (campo === 'senha') {
            setMostrarSenha(!mostrarSenha);
        } else { }
    };

    // Função para verificar se o botão deve ser habilitado
    const verificarHabilitacaoBotao = () => {
        // Verifique se todos os campos obrigatórios estão preenchidos
        if (email && emailRegex.test(email) && senha) {
            // Outras verificações necessárias, se houver

            // Habilitar o botão se todas as condições forem atendidas
            setConfirBotao(true);
        } else {
            // Desabilitar o botão se alguma condição não for atendida
            setConfirBotao(false);
        }
    };

    // Chamada da função de verificação sempre que houver uma mudança nos campos do formulário
    useEffect(() => {
        verificarHabilitacaoBotao(); // eslint-disable-next-line
    }, [email, senha]);

    useEffect(() => {
        if (erro) {
            const timer = setTimeout(() => {
                setMostrarErro(false);
                setErro('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [erro]);

    const handleLogin = () => {
        if (confirBotao) {
            setErro('');
            fb
                .auth
                .signInWithEmailAndPassword(email, senha)
                .then(res => {
                    if (!res.user) {
                        setErroVariant('danger');
                        setErro("Estamos com problemas para conseguir fazer você logar, por favor tente novamente.")
                        setMostrarErro(true);
                    }
                    else {
                        setErroVariant('success');
                        setErro("Logado com Sucesso")
                        setMostrarErro(true)
                    }
                })
                .catch(err => {
                    if (err.code === 'auth/invalid-login-credentials') {
                        setErroVariant('danger');
                        setErro('Credenciais Invalidas');
                        setMostrarErro(true);
                    } else {
                        setErroVariant('danger');
                        setErro('Erro Desconhecido');
                        setMostrarErro(true);
                    }
                });
        }

    };


    return (<div className='d-flex'>
        <img src={logo} alt="logo linkup" className='logologinup p-3' />
        <div className="backFormupin d-flex flex-column align-items-center justify-content-center">
            <Form className='mx-auto p-3 text-dark'>
                <h1>Bem Vindo de Volta!</h1>
                <p class="text-concrete text-md ">Que bom te ver por aqui denovo!</p>
                <Form.Group className="mb-3" controlId='emailLogin'>
                    <Form.Label>E-mail:</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='seuemail@seuprovedor.com.br'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId='senhaLogin'>
                    <Form.Label>Senha:</Form.Label>
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
                <a href="/#"><small>Esqueci minha senha</small></a>
                <Form.Group className="d-grid gap-2 my-4">
                    <Button onClick={handleLogin} disabled={!confirBotao} size='lg' className='botaoCriar rounded-pill' >Entrar</Button>
                </Form.Group>
                <small>Não tem uma conta? Sem problemas <a href='/#'>clique aqui</a></small>
                <Alert className='alertaLogin' variant={erroVariant} show={mostrarErro}><p>{erro}</p></Alert>

            </Form>
        </div>
        <div className="fundoImgSingUp"></div>
    </div>
    )
}

export default Login
