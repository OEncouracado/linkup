// src/Components/Dashboard/DashboardLink/index.jsx
import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { fb } from "../../../shared/service";

function DashboardLink({ url: initialUrl, nomeLink: initialNomeLink, idPage }) {
  const [nomeLink, setNomeLink] = useState(initialNomeLink);
  const [url, setUrl] = useState(initialUrl);
  const [isEdit, setIsEdit] = useState(false);
  const editPage = async () => {
    if (isEdit) {
      const linkPagesRef = fb.firestore.collection("linkPages");

      try {
        const linkPagesSnapshot = await linkPagesRef.get();

        linkPagesSnapshot.forEach(async (doc) => {
          const linksArray = doc.data().Links;

          const updatedLinksArray = linksArray.map((link) => {
            if (link.nome === initialNomeLink) {
              return { nome: nomeLink, url: url };
            }
            return link;
          });

          await linkPagesRef.doc(doc.id).update({ Links: updatedLinksArray });
          console.log("Link atualizado com sucesso!");
        });
      } catch (error) {
        console.error("Erro ao atualizar link:", error);
      }
    }
    setIsEdit(!isEdit);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "nomeLink") {
      setNomeLink(value);
    } else if (name === "url") {
      setUrl(value);
    }
  };

  const delPage = async () => {
    if (window.confirm("Tem certeza que deseja deletar " + nomeLink + "?")) {
      const linkPagesRef = fb.firestore.collection("linkPages");

      try {
        const linkPagesSnapshot = await linkPagesRef.get();

        linkPagesSnapshot.forEach(async (doc) => {
          const linksArray = doc.data().Links;

          const updatedLinksArray = linksArray.filter(
            (link) => link.nome !== nomeLink
          );

          await linkPagesRef.doc(doc.id).update({ Links: updatedLinksArray });
          alert("Link excluido");
          console.log("Mapa deletado com sucesso!");
        });
      } catch (error) {
        console.error("Erro ao deletar mapa:", error);
      }
    }
  };
  return (
    <>
      <Container className="dashboardFundoLink bg-light d-flex justify-content-between align-items-center my-2">
        <div className="arrastarWarp">
          <i className="arrastarLink fa fa-ellipsis-v" aria-hidden="true"></i>
        </div>
        <div className="linkENome d-flex flex-column align-items-start">
          <Container>
            {isEdit ? (
              <Form.Control
                className="my-1"
                type="text"
                name="nomeLink"
                value={nomeLink}
                onChange={handleInputChange}
                placeholder=""
              />
            ) : (
              <p>{nomeLink}</p>
            )}
          </Container>
          <Container className="linkUrl">
            {isEdit ? (
              <Form.Control
                className="my-1"
                type="text"
                name="url"
                value={url}
                onChange={handleInputChange}
                placeholder=""
              />
            ) : (
              <p> {url} </p>
            )}
          </Container>
        </div>
        <Container className="configLinksIcons w-25 d-flex justify-content-end me-3">
          {isEdit ? (
            <>
              <i
                className="fa fa-check-square mx-1"
                aria-hidden="true"
                onClick={editPage}
              />
              <i
                className="fa fa-times mx-1"
                aria-hidden="true"
                onClick={() => setIsEdit(false)}
              />
            </>
          ) : (
            <i
              className="fa fa-pencil-square mx-1"
              aria-hidden="true"
              onClick={() => setIsEdit(true)}
            />
          )}
          <i
            class="fa fa-minus-square"
            aria-hidden="true"
            onClick={delPage}
          ></i>
        </Container>
      </Container>
    </>
  );
}

export default DashboardLink;