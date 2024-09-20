import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Arquivo CSS para customizar os tijolos e visual pixelado

function NotFound() {
    return (
        <Container className="page-404">
            <div className="bricks-top"></div>
            <div className="container text-center">
                <p className="mb-5">404 - Página não encontrada</p>
                <h3 className="">Obrigado por sua visita!</h3>
                <h3 className="">Mas a sua página está em outro castelo.</h3>
                <Link to="/" className="btn btn-primary mt-5">
                    Voltar ao início
                </Link>
            </div>
            <div className="bricks-bottom"></div>
        </Container>
    );
}

export default NotFound;
