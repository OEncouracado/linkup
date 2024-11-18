import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, ProgressBar, Form, InputGroup } from 'react-bootstrap';
import { FaLevelUpAlt, FaDiscord, FaCoins,} from 'react-icons/fa';
import { RiVipCrown2Fill } from 'react-icons/ri';
import moca from "../../../Images/moca.png";
import HomeTopbar from '../HomeTopbar';
import Footer from '../Footer';
import { fb } from '../../../shared/service';

// Opção 1
const Option1 = () => {
  const [username, setUsername] = useState("");
  const [usernameValido, setUsernameValido] = useState(false);
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
      throw error; // Você pode tratar o erro de acordo com sua lógica de tratamento de erros
    }
  };
  return (<>
    <HomeTopbar />
    <div className="bg-dark text-light mb-0" style={{paddingTop:"5rem"}}>
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="display-4 mb-4">Level Up Your Links</h1>
            <p className="lead mb-4">
              Unlock new features and benefits as you progress through our gamer-inspired platform.
            </p>
            <Form.Group
              className="bg-dark p-3 rounded mb-3"
              style={{ height: "5rem" }}
            >
              <InputGroup>
                <InputGroup.Text>linkii.me/</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    verificarUsername(e.target.value);
                  }}
                  isInvalid={!usernameValido || !username}
                  isValid={usernameValido}
                  required
                />
                <Button href='/Singup' variant="primary"  className="ms-1">
              Crie seu Link
            </Button>
                {username ? (
                  <Form.Control.Feedback type="invalid">
                    Esse Usuário já está Cadastrado.
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
          <Col md={6}>
            <img src={moca} alt="Gamer Character" className="img-fluid" />
          </Col>
        </Row>
      </Container>

      <div className="bg-secondary py-5">
        <Container>
          <h2 className="text-center mb-4">Your Progress</h2>
          <Row>
            <Col md={4} className="text-center">
              <FaLevelUpAlt size={48} className="mb-3" />
              <h4>Level 5</h4>
              <ProgressBar now={50} />
            </Col>
            <Col md={4} className="text-center">
              <FaCoins size={48} className="mb-3" />
              <h4>2,340 XP</h4>
              <ProgressBar now={75} />
            </Col>
            <Col md={4} className="text-center">
              <RiVipCrown2Fill size={48} className="mb-3 text-warning" />
              <h4>VIP Status</h4>
              <ProgressBar now={100} variant="success" />
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <Card bg="dark" text="light" className="mb-4">
              <Card.Body>
                <Card.Title>
                  <FaDiscord size={32} className="mr-2" />
                  Discord Community
                </Card.Title>
                <Card.Text>
                  Join our exclusive Discord server and connect with fellow gamers.
                </Card.Text>
                <Button variant="primary" size="lg">
                  Join Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card bg="dark" text="light" className="mb-4">
              <Card.Body>
                <Card.Title>Unlock Rewards</Card.Title>
                <Card.Text>
                  Earn experience points and climb the ranks to unlock special perks and bonuses.
                </Card.Text>
                <Button variant="primary" size="lg">
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    <Footer/>
    </>);
};

export { Option1};