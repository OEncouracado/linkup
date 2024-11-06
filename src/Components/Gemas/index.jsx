import React, { useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useAuth, UserCss, UserInfo } from "../../hook";
import { useLightMode } from "../Dashboard/LightModeContext";
import { Link } from "react-router-dom";
import { gemPackages } from "../../shared/service/gemasServices";
import { loadStripe } from "@stripe/stripe-js";

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
// eslint-disable-next-line
  const [activePackage, setActivePackage] = useState(null);

  const handleCheckout = async (gemPackage) => {
    setActivePackage(gemPackage.id);

    const stripe = await stripePromise;

    try {
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: gemPackage.priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        successUrl: `https://linkii.me/s/Sucesso?package=${gemPackage.id}`,
        cancelUrl: "https://linkii.me/s/Cancelado",
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

  const handlePixCheckout = async (gemPackage, userId) => {
    try {
      const response = await fetch("/api/create-pix-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: gemPackage.title,
          quantity: 1,
          price: gemPackage.price,
          userId:userId,
          gemCount:gemPackage.gemCount,
        }),
      });
      
      const responseText = await response.text();
      console.log('Texto da resposta:', responseText);
      const data = JSON.parse(responseText);
      console.log('Resposta completa da API Mercado Pago:', data);
  
      if (data.init_point) {
        // Abrir a página de pagamento Pix do Mercado Pago em uma nova janela/popup
        const popupWindow = window.open(
          data.init_point,   // URL para a página de pagamento
          'Pagamento Pix', // Nome da janela (opcional)
          'width=800,height=600' // Dimensões da janela
        );
      
        // Focar a janela, caso o navegador a tenha criado
        if (popupWindow) {
          popupWindow.focus();
        } else {
          alert('Permita popups para abrir a página de pagamento.');
        }
      }
       else {
        console.error('Erro ao obter URL do pagamento:', data.message);
        alert('Erro ao processar pagamento via Pix.');
      }
    } catch (error) {
      console.error('Erro ao redirecionar para o pagamento via Pix:', error);
      alert('Erro ao processar pagamento via Pix.');
    }
  };
  const handlePixCheckoutTest = async (gemPackage, userId) => {
    try {
      const response = await fetch("/api/create-pix-preference-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: gemPackage.title,
          quantity: 1,
          price: gemPackage.price,
          userId:userId,
          gemCount:gemPackage.gemCount,
        }),
      });
      
      const responseText = await response.text();
      console.log('Texto da resposta:', responseText);
      const data = JSON.parse(responseText);
      console.log('Resposta completa da API Mercado Pago:', data);
  
      if (data.sandbox_init_point) {
        // Abrir a página de pagamento Pix do Mercado Pago em uma nova janela/popup
        const popupWindow = window.open(
          data.sandbox_init_point,   // URL para a página de pagamento
          'Pagamento Pix', // Nome da janela (opcional)
          'width=800,height=600' // Dimensões da janela
        );
      
        // Focar a janela, caso o navegador a tenha criado
        if (popupWindow) {
          popupWindow.focus();
        } else {
          alert('Permita popups para abrir a página de pagamento.');
        }
      }
       else {
        console.error('Erro ao obter URL do pagamento:', data.message);
        alert('Erro ao processar pagamento via Pix.');
      }
    } catch (error) {
      console.error('Erro ao redirecionar para o pagamento via Pix:', error);
      alert('Erro ao processar pagamento via Pix.');
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
                            className="w-100"
                            variant="void"
                            onClick={() => handleCheckout(gemPackage)}
                          >
                            Cartão R$ {gemPackage.price}
                          </Button>
                          <Button
                            className="mt-2 w-100"
                            variant="void"
                            onClick={() => handlePixCheckout(gemPackage,id)}
                          >
                            Pix R$ {gemPackage.price}
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
