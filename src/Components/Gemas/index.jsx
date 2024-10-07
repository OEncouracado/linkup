import React, { useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useAuth, UserCss, UserInfo } from "../../hook";
import { useLightMode } from "../Dashboard/LightModeContext";
import { Link } from "react-router-dom";
import gemas from "../../Images/gemas/gemas.png";
import gemas2 from "../../Images/gemas/gemas2.png";
import gemas3 from "../../Images/gemas/gemas3.png";
import gemas4 from "../../Images/gemas/gemas4.png";
import gemas5 from "../../Images/gemas/gemas5.png";
import { fb } from "../../shared/service";

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

  // Função para atualizar gemas no Firebase
  const updateUserGemas = async (gemCount) => {
    const userRef = fb?.firestore.collection("UserStats").doc(id);
    await userRef.update({
      gemas: fb.increment(gemCount), // Adiciona a quantidade de gemas
    });
  };

  const handleCheckout = async (gemPackage) => {
    // Limpa todos os contêineres de botão do PayPal
    const allButtonContainers = document.querySelectorAll(
      "[id^='paypal-button-container-']"
    );
    allButtonContainers.forEach((container) => {
      container.innerHTML = ""; // Limpa o conteúdo de todos os contêineres
    });

    // Define o pacote ativo
    setActivePackage(gemPackage.id);

    // Renderiza o botão do PayPal
    window.paypal
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "BRL", // Define a moeda como BRL (Reais)
                  value: gemPackage.price, // Valor em reais
                },
                description: gemPackage.gemCount,
              },
            ],
          });
        },
        onApprove: async function (data, actions) {
          return actions.order.capture().then(async function (details) {
            alert(
              "Transação completada com sucesso por " +
                details.payer.name.given_name
            );

            // Aqui você pode adicionar lógica para adicionar gemas ao perfil do usuário
            const gemCount = gemPackage.gemCount; // Acessa a quantidade de gemas do novo campo
            await updateUserGemas(gemCount); // Atualiza as gemas no banco de dados
          });
        },
        onError: function (err) {
          console.error("Erro ao processar o pagamento", err);
          alert("Ocorreu um erro durante a transação.");
        },
      })
      .render(`#paypal-button-container-${gemPackage.id}`);
  };

  const gemPackages = [
    {
      id: "bundle100",
      image: gemas,
      title: "Punhado de LinkGems",
      description: "Bundle com 100 LinkGems",
      price: "3.90",
      gemCount: 100, // Novo campo
    },
    {
      id: "bundle200",
      image: gemas2,
      title: "Monte pequeno de LinkGems",
      description: "Bundle com 200 LinkGems",
      price: "7.90",
      gemCount: 200, // Novo campo
    },
    {
      id: "bundle300",
      image: gemas3,
      title: "Monte maior de LinkGems",
      description: "Bundle com 300 LinkGems",
      price: "11.90",
      gemCount: 300, // Novo campo
    },
    {
      id: "bundle500",
      image: gemas4,
      title: "Bolsa de LinkGems",
      description: "Bundle com 500 LinkGems",
      price: "14.90",
      gemCount: 500, // Novo campo
    },
    {
      id: "bundle1000",
      image: gemas5,
      title: "Baú de LinkGems",
      description: "Bundle com 1000 LinkGems",
      price: "29.90",
      gemCount: 1000, // Novo campo
    },
  ];

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
                          <div
                            id={`paypal-button-container-${gemPackage.id}`}
                            className="mt-2"
                          ></div>
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
