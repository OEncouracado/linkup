import React from "react";
import { Alert, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserCss, UserInfo, useAuth, usePages } from "../../hook";
import ArquivodeConquistas from "./arquivodeConquistas";
import { useLightMode } from "../Dashboard/LightModeContext";

function Colecionaveis() {
  const { authUser } = useAuth();
  const id = authUser?.uid;
  const userArray = UserInfo(id);
  const pageInfo = usePages(id);
  const cssArray = UserCss(id); // eslint-disable-next-line
  const css = cssArray && cssArray[0]; // eslint-disable-next-line
  const pages = pageInfo?.Links; // eslint-disable-next-line
  const stats = userArray && userArray[0];
  const username = stats?.linkUserName;
  const { isLightMode } = useLightMode();
  return (
    <div className="dashboardLinks pb-5 d-flex flex-column align-items-center">
      <Alert variant="info" className="mb-5">
        Sua página já está disponível aqui:{" "}
        <Link to={`/${username}`} target="_blank" rel="noreferrer">
          {username}
        </Link>
        .
      </Alert>
      <Card bg={isLightMode ? "light" : "dark"} text={isLightMode ? "dark" : "light"} className="mb-3">
        <Card.Header style={isLightMode ? {} : { backgroundColor: "#272B2F" }}>Objetivos</Card.Header>
        <Card.Body>
          <ArquivodeConquistas id={id} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default Colecionaveis;
