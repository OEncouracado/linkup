import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { fb } from "../../shared/service";

function PerfilRank({ rank }) {
  const [rankImageUrl, setRankImageUrl] = useState("");

  useEffect(() => {
    // Função para obter a URL da imagem de rank do Firebase Storage
    const getRankImageUrl = async () => {
      try {
        // Substitua "NOME_DO_BUCKET" pelo nome do seu bucket no Firebase Storage
        const rankImageRef = fb?.storage
          .ref()
          .child(`decoracao_rank/${rankDetails.nome}.png`);
        const url = await rankImageRef.getDownloadURL();
        setRankImageUrl(url);
      } catch (error) {
        console.error("Erro ao obter a URL da imagem de rank: ", error);
      }
    };

    getRankImageUrl(); // eslint-disable-next-line
  }, [rank]); // Executa sempre que o valor de "rank" mudar

  const determinarFaixaRank = (rank) => {
    const ranks = [
      { nome: "Bronze", min: 0, max: 199 },
      { nome: "Prata", min: 200, max: 399 },
      { nome: "Ouro", min: 400, max: 599 },
      { nome: "Platina", min: 600, max: 799 },
      { nome: "Diamante", min: 800, max: 999 },
      { nome: "Mestre", min: 1000, max: rank }
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
    <div className="d-flex flex-column align-items-center w-50 my-3">
      <h6 className="nivelLabel">
        Rank <span className="text-success">{rankDetails.nome}</span>
      </h6>
      <ProgressBar
        title={`${rank}/${rankDetails.max}`}
        className="bar xp-bar"
        striped
        animated
        variant="success"
        now={rank}
        min={rankDetails.min}
        max={rankDetails.max}
      />
      <img
        className="faixaRank w-100 mb-2 mt-4"
        src={rankImageUrl}
        alt=""
        srcSet=""
        title={rankDetails.nome}
      />
    </div>
  );
}

export default PerfilRank;