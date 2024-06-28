import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { fb } from '../../shared/service';
import { useNavigate } from 'react-router-dom';

function RecuperarSenha() {
    const [emailRecup, setEmailRecup] = useState("");
    const navigate = useNavigate("");
    console.log('emailRecup :>> ', emailRecup);

    const handlePWReset = async (e) => {
        e.preventDefault();
        try {
            await fb?.auth.sendPasswordResetEmail(emailRecup);
            alert("Password reset email sent successfully.");
            setEmailRecup("");
            navigate("concluido");
        } catch (error) {
            if (error.code === "auth/network-request-failed") {
                alert("Erro de rede. Verifique sua conexão à internet e tente novamente.");
                console.error(error);
            } else {
                alert("Ocorreu um Erro: " + error.message);
                console.error(error);
            }
        }
    };
    return (<>
        <Container style={{ height: "100dvh", maxWidth: "100dvw" }} className='m-0 bg-dark d-flex justify-content-center align-items-center text-light'>
            <Form onSubmit={handlePWReset} className="mx-auto pt-3 text-light">
                <a href="/Login">
                    <small><i class="fas fa-arrow-left    " /> Voltar para o Login</small>
                </a>
                <h1>Recuperar Senha</h1>
                <Form.Group className="mb-3" controlId="emailRecuperar">
                    <Form.Label>
                        Coloque seu email para recuperação da senha
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="seuemail@seuprovedor.com.br"
                        value={emailRecup}
                        onChange={(e) => setEmailRecup(e.target.value)}
                    />
                </Form.Group>
                <Button className="botaoCriar rounded-pill" type="submit">
                    Recuperar
                </Button>

            </Form>
        </Container>
    </>)
}

export default RecuperarSenha
