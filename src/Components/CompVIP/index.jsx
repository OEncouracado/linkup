import React from 'react';
import { Card, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useAuth, UserInfo } from '../../hook';
import { useLightMode } from '../Dashboard/LightModeContext';

function VIPSection({id}) {
  const userArray = UserInfo(id);
  const stats = userArray && userArray[0];
  const { isLightMode } = useLightMode();

  console.log('vip :>> ', id, stats?.vipExpirationDate);

  const isVIP = stats?.VIP === true && 
               stats?.vipExpirationDate > Date.now();

  console.log('isVIP :>> ', isVIP);

  const VIPPackages = [
    {
      id: 'vip-1-month',
      title: 'VIP 1 Mês',
      price: 29.99,
      description: 'Benefícios VIP por 30 dias',
      benefits: [
        "Canal Exclusivo no Discord", 
        "Suporte Prioritário", 
        "Conteúdo Exclusivo"
      ]
    },
    {
      id: 'vip-3-months',
      title: 'VIP 3 Meses',
      price: 79.99,
      description: 'Benefícios VIP por 90 dias',
      benefits: [
        "Todos benefícios do VIP 1 Mês",
        "Desconto Adicional",
        "Prioridade em Novos Recursos"
      ]
    }
  ];

  const handleVIPCheckout = async (vipPackage) => {
    try {
      const response = await fetch("/api/create-vip-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: vipPackage.title,
          quantity: 1,
          price: vipPackage.price,
          userId: id
        }),
      });
      
      const data = await response.json();
  
      if (data.init_point) {
        window.open(data.init_point, 'Pagamento VIP', 'width=800,height=600');
      } else {
        console.error('Erro ao obter URL do pagamento:', data.message);
        alert('Erro ao processar pagamento VIP.');
      }
    } catch (error) {
      console.error('Erro ao redirecionar para o pagamento VIP:', error);
      alert('Erro ao processar pagamento VIP.');
    }
  };

  return (
    <Container>
      <Card
        bg={isLightMode ? "light" : "dark"}
        text={isLightMode ? "dark" : "light"}
        className="mb-3"
      >
        <Card.Header style={isLightMode ? {} : { backgroundColor: "#272B2F" }}>
          Área VIP
        </Card.Header>
        
        {isVIP && (
          <Alert variant="success" className="m-2">
            Seu status VIP é válido até: {new Date(stats.vipExpirationDate).toLocaleDateString()}
          </Alert>
        )}
        
        <Card.Body>
          <Row>
            {VIPPackages.map((vipPackage) => (
              <Col md={6} key={vipPackage.id}>
                <Card bg="dark" text="light" className="mb-3 pt-1">
                  <Card.Body>
                    <Card.Title>{vipPackage.title}</Card.Title>
                    <p>{vipPackage.description}</p>
                    <ul>
                      {vipPackage.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                    <Button
                      className="w-100"
                      variant="void"
                      onClick={() => handleVIPCheckout(vipPackage)}
                    >
                      {isVIP ? 'Renovar' : 'Assinar'} - R$ {vipPackage.price}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default VIPSection;