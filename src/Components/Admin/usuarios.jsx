import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { axios } from 'axios';
  // Para fazer requisições HTTP

function UsuariosAdminPainel() {
    const [usuarios, setUsuarios] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Fazendo requisição para a função serverless no Vercel
                const response = await axios.get("/api/list-users");  // No Vercel, a URL será algo como /api/list-users
                setUsuarios(response.data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };
        
        fetchUsers();
    }, []);

    // Filtros de busca e status
    const filteredUsers = usuarios
        .filter((user) =>
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        )
        .filter((user) => (statusFilter ? user.status === statusFilter : true));

    return (
        <Container>
            {/* Filtros de Busca */}
            <Row className="my-3">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Buscar por nome ou email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
                <Col md={4}>
                    <Form.Control
                        as="select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Todos os Status</option>
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </Form.Control>
                </Col>
                <Col md={2}>
                    <Button variant="primary" className="w-100">Exportar CSV</Button>
                </Col>
            </Row>

            {/* Tabela de Usuários */}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Data de Criação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name || "Sem nome"}</td>
                                <td>{user.email}</td>
                                <td>{user.status}</td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <Button variant="info" className="me-2">
                                        Editar
                                    </Button>
                                    <Button variant="danger">Excluir</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">Nenhum usuário encontrado</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default UsuariosAdminPainel;
