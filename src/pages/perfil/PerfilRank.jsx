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
          .child(`decoracao_rank/${determinarFaixaRank(rank)}.png`);
        const url = await rankImageRef.getDownloadURL();
        setRankImageUrl(url);
      } catch (error) {
        console.error("Erro ao obter a URL da imagem de rank: ", error);
      }
    };

    getRankImageUrl();
  }, [rank]); // Executa sempre que o valor de "rank" mudar

  // Função para determinar a faixa de rank com base no valor de rank
  const determinarFaixaRank = (rank) => {
    if (rank >= 1000) {
      return "Mestre";
    } else if (rank >= 800) {
      return "Diamante";
    } else if (rank >= 600) {
      return "Platina";
    } else if (rank >= 400) {
      return "Ouro";
    } else if (rank >= 200) {
      return "Prata";
    } else if (rank >= 0) {
      return "Bronze";
    } else {
      return null;
    }
  };
  return (
    <div className="d-flex flex-column align-items-center w-50 my-3">
      <h6 className="nivelLabel">
        Rank <span className="text-success">{determinarFaixaRank(rank)}</span>
      </h6>
      <ProgressBar
        className="bar xp-bar"
        striped
        animated
        variant="success"
        now={rank}
        max={1000}
      />
      <img
        className="faixaRank w-100 mb-2 mt-4"
        src={rankImageUrl}
        alt=""
        srcset=""
        title={determinarFaixaRank(rank)}
      />
    </div>
  );
}

export default PerfilRank;
