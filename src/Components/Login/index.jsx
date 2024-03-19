import React, { useState } from 'react' // eslint-disable-next-line
import { Alert, Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import tempLogo from '../../Images/linkuplogotemporariosfundo.png';

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
            <Container className='contlogin mx-auto mb-2'>
                <Row className="rowint d-flex flex-column align-items-center justify-content-center m-3">
                    <Col xs={12} md={10}>
                        <Image className='logoimg' src={tempLogo}></Image>
                    </Col>
                    <Col xs={12} md={10}>
                        <Form onSubmit={""}>
                            <Form.Group>
                        <Form.Label>Usuário</Form.Label>
                                <Form.Control
                            type="text"
                            placeholder="Usuário"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>
                            <Form.Group className='my-2'>
                        <Form.Label>Senha</Form.Label>
                                <InputGroup>
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
                                    backgroundColor: 'white',
                                }}
                            >
                                {mostrarSenha ? <Eye /> : <EyeSlash />}
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                            <Button type="submit">Entrar</Button>
                </Form>
                    </Col>

                </Row>
            </Container>
            {/* <Alert className='alertaLogin' show={showMensagem} variant={tipoMensagem}><p>{mensagem}</p></Alert> */}
        </div>

    )
}

export default Login
