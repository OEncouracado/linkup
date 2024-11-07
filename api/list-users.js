// api/list-users.js

import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
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
    const result = await admin.auth().listUsers(1000);
    result.users.forEach((user) => {
      usersList.push({
        id: user.uid,
        name: user.displayName,
        email: user.email,
        status: user.disabled ? "inativo" : "ativo",
        createdAt: user.metadata.creationTime,
      });
    });

    return res.status(200).json(usersList);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ message: "Erro ao listar usuários" });
  }
}
