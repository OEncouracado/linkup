import React, { useState, useEffect } from "react";
import {getLeaderboard} from "./leaderboardService"

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Chama a função para obter o leaderboard ao montar o componente
    getLeaderboard()
      .then((data) => setLeaderboard(data))
      .catch((error) => console.error("Erro ao carregar o leaderboard:", error));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((user, index) => (
          <li key={user.uid}>
            {index + 1}. {user.uid} - XP: {user.xp} - Rank: {user.rank}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
