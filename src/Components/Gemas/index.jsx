import React, { useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useAuth, UserCss, UserInfo } from "../../hook";
import { useLightMode } from "../Dashboard/LightModeContext";
import { Link } from "react-router-dom";
import { gemPackages } from "../../shared/service/gemasServices";
import { loadStripe } from "@stripe/stripe-js";
import { fb } from "../../shared/service";

const stripePromise = loadStripe("pk_live_51PTnf8CfAppK3pBhKjDqL8Q7tTOLxWX2XkAFBoZS2hi0TiCUWvPDFzmRrZgXHU9w31Kb2vUGX49BJooNkhZ8llfK00nbxk1XoW");

function Gemas() {
  const { authUser } = useAuth();
  const id = authUser?.uid;
  const userArray = UserInfo(id);
  const stats = userArray && userArray[0];
  const cssArray = UserCss(id); // eslint-disable-next-line
  const css = cssArray && cssArray[0];
  const userName = stats?.linkUserName;
  const { isLightMode } = useLightMode();

  // Estado para controlar o pacote de gemas atualmente em compra
  const [activePackage, setActivePackage] = useState(null);

  // Função de checkout com o Stripe
  const handleCheckout = async (gemPackage) => {
    setActivePackage(gemPackage.id);
  
    const stripe = await stripePromise;
  
    try {
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: gemPackage.priceId, // Insira o price ID configurado no Stripe
            quantity: 1,
          },
        ],
        mode: "payment",
        successUrl: `http://localhost:3000/s/Sucesso?package=${gemPackage.id}`, // URL de sucesso
        cancelUrl: "http://localhost:3000/s/Cancelado", // URL de falha
      });
  
      if (error) {
        console.error("Erro no Stripe:", error.message);
        alert("Erro ao processar pagamento.");
      }
    } catch (error) {
      console.error("Erro ao redirecionar para o Stripe Checkout:", error);
      alert("Ocorreu um erro ao redirecionar para o pagamento.");
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
          <Container>
            <Card
              bg={isLightMode ? "light" : "dark"}
              text={isLightMode ? "dark" : "light"}
              className="mb-3"
            >
              <Card.Header
                style={isLightMode ? {} : { backgroundColor: "#272B2F" }}
              >
                Loja
              </Card.Header>
              <Card.Body>
                <Row>
                  {gemPackages.map((gemPackage) => (
                    <Col md={4} key={gemPackage.id}>
                      <Card bg="dark" text="light" className="mb-3 pt-1">
                        <Card.Img
                          style={{ width: "10rem" }}
                          variant="top"
                          src={gemPackage.image}
                        />
                        <Card.Body>
                          <Card.Title>{gemPackage.title}</Card.Title>
                          <p>{gemPackage.description}</p>
                          <Button
                            variant="void"
                            onClick={() => handleCheckout(gemPackage)}
                          >
                            Comprar R$ {gemPackage.price}
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
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
