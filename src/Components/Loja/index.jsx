import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row, Modal } from "react-bootstrap";
import { useAuth, UserCss, UserInfo } from "../../hook";
import { useLightMode } from "../Dashboard/LightModeContext";
import { Link, useNavigate } from "react-router-dom"; // useHistory para redirecionamento
import gema from "../../Images/gemas/gema.png";
import { fb } from "../../shared/service";

function Lojasublink({ setAba }) {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const userArray = UserInfo(id);
    const stats = userArray && userArray[0];
    const cssArray = UserCss(id); // eslint-disable-next-line
    const css = cssArray && cssArray[0];
    const userName = stats?.linkUserName;
    const { isLightMode } = useLightMode();
    const navigate = useNavigate(); // Para redirecionar

    const [allItens, setAllItens] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", body: "", onConfirm: null });

    useEffect(() => {
        fb?.firestore
            .collection("itensLoja")
            .doc("1QhlGiAJzSY7F2POnI9R")
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setAllItens(doc.data().Itens || []);
                } else {
                    console.log("Documento não encontrado");
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar itens da loja:", error);
            });
    }, []);

    const handleBuy = (item) => {
        if (stats?.userMolduras?.includes(item.value)) {
            // Se o item já foi comprado
            setModalContent({
                title: "Item já adquirido",
                body: `Você já possui ${item.nome}.`,
                onConfirm: () => setShowModal(false), // Apenas fecha o modal
            });
            setShowModal(true);
            return;
        }

        if (stats?.gemas >= item.preco) {
            // Se o usuário tiver gemas suficientes
            setModalContent({
                title: "Confirmação de Compra",
                body: `Você quer realmente comprar ${item.nome} por ${item.preco} gemas?`,
                onConfirm: async () => {
                    try {
                        const newGemas = stats.gemas - item.preco;
                        await fb?.firestore.collection("UserStats").doc(id).update({
                            gemas: newGemas,
                            userMolduras: fb.arrayUnion(item.value),
                        });
                        setShowModal(false); // Fecha o modal após compra bem-sucedida
                        window.alert(`Compra bem-sucedida! Você comprou ${item.nome}`);
                    } catch (error) {
                        console.error("Erro ao processar a compra:", error);
                        window.alert("Erro ao processar a compra.");
                    }
                }
            });
            setShowModal(true);
        } else {
            // Se o usuário tiver gemas insuficientes
            setModalContent({
                title: "Gemas Insuficientes",
                body: "Você não tem gemas suficientes para comprar este item. Deseja comprar mais gemas?",
                onConfirm: () => {
                    setShowModal(false); // Fecha o modal e redireciona
                    setAba("gemas"); // Redireciona para a página de compra de gemas
                },
            });
            setShowModal(true);
        }
    };

    return (
        <>
            {authUser && (
                <div className="dashboardLinks d-flex flex-column align-items-center">
                    <Alert variant="info" className="mb-2">Sua página já está disponível aqui:{" "}
                        <Link to={`/${userName}`} target="_blank" rel="noreferrer">
                            {userName}
                        </Link>.
                    </Alert>

                    <Container>
                        <Card
                            bg={isLightMode ? "light" : "dark"}
                            text={isLightMode ? "dark" : "light"}
                            className="mb-3"
                        >
                            <Card.Header style={isLightMode ? {} : { backgroundColor: "#272B2F" }}>Loja</Card.Header>
                            <Card.Body>
                                <Row>
                                    {allItens.length > 0 ? (
                                        allItens.map((item, index) => (
                                            <Col md={4} key={index}>
                                                <Card bg="dark" text="light" className="mb-3 pt-1">
                                                    <Card.Img
                                                        style={{ width: "10rem" }}
                                                        variant="top"
                                                        src={item.imagem}
                                                        alt={item.nome}
                                                    />
                                                    <Card.Body className="px-2">
                                                        <Card.Title>{item.nome}</Card.Title>
                                                        <p>{item.descricao}</p>
                                                        <Button variant="void" onClick={() => handleBuy(item)}>
                                                            <div className="d-flex justify-content-center align-items-center">
                                                                <img
                                                                    className="me-1"
                                                                    src={gema}
                                                                    alt="gema"
                                                                    style={{ width: "15%" }}
                                                                />{" "}
                                                                {item.preco}
                                                            </div>
                                                        </Button>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))
                                    ) : (
                                        <Col>
                                            <p>Nenhum item disponível na loja.</p>
                                        </Col>
                                    )}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            )}

            {/* Modal para confirmação de compra e gemas insuficientes */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Body style={{ backgroundColor: "transparent" }} className="">
                    <Card
                        bg={isLightMode ? "light" : "dark"}
                        text={isLightMode ? "dark" : "light"}
                    >
                        <Card.Header
                            style={isLightMode ? {} : { backgroundColor: "#272B2F" }}
                        >
                            <Card.Title className="">
                                <Row className="me-2 align-items-center">
                                    <Col xs={11}>
                                        <h3 className="m-0">{modalContent.title}</h3>
                                    </Col>
                                    <Col className="" xs={1}>
                                        <Button variant="outline-danger" onClick={() => setShowModal(false)}>
                                            X
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {modalContent.body}
                        </Card.Body>
                        <Card.Footer className="">
                            <Row className="me-1 align-items-center">
                                <Col className="">
                                    <Button
                                        variant="outline-success"
                                        className=""
                                        onClick={modalContent.onConfirm}
                                    >
                                        Adicionar Link
                                    </Button>
                                </Col>
                                <Col className="d-flex justify-content-end pe-0 me-0">
                                    <Button variant="outline-danger" onClick={() => setShowModal(false)}>
                                        Fechar
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Lojasublink;
