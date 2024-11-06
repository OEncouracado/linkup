// /api/payment-notification.js
import { fb } from "../src/shared/service"; // Certifique-se de que este caminho esteja correto

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { status, external_reference } = req.body; // Ajuste conforme a estrutura da notificação

    if (status === "approved") {
      const [userId, gemCountStr] =  external_reference.split("-");
      const gemCount = parseInt(gemCountStr, 10); // Converte para número
      
      if (isNaN(gemCount)) {
        console.error("gemCount inválido:", gemCountStr);
        return res.status(400).json({ message: "Erro: gemCount inválido" });
      }
      // Atualize as gemas do cliente no Firestore
      try {
        const userRef = fb.firestore().collection('userStats').doc(userId);

        // Atualiza o campo "gemas" somando a quantidade de gemas do pacote adquirido
        await userRef.update({
          gemas: fb.increment(gemCount),
        });

        console.log("Gemas atualizadas com sucesso para o usuário:", userId);
        res.status(200).json({ message: "Gemas atualizadas com sucesso" });
      } catch (error) {
        console.error("Erro ao atualizar gemas:", error);
        res.status(500).json({ message: "Erro ao atualizar gemas" });
      }
    } else {
      res.status(200).json({ message: "Pagamento não aprovado." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
