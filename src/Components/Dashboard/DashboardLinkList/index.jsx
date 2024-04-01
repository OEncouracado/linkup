import React, { useState } from "react";
import DashboardLink from "../DashboardLink";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ModalAdd from "../../ModalAdd";

function DashboardLinkList({ pages }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Adicionar novo Link
    </Tooltip>
  );

  return (
    <div className="linksList pt-4">
      <p className="dashboardtituloLinks">Links</p>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip()}
      >
        <i
          className="addLink fa fa-plus-circle ms-3"
          onClick={handleShow}
          aria-hidden="true"
        ></i>
      </OverlayTrigger>
      <div className="d-flex flex-column">
        {pages?.Links.map((link, index) => (
          <DashboardLink
            key={index}
            url={link.url}
            nomeLink={link.nome}
            idPage={pages?.id}
          />
        ))}
      </div>
      <ModalAdd show={show} setShow={setShow} />{" "}
      {/* Passando corretamente show e setShow */}
    </div>
  );
}

export default DashboardLinkList;
