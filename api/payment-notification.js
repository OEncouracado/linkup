// /api/payment-notification.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

// Inicialize o Firebase (adapte com as suas credenciais)
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY, // Defina essas variáveis no ambiente
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  });
} else {
  firebase.app(); // Use o Firebase App já inicializado
}

const database = firebase.database();
const firestore = firebase.firestore();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { status, external_reference } = req.body;

    if (status === "approved") {
      const [userId, gemCountStr] = external_reference.split("-");
      const gemCount = parseInt(gemCountStr, 10); // Converte para número
      
      if (isNaN(gemCount)) {
        console.error("gemCount inválido:", gemCountStr);
        return res.status(400).json({ message: "Erro: gemCount inválido" });
      }

      try {
        // Referência ao documento do usuário no Firestore
        const userDocRef = firestore.collection("UserStats").doc(userId);

        // Atualiza o campo "gemas" incrementando a quantidade adquirida
        await userDocRef.update({
          gemas: firebase.firestore.FieldValue.increment(gemCount),
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
