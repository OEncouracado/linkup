import React from "react";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { useAuth, UserCss, UserInfo } from "../../hook";
import { useLightMode } from "../Dashboard/LightModeContext";
import { Link } from "react-router-dom";
import sakura from "../../Images/molduras/sakura.png";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

function Lojasublink() {
  const { authUser } = useAuth();
  const id = authUser?.uid;
  const userArray = UserInfo(id);
  const stats = userArray && userArray[0];
    const cssArray = UserCss(id);
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
                productName: "Moldura Sakura",
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
                    <Card
                        bg={isLightMode ? "light" : "dark"}
                        text={isLightMode ? "dark" : "light"}
                        className="mb-3"
                    >
                        <Card.Header style={isLightMode ? {} : { backgroundColor: "#272B2F" }}>Loja</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Card bg="dark" text="light" className="mb-3 pt-1">
                                        <Card.Img className="" variant="top" src={sakura} />
                                        <Card.Body>
                                            <Card.Title>Moldura Sakura</Card.Title>
                                            <Button variant="void" onClick={handleCheckout}>
                                                Comprar R$
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </>
    );
}

export default Lojasublink;
