import React from "react";
import { ProgressBar } from "react-bootstrap";

function PaginaNivel({ nivel, xp, maxxp, userStyle }) {
  const estilo = {
    color: userStyle?.corTextoNivel,
  };
  return (
    <div className="paginaNivelWarper d-flex flex-column align-items-center w-50 mb-3">
      <h6 className="nivelLabel" style={estilo}>
        Nível <span className="text-success">{nivel}</span>
      </h6>
      <ProgressBar
        className="bar xp-bar"
        striped
        animated
        variant="success"
        now={xp}
        max={maxxp}
      />
    </div>
  );
}

export default PaginaNivel;
