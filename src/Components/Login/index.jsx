import React, { useState } from 'react'
import { Alert, Button, Container, Form, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

function Login() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState(''); // eslint-disable-next-line
    // const [showMensagem, setShowMensagem] = useState(false)// eslint-disable-next-line
    // const [mensagem, setMensagem] = useState('');// eslint-disable-next-line
    // const [tipoMensagem, setTipoMensagem] = useState('');// eslint-disable-next-line
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handleEye = () => {
        setMostrarSenha(!mostrarSenha);
    };

    return (
        <div className="backG d-flex flex-column align-items-center justify-content-center">
            <Container className='contlogin border rounded border-dark' >
                <Form className="d-flex flex-column align-items-center m-3" onSubmit={""}>
                    <Form.Group>
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control
                            className="mb-2"
                            type="text"
                            placeholder="Usuário"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Senha</Form.Label>
                        <InputGroup className="mb-2">
                            <Form.Control
                                type={mostrarSenha ? 'text' : 'password'}
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                            <InputGroup.Text
                                onClick={handleEye}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: 'white', // remove o fundo
                                }}
                            >
                                {mostrarSenha ? <Eye /> : <EyeSlash />}
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Button type="submit" >Entrar</Button>
                </Form>
            </Container>
            {/* <Alert className='alertaLogin' show={showMensagem} variant={tipoMensagem}><p>{mensagem}</p></Alert> */}
        </div>
    )
}

export default Login
