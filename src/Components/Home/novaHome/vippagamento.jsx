import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { FaCrown, FaCreditCard, FaCheck } from 'react-icons/fa';

const CompraVip = () => {
  const [planoSelecionado, setPlanoSelecionado] = useState('mensal');
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div className="bg-dark text-light py-5">
      <Container>
        <Row className="justify-content-center">
          {/* Seção de Seleção de Plano */}
          <Col md={6} className="mb-4">
            <Card bg="dark" text="light" className="h-100 shadow-lg">
              <Card.Body>
                <div className="text-center mb-4">
                  <FaCrown size={48} className="text-warning mb-3" />
                  <h2>Assinar Plano VIP</h2>
                </div>

                {/* Seletor de Plano */}
                <div className="d-flex justify-content-center mb-4">
                  <Button 
                    variant={planoSelecionado === 'mensal' ? 'primary' : 'outline-light'}
                    className="me-3"
                    onClick={() => setPlanoSelecionado('mensal')}
                  >
                    Mensal
                  </Button>
                  <Button 
                    variant={planoSelecionado === 'anual' ? 'primary' : 'outline-light'}
                    onClick={() => setPlanoSelecionado('anual')}
                  >
                    Anual
                  </Button>
                </div>

                {/* Detalhes do Plano */}
                <div className="text-center mb-4">
                  {planoSelecionado === 'mensal' ? (
                    <>
                      <h3>R$ 9,99 <small>/mês</small></h3>
                      <p className="text-muted">Faturamento mensal</p>
                    </>
                  ) : (
                    <>
                      <h3>R$ 99,90 <small>/ano</small></h3>
                      <div className="d-flex justify-content-center text-center">
                        <p className="text-ligth bg-success w-25 rounded">Economize 15%</p></div>
                    </>
                  )}
                </div>

                {/* Benefícios */}
                <ul className="list-unstyled mb-4">
                  <li className="mb-2"><FaCheck className="text-success me-2" /> Links ilimitados</li>
                  <li className="mb-2"><FaCheck className="text-success me-2" /> Estatísticas avançadas</li>
                  <li className="mb-2"><FaCheck className="text-success me-2" /> Temas personalizados</li>
                  <li className="mb-2"><FaCheck className="text-success me-2" /> Suporte prioritário</li>
                </ul>

                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-100"
                  onClick={handleShowModal}
                >
                  <FaCreditCard className="me-2" /> Assinar Agora
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal de Pagamento */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>Finalizar Assinatura</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome no Cartão</Form.Label>
              <Form.Control type="text" placeholder="Nome completo" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Número do Cartão</Form.Label>
              <Form.Control type="text" placeholder="0000 0000 0000 0000" />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Validade</Form.Label>
                  <Form.Control type="text" placeholder="MM/AA" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control type="text" placeholder="000" />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" className="w-100">
              Confirmar Pagamento
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CompraVip;