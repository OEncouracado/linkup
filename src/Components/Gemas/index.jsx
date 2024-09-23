import React from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useAuth, UserCss, UserInfo } from "../../hook";
import { useLightMode } from "../Dashboard/LightModeContext";
import { Link } from "react-router-dom";
import gemas from "../../Images/gemas/gemas.png";
import gemas2 from "../../Images/gemas/gemas2.png";
import gemas3 from "../../Images/gemas/gemas3.png";
import gemas4 from "../../Images/gemas/gemas4.png";
import gemas5 from "../../Images/gemas/gemas5.png";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function Gemas() {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const userArray = UserInfo(id);
    const stats = userArray && userArray[0];
    const cssArray = UserCss(id);// eslint-disable-next-line
    const css = cssArray && cssArray[0];
    const userName = stats?.linkUserName;
    const { isLightMode } = useLightMode();

    const handleCheckout = async () => {
        // Aqui você chamaria seu backend para iniciar o processo de pagamento
        const response = await fetch("/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productName: "Moldura gemas",
                priceId: "prod_Qi6xD4fppuiH08", // Substitua pelo ID do preço do produto criado no Stripe
            }),
        });

        const session = await response.json();

        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (error) {
            console.error("Erro ao redirecionar para o checkout", error);
        }
    };

    return (
        <>
            {authUser && (
                <div className="dashboardLinks d-flex flex-column align-items-center">
                    <Alert variant="info" className="mb-2">
                        Sua página já está disponível aqui:{" "}
                        <Link to={`/${userName}`} target="_blank" rel="noreferrer">
                            {userName}
                        </Link>
                        .
                    </Alert>
                    <Container><Card
                        bg={isLightMode ? "light" : "dark"}
                        text={isLightMode ? "dark" : "light"}
                        className="mb-3"
                    >
                        <Card.Header style={isLightMode ? {} : { backgroundColor: "#272B2F" }}>Loja</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Card bg="dark" text="light" className="mb-3 pt-1">
                                        <Card.Img className="" style={{ width: "10rem" }} variant="top" src={gemas} />
                                        <Card.Body>
                                            <Card.Title>Punhado de LinkGems</Card.Title>
                                            <p>Bundle com 100 linkgems</p>
                                            <Button variant="void" onClick={handleCheckout}>
                                                Comprar R$
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card bg="dark" text="light" className="mb-3 pt-1">
                                        <Card.Img className="" style={{ width: "10rem" }} variant="top" src={gemas2} />
                                        <Card.Body>
                                            <Card.Title>Punhado de LinkGems</Card.Title>
                                            <p>Bundle com 100 linkgems</p>
                                            <Button variant="void" onClick={handleCheckout}>
                                                Comprar R$
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card bg="dark" text="light" className="mb-3 pt-1">
                                        <Card.Img className="" style={{ width: "10rem" }} variant="top" src={gemas3} />
                                        <Card.Body>
                                            <Card.Title>Punhado de LinkGems</Card.Title>
                                            <p>Bundle com 100 linkgems</p>
                                            <Button variant="void" onClick={handleCheckout}>
                                                Comprar R$
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card bg="dark" text="light" className="mb-3 pt-1">
                                        <Card.Img className="" style={{ width: "10rem" }} variant="top" src={gemas4} />
                                        <Card.Body>
                                            <Card.Title>Punhado de LinkGems</Card.Title>
                                            <p>Bundle com 100 linkgems</p>
                                            <Button variant="void" onClick={handleCheckout}>
                                                Comprar R$
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card bg="dark" text="light" className="mb-3 pt-1">
                                        <Card.Img className="" style={{ width: "10rem" }} variant="top" src={gemas5} />
                                        <Card.Body>
                                            <Card.Title>Punhado de LinkGems</Card.Title>
                                            <p>Bundle com 100 linkgems</p>
                                            <Button variant="void" onClick={handleCheckout}>
                                                Comprar R$
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    </Container>
                </div>
            )}
        </>
    );
}

export default Gemas;
