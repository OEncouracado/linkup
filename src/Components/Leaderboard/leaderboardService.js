
import { fb } from './../../shared/service/firebase';

// Função para obter o leaderboard
export async function getLeaderboard(topN = 10, orderByField = "xp") {

  try {
    const leaderboard = [];
    // Query para obter os topN usuários ordenados por 'xp' em ordem decrescente
    const snapshot = await fb.firestore
      .collection("UserStats")
      .orderBy(orderByField, "desc") // Altere para "rank" para ordenar por rank
      .limit(topN)
      .get();

    snapshot.forEach((doc) => {
      leaderboard.push({
        uid: doc.id,
        ...doc.data(),
      });
    });

    return leaderboard; // Retorna o array com os usuários ordenados
  } catch (error) {
    console.error("Erro ao obter leaderboard:", error);
    throw error;
  }
}
