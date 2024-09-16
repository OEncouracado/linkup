import React from "react";
import { logEvent } from '../../../hook/analytics'; // Para logar eventos de analytics
import { fb } from "../../../shared/service";

function PaginaLink({ url, nome, linkEstilo, usuario }) {
  const userEstilo = {
    backgroundColor: linkEstilo?.corBotao,
    color: linkEstilo?.corTextoBotao,
    boxShadow: `0px 5px 15px ${linkEstilo?.corSombraBotao}`,
    borderRadius: `${linkEstilo?.raiodaBorda}rem`,
    backgroundImage: `URL(${linkEstilo?.fundoImgBotao})`,
    borderWidth: `${linkEstilo?.borderWith}rem`,
    borderStyle: linkEstilo?.borderStyle,
    borderColor: linkEstilo?.borderColor,
  };

  const handleLinkClick = async (e) => {
    e.preventDefault(); // Impede o redirecionamento imediato
    try {
      const userStatsRef = fb?.firestore.collection("UserStats").where("linkUserName", "==", usuario);
      const querySnapshot = await userStatsRef.get();

      if (!querySnapshot.empty) {
        const userStatsDoc = querySnapshot.docs[0];
        const userId = userStatsDoc.id;
        const currentXP = userStatsDoc.data().xp || 0;
        const currentRank = userStatsDoc.data().rank || 0;

        // Incrementa XP e Rank ao clicar no link
        const newXP = currentXP + 1;
        const newRank = currentRank + 1;

        await fb?.firestore.collection("UserStats").doc(userId).update({
          xp: newXP,
          rank: newRank
        });

        logEvent('link_click', {
          userId: userId,
          linkUserName: usuario,
          newXP: newXP,
          newRank: newRank,
          clickedLink: url
        });

        console.info(`XP atualizado para ${newXP} e Rank para ${newRank} ao acessar o link ${url}`);
      } else {
        console.error("Usuário não encontrado na coleção UserStats.");
      }

      // Após atualizar, redireciona para o link
      window.open(url, "_blank");
    } catch (error) {
      console.error("Erro ao atualizar o XP e Rank do usuário:", error);
    }
  };

  return (
    <a
      className="paginaLink"
      style={userEstilo}
      href={url}
      onClick={handleLinkClick}
      target="_blank"
      rel="noreferrer"
    >
      <div className="linkPage">{nome}</div>
    </a>
  );
}

export default PaginaLink;
