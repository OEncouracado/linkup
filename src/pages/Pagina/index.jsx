import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLinkPages, UseLinkCss, UseLinkInfo, useAuth, UserInfo } from "./../../hook";
import PaginaPerfil from "./../../Components/Pagina/PaginaPerfil/index";
// eslint-disable-next-line
import PaginaNivel from "./../../Components/Pagina/PaginaNivel/index";
import PaginaLinkList from "./../../Components/Pagina/PaginaLinkList/index";
import { Helmet } from "react-helmet";
// eslint-disable-next-line
import { Button, Container } from "react-bootstrap";
import { fb } from "../../shared/service";
import { logEvent } from './../../hook/analytics';

function Pagina() {
  const { usuario } = useParams();
  const { authUser } = useAuth();
  const UID = authUser?.uid;
  const statsUserArray = UserInfo(UID);
  const statsUser = statsUserArray && statsUserArray[0];
  const linkUserName = statsUser?.linkUserName
  const pagesArray = useLinkPages(usuario);
  const cssArray = UseLinkCss(usuario);
  const infoArray = UseLinkInfo(usuario);
  const pages = pagesArray && pagesArray[0];
  const css = cssArray && cssArray[0];
  const stats = infoArray && infoArray[0];
  const [exibirA, setExibirA] = useState(true);

  const handleClose = () => {
    setExibirA(false);
  };

  useEffect(() => {
    if (linkUserName === usuario) {
      console.log(`Usuário logado acessou sua própria página. XP não foi incrementado.`);
    } else {
      const updateXP = async () => {
        // Verifica se o usuário logado não é o mesmo cuja página está sendo acessada

        try {
          // Obtenha o documento de UserStats com base no linkUserName (usuario)
          const userStatsRef = fb.firestore.collection("UserStats").where("linkUserName", "==", usuario);
          const querySnapshot = await userStatsRef.get();

          if (!querySnapshot.empty) {
            const userStatsDoc = querySnapshot.docs[0];
            const userId = userStatsDoc.id;
            const currentXP = userStatsDoc.data().xp || 0;

            console.log("userId from Firestore: ", userId);
            console.log("currentXP: ", currentXP);

            const newXP = currentXP + 1; // Aumente o XP por 1 a cada acesso

            await fb.firestore.collection("UserStats").doc(userId).update({ xp: newXP });
            logEvent('page_view', {
              userId: userId,
              linkUserName: usuario,
              newXP: newXP
            });

            console.log(`XP atualizado para ${newXP} para o usuário ${usuario}`);
          } else {
            console.error("Usuário não encontrado na coleção UserStats.");
          }
        } catch (error) {
          console.error("Erro ao atualizar o XP do usuário:", error);
        }
      }
      updateXP();
    };


  }, [usuario, linkUserName]);

  const fontePagina = { fontFamily: css?.fonte };

  let estiloLinearGr = {};

  if (stats?.VIP && stats?.userBackGround && css?.bgTipo === "imagem") {
    estiloLinearGr = {
      backgroundImage: `url(${stats?.userBackGround})`,
    };
  } else if (css?.bgTipo === "corsolida") {
    estiloLinearGr = {
      backgroundColor: css?.corFundo,
    };
  } else if (css?.bgTipo === "gradiente") {
    estiloLinearGr = {
      background: `linear-gradient(180deg, ${css?.corFundo} 0%, ${css?.corFundo2} 100%)`,
    };
  }

  return (
    <>
      <Helmet>
        <title>{stats?.username}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className="paginaFundoWarp" style={fontePagina}>
        <div className="paginaFundo pt-0" style={estiloLinearGr}>
          <div className="paginaWarper mt-4 m-auto pb-5 d-flex flex-column align-items-center">
            <PaginaPerfil
              perfil={stats?.imagemPerfil}
              username={stats?.username}
              selectedFrame={stats?.moldura}
              rank={stats?.rank}
              userStyle={css}
            />
            <PaginaLinkList pages={pages} userStyle={css} />
          </div>
          <div className="botaoCrieSeuLink text-center pb-3">
            <Button href="/Singup" className="mt-4">
              Crie seu Link
            </Button>
          </div>
        </div>
        {exibirA && (
          <>
            <div className="paginaFooter d-flex flex-column align-items-center">
              <button
                href="/Singup"
                className="paginaFooterBnt bn632-hover bn22 text-white paginaFooterItem"
              >
                Linkgame.app/voce
              </button>
              <div className="d-flex">
                <p className="text-white paginaFooterItem">
                  Junte-se a {stats?.username} e crie sua própria aventura.
                </p>
                <p className="fecharBtn text-white ms-4" onClick={handleClose}>
                  X
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Pagina;
