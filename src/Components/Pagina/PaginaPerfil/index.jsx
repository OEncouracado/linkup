import React, { useEffect, useState } from "react";
import perfilNull from "../../../Images/perfil/perfil.jpg";
import { fb } from "../../../shared/service";

function PaginaPerfil({ username, perfil, selectedFrame, rank, userStyle }) {
  const estilo = {
    color: userStyle?.corTextoUserName,
    backgroundColor: userStyle?.fundoUserName,
    boxShadow: `0px 5px 15px ${userStyle?.corSombraUserName}`,
  };
  const [rankImageUrl, setRankImageUrl] = useState("");
  const [molduraImageUrl, setMolduraImageUrl] = useState("");

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
    const getMolduraImageUrl = async () => {
      try {
        // Substitua "NOME_DO_BUCKET" pelo nome do seu bucket no Firebase Storage
        const molduraImageRef = fb?.storage
          .ref()
          .child(`molduras/${selectedFrame}.png`);
        const url = await molduraImageRef.getDownloadURL();
        setMolduraImageUrl(url);
      } catch (error) {
        console.error("Erro ao obter a URL da imagem de rank: ", error);
      }
    };

    getMolduraImageUrl();
  }, [selectedFrame, rank]); // Executa sempre que o valor de "rank" mudar

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
    <div className="perfilsuperiorwarp d-flex bg-alert flex-column justify-content-center">
      <div className="frameepefilwarp d-flex justify-content-center align-items-center">
        {selectedFrame && (
          <img
            src={molduraImageUrl}
            alt={selectedFrame}
            className="paginaMolduraPerfil"
          />
        )}
        <img
          src={perfil ? perfil : perfilNull}
          alt="imagem de perfil"
          srcSet=""
          className="paginaImagePerfil rounded-circle"
        />
      </div>
      <img
        className="faixaRank w-100"
        src={rankImageUrl}
        alt=""
        srcset=""
        title={determinarFaixaRank(rank)}
      />
      <div
        className="usernamePaginaWarp d-flex justify-content-center align-items-center"
        style={estilo}
      >
        <p className="paginaUsernamePerfil mb-0 fw-bold text-center">
          {userStyle?.username}
        </p>
      </div>
    </div>
  );
}

export default PaginaPerfil;
