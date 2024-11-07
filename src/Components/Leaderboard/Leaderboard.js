import React, { useState, useEffect } from "react";
import {getLeaderboard} from "./leaderboardService"
import { useLightMode } from "../Dashboard/LightModeContext";
import { Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
    const { isLightMode } = useLightMode();
    const [leaderboard, setLeaderboard] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    // Chama a função para obter o leaderboard ao montar o componente
    getLeaderboard()
      .then((data) => setLeaderboard(data))
      .catch((error) => console.error("Erro ao carregar o leaderboard:", error));
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center fundoLeaderboard w-100 h-100">
      <i
        className="iconShowEditUsername fa fa-arrow-left mx-2"
        aria-hidden="true"
        title="Voltar"
        onClick={() => navigate(-1)}
      ></i>
      <div className="rounded p-5 mt-5 h-100 text-white bg-black">
        <h2>Leaderboard</h2>
      <ul className="p-0">
        {leaderboard.map((user, index) => (
          <Container className="rounded bg-dark p-1 mt-3">
            <li key={user.uid} style={{listStyle:"none"}}>
            {index + 1}.<Image roundedCircle className="mx-2" style={{width:"3rem"}} src={user.imagemPerfil} alt="perfil"/>  {user.username} - XP: {user.xp} - Rank: {user.rank}
          </li>
          </Container>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
