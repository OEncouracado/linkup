import React, { useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

function Login() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState(''); // eslint-disable-next-line
    const [showMensagem, setShowMensagem] = useState(false)// eslint-disable-next-line
    const [mensagem, setMensagem] = useState('');// eslint-disable-next-line
    const [tipoMensagem, setTipoMensagem] = useState('');// eslint-disable-next-line
    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <Container className='border rounded border-dark' >
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
                        <Form.Control
                            className="mb-2"
                            type={mostrarSenha ? 'text' : 'password'}
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        <div className="input-group-append">
                            <span
                                className="input-group-text"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                style={{ cursor: 'pointer' }}
                            >
                                {mostrarSenha ? <EyeSlash /> : <Eye />}
                            </span>
                        </div>
                    </Form.Group>
                    <Button type="submit" >Entrar</Button>
                </Form>

            </Container>
            <Alert className='alertaLogin' show={showMensagem} variant={tipoMensagem}><p>{mensagem}</p></Alert>
        </div>
    )
}

export default Login
