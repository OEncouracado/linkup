import React from 'react'
import { Container } from 'react-bootstrap'

function HomeAdminPainel({ user }) {
    return (
        <Container className='text-dark'>
            <h1>Painel de Administração</h1>
            <h2>Bem-vindo, {user?.displayName}!</h2>
            <p>Selecione uma opção no menu à esquerda para começar.</p>
            <i className="fas fa-home"></i>
        </Container>
    )
}

export default HomeAdminPainel
