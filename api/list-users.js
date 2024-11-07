// api/list-users.js

import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Ou use sua chave de serviço aqui
  });
} else {
  admin.app();
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Método não permitido" });
    }

    const usersList = [];
    const result = await admin.auth().listUsers(1000); // Listando usuários do Firebase Auth
    result.users.forEach((user) => {
      usersList.push({
        id: user.uid,
        name: user.displayName,
        email: user.email,
        status: user.disabled ? "inativo" : "ativo",
        createdAt: user.metadata.creationTime,
      });
    });

    return res.status(200).json(usersList); // Retornando a lista de usuários
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ message: "Erro ao listar usuários" });
  }
}
