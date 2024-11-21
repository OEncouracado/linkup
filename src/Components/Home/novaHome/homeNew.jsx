import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, ProgressBar, Form, InputGroup } from 'react-bootstrap';
import { FaLevelUpAlt, FaDiscord, FaCoins, FaCrown, FaUserFriends } from 'react-icons/fa';
import { RiVipCrown2Fill } from 'react-icons/ri';
import moca from "../../../Images/moca.png";
import { fb } from '../../../shared/service';
import "./novaHome.css"
import NovaHomeNavBar from './novaHomeNavBar';

// Opção 1
const Option1 = () => {
  const [username, setUsername] = useState("");
  const [usernameValido, setUsernameValido] = useState(false);
  const [bgChange, setBgChange] = useState("dark");
  const [bgChangeFree, setBgChangeFree] = useState("dark");

  
  const verificarUsername = async (username) => {
    try {
      const userNamesRef = fb.firestore.collection("linkUserNames");
      const snapshot = await userNamesRef
        .where("linkUserNames", "array-contains", username)
        .get();

      if (snapshot.empty) {
        // O displayName não está em uso
        setUsernameValido(true);
      } else {
        // O displayName já está em uso
        setUsernameValido(false);
      }
    } catch (error) {
      console.error("Erro ao verificar o displayName:", error);
      throw error;
    }
  };
  
  return (
    <div className="bg-img-gamer" >
      <Container className="bg-gradient-animated text-light m-0 px-5" style={{maxWidth:"100%"}} >
        <NovaHomeNavBar />
        <Row className="align-items-center flex-column-reverse flex-md-row">
          <Col md={7}>
            <h1 className="display-4 mb-4">Up de Nível com seus Links</h1>
            <p className="lead mb-4">
              Desbloqueie novos recursos e benefícios à medida que progride em nossa plataforma inspirada em jogos.
            </p>
            <Form.Group
              className="bg-dark p-3 rounded mb-3 w-75"
              style={{ height: "5rem" }}
            >
              <InputGroup>
                <InputGroup.Text>linkii.me/</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="nome de usuário"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    verificarUsername(e.target.value);
                  }}
                  isInvalid={!usernameValido || !username}
                  isValid={usernameValido}
                  required
                />
                <Button href='/Singup' variant="void" className="ms-1">
                  Crie Seu Link
                </Button>
                {username ? (
                  <Form.Control.Feedback type="invalid">
                    Esse usuário já está cadastrado.
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback type="invalid">
                    Digite um usuário.
                  </Form.Control.Feedback>
                )}
                <Form.Control.Feedback type="valid" />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={5}>
            <img src={moca} alt="Personagem de Jogo" className="img-fluid" />
          </Col>
        </Row>
      </Container>

      <div className="bg-secondary py-5">
        <Container>
          <h2 className="text-center mb-4">Seu Progresso</h2>
          <Row>
            <Col md={4} className="text-center">
              <FaLevelUpAlt size={48} className="mb-3" />
              <h4>Nível 5</h4>
              <ProgressBar 
                now={50} 
                animated 
                variant="success" 
                label={`Nível 5 - 50%`} 
              />
            </Col>
            <Col md={4} className="text-center">
              <FaCoins size={48} className="mb-3" />
              <h4>2.340 XP</h4>
              <ProgressBar now={75} animated label={`Rank Diamante`} />
            </Col>
            <Col md={4} className="text-center">
              <RiVipCrown2Fill size={48} className="mb-3 text-warning" />
              <h4>Status VIP</h4>
              <ProgressBar now={100} animated variant="success" />
            </Col>
          </Row>
        </Container>
      </div>

      <div className="bg-dark text-light py-5">
      <Container>
        <h2 className="text-center mb-5">Escolha seu Plano</h2>
        <Row className="justify-content-center">
          {/* Plano Free */}
          <Col md={5} className="mb-4">
            <Card 
             bg={bgChangeFree}
             onMouseEnter={() => setBgChangeFree("secondary")}
             onMouseLeave={() => setBgChangeFree("dark")}
              text="light" 
              className="h-100 shadow-lg transition-transform hover:scale-105 duration-300"
            >
              <Card.Body>
                <div className="text-center">
                  <FaUserFriends size={48} className="mb-3 text-primary" />
                  <h3>Plano Free</h3>
                  <p className="lead">Começe sua jornada de conexões</p>
                </div>
                
                <div className="pricing-section text-center mb-4">
                  <h4>R$ 0 <small>/mês</small></h4>
                  <h5 className={`text-${bgChangeFree === 'dark' ? 'secondary' : 'muted'}`}>R$ 0 <small>/ano</small></h5>
                </div>

                <ul className="list-unstyled mb-4">
                  <li className="mb-2">✅ Link personalizado básico</li>
                  <li className="mb-2">✅ Estatísticas simples</li>
                  <li className="mb-2">✅ Máximo de 5 links</li>
                  <li className="mb-2">❌ Personalizações avançadas</li>
                  <li className="mb-2">❌ Analíticas detalhadas</li>
                </ul>

                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="w-100"
                  href='/Singup'
                >
                  Continuar no Free
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Plano VIP */}
          <Col md={5} className="mb-4">
          <Card 
            bg={bgChange}
            onMouseEnter={() => setBgChange("secondary")}
            onMouseLeave={() => setBgChange("dark")}
            text="light" 
            border="primary" 
            className="transition-transform hover:scale-105 duration-300 h-100 shadow-lg position-relative overflow-hidden"
              >
                <div 
                className="position-absolute top-0 end-50 translate-middle-x bg-danger text-white px-3 py-1 rounded-bottom" 
                  style={{
                    zIndex: 10, 
                    width: 'auto', 
                    maxWidth: '80%'
                  }}
                >
                  Recomendado
                </div>
              <Card.Body>
                <div className="text-center">
                  <FaCrown size={48} className="mb-3 text-warning" />
                  <h3>Plano VIP</h3>
                  <p className="lead">Maximize seu potencial de links</p>
                </div>
                
                <div className="pricing-section text-center mb-4">
                  <h4>R$ 9,99 <small>/mês</small></h4>
                  <h5 className={`text-${bgChange === 'dark' ? 'secondary' : 'muted'}`}>R$ 99,90 <small>/ano</small> 
                    <span className="badge bg-success ms-2">Economize 15%</span>
                  </h5>
                </div>

                <ul className="list-unstyled mb-4">
                  <li className="mb-2">✅ Link personalizado premium</li>
                  <li className="mb-2">✅ Estatísticas avançadas</li>
                  <li className="mb-2">✅ Links ilimitados</li>
                  <li className="mb-2">✅ Temas e design personalizados</li>
                  <li className="mb-2">✅ Suporte prioritário</li>
                </ul>

                <Button 
                  href="/vippagamento"
                  variant="primary" 
                  size="lg" 
                  className="w-100"
                >
                  Assinar VIP
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    <div className="bg-secondary">
      <Container className="py-4">
        <Row>
          <Col md={6}>
            <Card bg="dark" text="light" className="h-100">
              <Card.Body>
                <Card.Title>
                  <FaDiscord size={32} className="mr-2" />
                  Comunidade do Discord
                </Card.Title>
                <Card.Text>
                  Entre em nosso servidor de Discord exclusivo e conecte-se com outros jogadores.
                </Card.Text>
                <Button variant="primary" size="lg">
                  Junte-se Agora
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card bg="dark" text="light" className="h-100">
              <Card.Body>
                <Card.Title>Desbloqueie Recompensas</Card.Title>
                <Card.Text>
                  Ganhe pontos de experiência e suba de nível para desbloquear benefícios e bônus especiais.
                </Card.Text>
                <Button variant="primary" size="lg">
                  Saiba Mais
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    </div>
  );
};

export { Option1 };