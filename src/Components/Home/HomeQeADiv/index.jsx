import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function QeADiv() {
  return (
    <Container id="perguntas" className="homeqeadiv bg-light py-4">
      <Container>
        <section>
          <h3 className="text-center pb-2 text-black fw-bold">Perguntas <span className="text-primary">Frequentes</span></h3>
          <p className="text-center mb-5">
            Encontre as respostas para as dúvidas mais frequentes
          </p>

          <Row>
            <Col md="6" lg="4" className="mb-4 d-flex">
              <div className="faq-item d-flex flex-column h-100 p-3">
                <i
                  className="fa fa-user text-primary my-2 FAQIcons"
                  aria-hidden="true"
                />
                <h6 className="mb-3 text-primary">
                  Como posso criar uma conta?
                </h6>
                <p className="flex-grow-1">
                  Para criar uma conta, clique no botão "Cadastre-se" na parte
                  superior direita do site e preencha o formulário com suas
                  informações.
                </p>
              </div>
            </Col>
            <Col md="6" lg="4" className="mb-4 d-flex">
              <div className="faq-item d-flex flex-column h-100 p-3">
                <i
                  className="fas fa-coins text-primary my-2 FAQIcons"
                  aria-hidden="true"
                />
                <h6 className="mb-3 text-primary">
                  Quais métodos de pagamento são aceitos?
                </h6>
                <p className="flex-grow-1">
                  Aceitamos cartões de crédito, PayPal, Pix e transferências
                  bancárias.
                </p>
              </div>
            </Col>
            <Col md="6" lg="4" className="mb-4 d-flex">
              <div className="faq-item d-flex flex-column h-100 p-3">
                <i
                  className="fas fa-user-slash text-primary my-2 FAQIcons"
                  aria-hidden="true"
                />
                <h6 className="mb-3 text-primary">
                  Posso cancelar minha assinatura a qualquer momento?
                </h6>
                <p className="flex-grow-1">
                  Sim, você pode cancelar sua assinatura a qualquer momento
                  através da seção de configurações da sua conta.
                </p>
              </div>
            </Col>
            <Col md="6" lg="4" className="mb-4 d-flex">
              <div className="faq-item d-flex flex-column h-100 p-3">
                <i
                  className="fa fa-rocket text-primary my-2 FAQIcons"
                  aria-hidden="true"
                />
                <h6 className="mb-3 text-primary">
                  Existe um período de teste gratuito?
                </h6>
                <p className="flex-grow-1">
                  Trabalhamos com um sistema de VIP ou seja, somente algumas funções são pagas, o resto é gratis para usar.
                </p>
              </div>
            </Col>
            <Col md="6" lg="4" className="mb-4 d-flex">
              <div className="faq-item d-flex flex-column h-100 p-3">
                <i
                  class="fas fa-lock-open text-primary  my-2 FAQIcons"
                  aria-hidden="true"
                />
                <h6 className="mb-3 text-primary">
                  Como posso recuperar minha senha?
                </h6>
                <p className="flex-grow-1">
                  Clique em "Esqueci minha senha" na página de login e siga as
                  instruções para redefinir sua senha.
                </p>
              </div>
            </Col>
            <Col md="6" lg="4" className="mb-4 d-flex">
              <div className="faq-item d-flex flex-column h-100 p-3">
                <i class="fas fa-user-shield text-primary my-2 FAQIcons" aria-hidden="true" />

                <h6 className="mb-3 text-primary">
                  Os meus dados estão seguros?
                </h6>
                <p className="flex-grow-1">
                  Sim, utilizamos tecnologias de criptografia avançadas para
                  garantir que seus dados estejam sempre seguros.
                </p>
              </div>
            </Col>
            <Col md="6" lg="4" className="mb-4 d-flex">
              <div className="faq-item d-flex flex-column h-100 p-3">
                <i
                  className="fas fa-file-signature text-primary my-2 FAQIcons"
                  aria-hidden="true"
                />
                <h6 className="mb-3 text-primary">
                  Posso mudar meu plano de assinatura?
                </h6>
                <p className="flex-grow-1">
                  Sim, você pode mudar seu plano de assinatura a qualquer
                  momento através da seção de assinaturas na sua conta.
                </p>
              </div>
            </Col>
            <Col md="6" lg="4" className="mb-4 d-flex">
              <div className="faq-item d-flex flex-column h-100 p-3">
                <i
                  className="fas fa-headset text-primary my-2 FAQIcons"
                  aria-hidden="true"
                />
                <h6 className="mb-3 text-primary">
                  Há suporte ao cliente disponível?
                </h6>
                <p className="flex-grow-1">
                  Sim, oferecemos suporte ao cliente 24/7 através de chat ao
                  vivo e e-mail.
                </p>
              </div>
            </Col>
            <Col md="6" lg="4" className="mb-4 d-flex">
              <div className="faq-item d-flex flex-column h-100 p-3">
                <i
                  className="fas fa-credit-card text-primary my-2 FAQIcons"
                  aria-hidden="true"
                />
                <h6 className="mb-3 text-primary">
                  Como faço para atualizar minhas informações de pagamento?
                </h6>
                <p className="flex-grow-1">
                  Vá para a seção de faturamento no seu painel de controle e
                  atualize suas informações de pagamento conforme necessário.
                </p>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </Container>
  );
}

export default QeADiv;
