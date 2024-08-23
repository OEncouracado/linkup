import React from "react"; // eslint-disable-next-line
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useAuth, UserCss, UserInfo } from "../../hook";
import { useLightMode } from "../Dashboard/LightModeContext";
import { Link } from "react-router-dom";
import sakura from "../../Images/molduras/sakura.png"

function Lojasublink() {
  const { authUser } = useAuth();
  const id = authUser?.uid;
  const userArray = UserInfo(id);
  const stats = userArray && userArray[0];
  const cssArray = UserCss(id);   // eslint-disable-next-line
  const css = cssArray && cssArray[0];
  const userName = stats?.linkUserName;
  const { isLightMode } = useLightMode();

  return (<>
    {authUser && (
      <div className="dashboardLinks d-flex flex-column align-items-center">
        <Alert variant="info" className="mb-2">
          Sua página já está disponível aqui:{" "}
          <Link to={`/${userName}`} target="_blank" rel="noreferrer">
            {userName}
          </Link>
          .
        </Alert>
        <Card bg={isLightMode ? "light" : "dark"} text={isLightMode ? "dark" : "light"} className="mb-3">
          <Card.Header style={isLightMode ? {} : { backgroundColor: "#272B2F" }}>Loja</Card.Header>
          <Card.Body className="">
            <Row>
              <Col md={4}>
                <Card bg={isLightMode ? "light" : "dark"} text={isLightMode ? "dark" : "light"} className="mb-3 pt-1" >
                  <Card.Img className="" variant="top" src={sakura} />

                  <Card.Body>
                    <Card.Title>Moldura Sakura </Card.Title>
                    <Button variant="void">Comprar R$</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    )}
  </>);
}

export default Lojasublink;
