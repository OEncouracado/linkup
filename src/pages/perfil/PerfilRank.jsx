import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { fb } from "../../shared/service";

function PerfilRank({ rank }) {
  const [rankImageUrl, setRankImageUrl] = useState("");

  useEffect(() => {
    // Função para obter a URL da imagem de rank do Firebase Storage
    const getRankImageUrl = async () => {
      try {
        const rankImageRef = fb?.storage
          .ref()
          .child(`decoracao_rank/${determinarFaixaRank(rank).nome}.png`);
        const url = await rankImageRef.getDownloadURL();
        setRankImageUrl(url);
      } catch (error) {
        console.error("Erro ao obter a URL da imagem de rank: ", error);
      }
    };

    getRankImageUrl();
  }, [rank]);

  const determinarFaixaRank = (rank) => {
    const ranks = [
      { nome: "Bronze", min: 0, max: 99 },
      { nome: "Prata", min: 100, max: 399 },
      { nome: "Ouro", min: 400, max: 999 },
      { nome: "Platina", min: 1000, max: 1999 },
      { nome: "Diamante", min: 2000, max: 3999 },
      { nome: "Mestre", min: 4000, max: rank }
    ];

    for (let i = 0; i < ranks.length; i++) {
      if (rank <= ranks[i].max) {
        return ranks[i];
      }
    }
    return null;
  };

  const rankDetails = determinarFaixaRank(rank);

  if (!rankDetails) {
    return <div>Rank inválido</div>;
  }

  return (
    <div className="d-flex flex-column align-items-center w-100 mt-3">
      <h6 className="nivelLabel">
        Rank <span className="text-success">{rankDetails.nome}</span>
      </h6>
      <ProgressBar
        title={`${rank}/${rankDetails.max}`}
        className="bar xp-bar"
        striped
        animated
        variant="success"
        now={rank - rankDetails.min}
        min={0}
        max={rankDetails.max - rankDetails.min}
      />
      <img
        className="faixaRank w-100 mb-2 mt-4"
        src={rankImageUrl}
        alt={rankDetails.nome}
        title={rankDetails.nome}
      />
    </div>
  );
}

export default PerfilRank;
