import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { fb } from "../../../shared/service";

function DashboardLink({
  url: initialUrl,
  nomeLink: initialNomeLink,
  idPage,
  iduser,
  setLinks,
  id,
  index
}) {
  const [nomeLink, setNomeLink] = useState(initialNomeLink);
  const [url, setUrl] = useState(initialUrl);
  const [isEdit, setIsEdit] = useState(false);

  const editPage = async () => {
    if (isEdit) {
      const linkPagesRef = fb.firestore.collection("linkPages").doc(iduser);

      try {
        const doc = await linkPagesRef.get();
        if (doc.exists) {
          const linksArray = doc.data().Links;

          const formattedUrl =
            url.startsWith("http://") || url.startsWith("https://")
              ? url
              : `http://${url}`;

          const updatedLinksArray = linksArray.map((link) => {
            if (link.id === id) {
              return { id, nome: nomeLink, url: formattedUrl };
            }
            return link;
          });

          await linkPagesRef.update({ Links: updatedLinksArray });
          setLinks(updatedLinksArray);
          console.log("Link atualizado com sucesso!");
        } else {
          console.log("Documento não encontrado para o ID do usuário");
        }
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
      const linkPagesRef = fb.firestore.collection("linkPages").doc(iduser);

      try {
        const doc = await linkPagesRef.get();
        if (doc.exists) {
          const linksArray = doc.data().Links;

          const updatedLinksArray = linksArray.filter((link) => link.id !== id);

          await linkPagesRef.update({ Links: updatedLinksArray });
          setLinks(updatedLinksArray);
          alert("Link excluído");
          console.log("Link deletado com sucesso!");
        } else {
          console.log("Documento não encontrado para o ID do usuário");
        }
      } catch (error) {
        console.error("Erro ao deletar link:", error);
      }
    }
  };

  return (
    <Container
      className="dashboardFundoLink bg-light d-flex justify-content-between align-items-center my-2 p-3 rounded"
    >
      <div className="drag-handle">
        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
      </div>
      <div className="linkENome d-flex flex-column align-items-start">
        <Container className="link-content flex-grow-1 d-flex flex-column align-items-start">
          {isEdit ? (
            <>
              <Form.Control
                className="my-1"
                type="text"
                name="nomeLink"
                value={nomeLink}
                onChange={handleInputChange}
                placeholder="Nome do Link"
              />
              <Form.Control
                className="my-1"
                type="url"
                name="url"
                value={url}
                onChange={handleInputChange}
                placeholder="URL do Link"
              />
            </>
          ) : (
            <>
              <p className="mb-1">
                <strong>{nomeLink}</strong>
              </p>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </>
          )}
        </Container>
      </div>
      <div className="action-buttons d-flex">
        {isEdit ? (
          <>
            <Button variant="success" className="mx-1" onClick={editPage}>
              <i className="fa fa-check"></i>
            </Button>
            <Button
              variant="danger"
              className="mx-1"
              onClick={() => setIsEdit(false)}
            >
              <i className="fa fa-times"></i>
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            className="mx-1"
            onClick={() => setIsEdit(true)}
          >
            <i className="fa fa-pencil"></i>
          </Button>
        )}
        <Button variant="danger" className="mx-1" onClick={delPage}>
          <i className="fa fa-trash"></i>
        </Button>
      </div>
    </Container>
  );
}

export default DashboardLink;
