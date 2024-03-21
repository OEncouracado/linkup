import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import logo from "../../Images/linkuplogotemporario.png"
import { emailRegex } from '../Constants'
import { fb } from '../../shared/service';

function Signup() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirSenha, setConfirSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirSenha, setMostrarConfirSenha] = useState(false);
    const [confirBotao, setConfirBotao] = useState(false);

    const handleEye = (campo) => {
        if (campo === 'senha') {
            setMostrarSenha(!mostrarSenha);
        } else if (campo === 'confirSenha') {
            setMostrarConfirSenha(!mostrarConfirSenha);
        }
    };

    // Função para verificar se o botão deve ser habilitado
    const verificarHabilitacaoBotao = () => {
        // Verifique se todos os campos obrigatórios estão preenchidos
        if (email && emailRegex.test(email) && senha && confirSenha && senha === confirSenha) {
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
    }, [email, senha, confirSenha]);

    const handleSingup = () => {
        if (confirBotao) {
            fb
                .auth
                .createUserWithEmailAndPassword(email, senha)
                .then(() => console.log("Sucesso!"));
        }

    };


    return (<div className='d-flex'>
        <img src={logo} alt="logo linkup" className='logologinup p-3' />
        <div className="backFormupin d-flex flex-column align-items-center justify-content-center">
            <Form className='mx-auto p-3 text-dark'>
                <h1>Junte-se a Nós</h1>
                <p class="text-concrete text-md ">Venha conosco nessa jornada, e de
                    <span className='text-black text-uppercase font-weight-bold'> graça</span>!</p>
                <Form.Group className="mb-3" controlId='emailSingup'>
                    <Form.Label>Entre com seu E-mail:</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='seuemail@seuprovedor.com.br'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId='senhaSingup'>
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
                <Form.Group className="d-grid gap-2 my-3">
                    <Button onClick={handleSingup} disabled={!confirBotao} size='lg' className='botaoCriar rounded-pill' >Criar Conta</Button>
                </Form.Group>
                <div class="pt-lg text-center"><p class="text-concrete text-sm ">Ao Clicar <span class="font-semibold">Criar Conta</span>, você concorda com os nossos <a class="!text-concrete text-sm text-primary inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 underline" href="/#">Termos e Condições</a><br /> e confirma que leu a nossa <a class="!text-concrete text-sm text-primary inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 underline" href="/#">Politica de Privacidade</a>.</p></div>
            </Form>
        </div>
        <div className="fundoImgSingUp"></div>
    </div>
    )
}

export default Signup
