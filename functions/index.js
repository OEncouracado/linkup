const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.listUsers = functions.https.onRequest((req, res) => {
  const usersList = [];
  const listAllUsers = (nextPageToken) => {
    admin.auth().listUsers(1000, nextPageToken).then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        usersList.push({
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          disabled: userRecord.disabled,
          createdAt: userRecord.metadata.creationTime,
        });
      });
      if (listUsersResult.pageToken) {
        // Se houver mais usuários, lista a próxima página
        listAllUsers(listUsersResult.pageToken);
      } else {
        res.status(200).send(usersList);
      }
    })
        .catch((error) => {
          console.error("Erro ao listar usuários:", error);
          res.status(500).send("Erro ao listar usuários");
        });
  };

  // Chama a função para listar os usuários
  listAllUsers();
});
