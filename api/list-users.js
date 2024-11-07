import admin from "firebase-admin";

// Inicialize o Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),  // Ou a chave de serviço
  });
} else {
  admin.app(); // Usar a aplicação já inicializada
}

export default async function handler(req, res) {
  try {
    // Verifica se a requisição é um GET
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Método não permitido" });
    }

    let usersList = [];
    let result = await admin.auth().listUsers(1000);
    
    // Mapeia os usuários para um formato mais simples
    usersList = result.users.map((user) => ({
      id: user.uid,
      name: user.displayName,
      email: user.email,
      status: user.disabled ? "inativo" : "ativo",
      createdAt: user.metadata.creationTime,
    }));

    return res.status(200).json(usersList);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ message: "Erro ao listar usuários" });
  }
}
