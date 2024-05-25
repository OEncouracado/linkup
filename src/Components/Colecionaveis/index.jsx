import React from "react";
import { Accordion, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserCss, UserInfo, useAuth, usePages } from "../../hook";
import ArquivodeConquistas from "./arquivodeConquistas";

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
  return (
    <div className="dashboardLinks pb-5 d-flex flex-column align-items-center">
      <Alert variant="info" className="mb-5">
        Sua página já está disponível aqui:{" "}
        <Link to={`/${username}`} target="_blank" rel="noreferrer">
          {username}
        </Link>
        .
      </Alert>

      <Accordion
        alwaysOpen
        defaultActiveKey={"0"}
        className="colecionaveisContainers"
      >
        <Accordion.Item
          eventKey="0"
          className="editFundo d-flex flex-column align-items-center"
        >
          <Accordion.Header className="w-100">Objetivos</Accordion.Header>
          <Accordion.Body>
            <ArquivodeConquistas id={id} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Colecionaveis;
