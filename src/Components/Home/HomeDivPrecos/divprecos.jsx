import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./style.css";// eslint-disable-next-line
import StripePricingTable from "./stripe";

const planContents = [
    {
        header: "Grátis",
        price: "00",
        cents: "00",
        features: [
            "Links ilimitados e uma página personalizável, adicione atalhos para as suas redes sociais."
        ],
        buttonLabel: "Criar minha conta Gratuita",
        outline: true,
        buttonURL: "/Singup",
    },
    {
        header: "Mensal",
        price: 29,
        cents: 95,
        features: [
            "Perfeito para quem quer mais opções de personalização e análise."
        ],
        buttonLabel: "Começar com V.I.P.",
        outline: false
    },
    {
        header: "Anual",
        price: 14,
        cents: 95,
        features: [
            "Fique tranquilo por um ano, mais opções de personalização e análise, receba mais visitantes e economize."
        ],
        buttonLabel: "Contact us",
        outline: false
    }
];

const Plan = props => {
    return (
        <Col md={3} className="pb-5">
            <Card className="CardBG my-4 mx-1 shadow-sm">
                <Card.Body className="cardbody">
                    <Card.Title>
                <h4 className="my-0 font-weight-normal">
                    {props.header}
                </h4>
                    </Card.Title>
                    <h4 className="card-title pricing-card-title">
                        {`R$${props.price}`}
                        <span style={{ fontSize: ".7em" }}>{`,${props.cents}`}</span>
                        <span className="mes">
                            /mês
                        </span>
                    </h4>
                    <ul className="list-unstyled" style={{ height: "11rem" }}>
                    {props.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                    ))}
                </ul>
                    <Button
                        variant={props.outline ? "outline-light" : "light"}
                        className="rounded-pill" style={{ height: "3rem", fontSize: ".7rem" }}
                        href={props.buttonURL}
                >
                    {props.buttonLabel}
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

const Plans = () => {
    const plans = planContents.map((obj, i) => {
        return (
            <Plan
                key={obj.header}
                header={obj.header}
                price={obj.price}
                cents={obj.cents}
                features={obj.features}
                buttonLabel={obj.buttonLabel}
                outline={obj.outline}
                buttonURL={obj.buttonURL}
            />
        );
    });

    return (
        <Container id='divPlanos' className="precos">
            {/* <StripePricingTable /> */}
            <h1 className="text-center my-4">Planos</h1>
            <Row className="card-deck d-flex justify-content-center mb-3 text-center">
                {plans}
            </Row>
        </Container>
    );
};

export default Plans;
