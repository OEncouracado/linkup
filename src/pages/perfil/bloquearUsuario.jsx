import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useAuth } from '../../hook'

function BloquearUsuario() {
    const auth = useAuth()

    return (
        <Container className=' d-flex m-2 justify-content-center'>
            <Button>Bloquear Conta</Button>
        </Container>
    )
}

export default BloquearUsuario
