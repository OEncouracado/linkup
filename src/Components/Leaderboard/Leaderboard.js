import React, { useState, useEffect } from "react";
import {getLeaderboard} from "./leaderboardService"
import { useLightMode } from "../Dashboard/LightModeContext";
import { Button, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LeaderBoardRank from "./LeaderBoardRank";

// Função para calcular o nível com base no XP
const calculateLevel = (xp) => {
  // Exemplo simples: cada nível é alcançado a cada 1000 XP
  return Math.floor(xp / 1000);
};

function Leaderboard() {
  // eslint-disable-next-line
    const { isLightMode } = useLightMode();
    const [leaderboard, setLeaderboard] = useState([]);
    const navigate = useNavigate();
    const [orderBy, setOrderBy] = useState("xp"); // Estado para o critério de ordenação


  useEffect(() => {
    // Chama a função para obter o leaderboard ao montar o componente
    getLeaderboard(10, orderBy)
      .then((data) => setLeaderboard(data))
      .catch((error) => console.error("Erro ao carregar o leaderboard:", error));
  }, [orderBy]);

  const getButtonClass = (field) => {
    return orderBy === field ? "active-button" : "inactive-button";
  };
  const getButtonVariant = (field) => {
    return orderBy === field ? "void" : "secondary"; // 'primary' para o ativo, 'secondary' para o inativo
  };

  return (
    <div className="d-flex align-items-center justify-content-center fundoLeaderboard w-100 h-100">
      <i
        className="iconShowEditUsername fa fa-arrow-left mx-2"
        aria-hidden="true"
        title="Voltar"
        onClick={() => navigate(-1)}
      ></i>
      <div className="rounded p-5 mt-5 h-100 w-75 text-white bg-black">
        <h2>Leaderboard</h2>
         {/* Botões de critério de ordenação */}
      <div style={{ marginBottom: "1rem" }}>
        <Button
          onClick={() => setOrderBy("xp")}
          className="me-2"
          variant={getButtonVariant("xp")} // Determina a cor do botão
        >
          Ordenar por Nível
        </Button>
        <Button
          onClick={() => setOrderBy("rank")}
          className={getButtonClass("rank")}
          variant={getButtonVariant("rank")} // Determina a cor do botão
        >
          Ordenar por Rank
        </Button>
      </div>
      <ul className="p-0">
        {leaderboard.map((user, index) => {
          const userLevel =calculateLevel(user.xp)
            return (
            <Container className="rounded bg-dark p-2  mt-3">
              <li key={user.uid} style={{listStyle:"none"}} className="d-flex justify-content-between align-items-center text-center">
                <p className="m-0">{index + 1}.</p>
                <Image roundedCircle className="mx-2" style={{width:"3rem"}} src={user.imagemPerfil} alt="perfil"/>
                <p className="m-0" style={{width:"20rem"}}>{user.username}</p> 
                <p className="m-0" style={{width:"15rem"}}>Nível: {userLevel}</p> 
                <LeaderBoardRank rank={user.rank}/>
              </li>
            </Container>)
        })}
      </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
