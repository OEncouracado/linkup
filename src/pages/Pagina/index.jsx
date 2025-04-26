import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLinkPages, UseLinkCss, UseLinkInfo, useAuth, UserInfo } from "./../../hook";
import PaginaPerfil from "./../../Components/Pagina/PaginaPerfil/index";
import PaginaLinkList from "./../../Components/Pagina/PaginaLinkList/index";
import { Helmet } from "react-helmet";
import { Button } from "react-bootstrap";
import { fb } from "../../shared/service";
import { logEvent } from './../../hook/analytics';

function Pagina() {
  const { usuario } = useParams();
  const { authUser } = useAuth();
  const UID = authUser?.uid;
  const statsUserArray = UserInfo(UID);
  const statsUser = statsUserArray && statsUserArray[0];
  const linkUserName = statsUser?.linkUserName;
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
    const verificarXP = async () => {
      if (linkUserName !== undefined) {
        // Adiciona um atraso de 1 segundo para garantir que o UID tenha tempo de ser carregado
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (UID && linkUserName === usuario) {
          console.info(`Usuário logado acessou sua própria página. XP não foi incrementado.`);
        } else {
          // Atualiza o XP para todas as visitas
          try {
            const userStatsRef = fb.firestore.collection("UserStats").where("linkUserName", "==", usuario);
            const querySnapshot = await userStatsRef.get();

            if (!querySnapshot.empty) {
              const userStatsDoc = querySnapshot.docs[0];
              const userId = userStatsDoc.id;
              const currentXP = userStatsDoc.data().xp || 0;

              const newXP = currentXP + 1;

              await fb.firestore.collection("UserStats").doc(userId).update({ xp: newXP });
              logEvent('page_view', {
                userId: userId,
                linkUserName: usuario,
                newXP: newXP
              });

              console.info(`XP atualizado para ${newXP} para o usuário ${usuario}`);
            } else {
              console.error("Usuário não encontrado na coleção UserStats.");
            }
          } catch (error) {
            console.error("Erro ao atualizar o XP do usuário:", error);
          }
        }

        // Verifica se o cookie para a visita única já existe
        const cookieName = `visited_${usuario}`;
        const cookieValue = getCookie(cookieName);
        if (!cookieValue) {
          // Define o cookie com uma data de expiração de 1 dia
          setCookie(cookieName, 'true', 1);

          try {
            // Atualiza o Rank para visitas únicas
            const userStatsRef = fb.firestore.collection("UserStats").where("linkUserName", "==", usuario);
            const querySnapshot = await userStatsRef.get();

            if (!querySnapshot.empty) {
              const userStatsDoc = querySnapshot.docs[0];
              const userId = userStatsDoc.id;
              const currentRank = userStatsDoc.data().rank || 0;

              const newRank = currentRank + 1;

              await fb.firestore.collection("UserStats").doc(userId).update({ rank: newRank });

              console.info(`Rank atualizado para ${newRank} para o usuário ${usuario}`);
            } else {
              console.error("Usuário não encontrado na coleção UserStats.");
            }
          } catch (error) {
            console.error("Erro ao atualizar o Rank do usuário:", error);
          }
        } else {
          console.info(`Visitante já contou visita para ${usuario}.`);
        }
      }
    };

    verificarXP();
  }, [usuario, linkUserName, UID]);

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

  // Funções para manipular cookies
  const setCookie = (name, value, days) => {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  return (
    <>
      <Helmet>
        <title>{stats?.username}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className="paginaFundoWarp" style={fontePagina}>
        <div className="paginaFundo pt-0" style={estiloLinearGr}>
          <div className="paginaWarper mt-2 m-auto pb-5 d-flex flex-column align-items-center">
            <PaginaPerfil
              perfil={stats?.imagemPerfil}
              username={stats?.username}
              selectedFrame={stats?.moldura}
              rank={stats?.rank}
              userStyle={css}
            />
            <PaginaLinkList pages={pages} userStyle={css} usuario={usuario} />
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
                Linkii.me/voce
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
