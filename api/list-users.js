// api/list-users.js

import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCnRr3eDkbBkM+7\nxTN0lMM/09jeDzmZX400bQRXCxA8S61b4s7ENK5scrE5YcNGm2rjcqa2mguwM317\n5xk6BPCen4M+183683UlxpTbyzUwNU0eC+9iM96X8qnCO3gNPqOCiJSxFJkhZ+/l\ntmWSez+aNSudkbAKwLIXIkM7UeXyST1mbIXSMylAeR0Zyr7i+g/n0nMFr1M4ZW+U\nhhusjrFQBdo8DQv53807x6+0R1bnVPfLAJFB5HikhICY9No+VqizGDxbLgGGPf2Z\nYu2vkCOaCgnbbht+GbxgLOmswofkKv0N2ECItDEzoWJvA2lq1NepkQakcdV/3yiS\nKmxGGpcrAgMBAAECggEANM0ou8JH5Wvflsbdwiv/IdOuPhISPW6i9OyAlTVBz7aX\np0yFtftnH4ZomNNaP5xpdhhHtZYUoG7waj79gIn0pi110U1vkIpu7Ris/mA7jtcU\nW6qqypXS6qXHni8FazDdjiOsw+TbnWbgm+MiVsWewv+Ln/ZP2mUPEixXio8EhaDE\nF8G82PynpyngWMqCAyUwR7voDhNs7xfg9/rKXCPktsOSmFsG65mam8q8Sxddg1HG\n8Mt9wcBZmnmG0zqy7wnG0lYP5J46wALepQErZKiZRY5K94ptrC4p7wUho3lhovn+\nk4Cl1MfbrjV+lbi2ZXrgosAQlcFFOqSkcxKRvjEfAQKBgQDUdzAWxxKTolTTsDYv\nDBBCuXG+HVRcfus8DXfmT5z/NHpgCiNs8kxoGGmhupGdp0D8XBFwEohXHjZeIpVf\nPpOpogct7h4QRU809gJ/Dozd0vFxe7e6ooyjIgPeHLSQPC4qNSCJRus/9c3LFchU\n8hy/ugMqPGB2WyL7HIwC57w2gQKBgQDJjSq66uJnqNbplcw23jyb9GYhJrs6aK8N\nxf9RNR5VeSIAXWDDd0pBt1rWB9JNXqDOOH3Racr+VSArop6ELBFIJsxlv1dz19yr\nzmHAV7qFcdzt4vsOeGFtFKREOFDtPpUjwpBShRI7ua9Y/RiHGRtpxpWg1fvTvbcm\n91UeAiCvqwKBgQCTx5MbRLwXFAIMe7Q0ZR+qSXJj2eKjs2PLEVMkTpvUppu30VVy\nodWjUdenNi2yinMZFLDMUxeiANGwCD39UXlDs/9qYwVmK8879yElXul8IQzu8i6J\nEibgEPi/tReiezlhAjLvSPS4ODA74ZrF+uEkOi2ZYwV1TU63etOn8adoAQKBgBH2\nm/VW0+DrQmRFLpNBUWOQ771Kp2s4Q0nV+MBzHIX/qtEfgW1KZ3rd7aGfxtWQdoKK\ntGQCqs3qJljdQIWFK/EjTBpRaGjxt0A0v6+V4hDcqhUlorySbBR9v3o5DrVmW4J5\nZ8WDCLH8Ba3HuPTpfvD5ewJ/r9caVIWLi7GF/QXLAoGBALpdroZSXpoVFplxSMGr\nXylYvi/sUNgecmWMrJJtdfebsYmJ9FrA7mQzKA8bjUgguMBlVAp+ppSeHlyV15Hl\nJmU5aYPaUjg6WAZuMpewdexkv8qvoKl4PeoOVD9wdG54OLGQYqQuljJ2KQN2RQpk\nA89xLu74BH53bwD4YfECXc6W\n-----END PRIVATE KEY-----\n",
    }),
  });
} else {
  admin.app();
}

console.log("Firebase Private Key (first and last 5 characters):", 
    process.env.FIREBASE_PRIVATE_KEY.slice(0, 5) + "..." + process.env.FIREBASE_PRIVATE_KEY.slice(-5)
);

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
