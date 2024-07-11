import React, { useState, useEffect } from "react";
import DashboardLink from "../DashboardLink";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ModalAdd from "../../ModalAdd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fb } from "../../../shared/service";

function DashboardLinkList({ pages, userId }) {
  const [links, setLinks] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const linkPagesRef = fb.firestore.collection("linkPages").doc(userId);
        const doc = await linkPagesRef.get();
        if (doc.exists) {
          setLinks(doc.data().Links || []);
        } else {
          setLinks([]);
        }
      } catch (error) {
        console.error("Erro ao carregar os links:", error);
      }
    };

    fetchLinks();
  }, [userId]);

  const handleShow = () => setShow(true);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Adicionar novo Link
    </Tooltip>
  );

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Verifica se o ID do Droppable é válido
    if (source.droppableId !== destination.droppableId) {
      console.error("IDs de Droppable não coincidem:", source.droppableId, destination.droppableId);
      return;
    }

    // Reordena os links na lista
    const items = Array.from(links);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    setLinks(items);

    try {
      // Atualiza a ordem dos links no Firestore
      const linkPagesRef = fb.firestore.collection("linkPages").doc(userId);
      await linkPagesRef.update({ Links: items });
    } catch (error) {
      console.error("Erro ao atualizar a ordem dos links:", error);
    }
  };

  return (
    <div className="linksList pt-4">
      <p className="dashboardtituloLinks bg-light">Links</p>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip()}
      >
        <i
          className="addLink fa fa-plus-circle ms-3"
          onClick={handleShow}
          aria-hidden="true"
        ></i>
      </OverlayTrigger>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={`droppable-${userId}`} type="LINK">
          {(provided) => (
            <div
              className="d-flex flex-column"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {links.length > 0 ? (
                links.map((link, index) => (
                  <Draggable key={link.id} draggableId={link.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DashboardLink
                          url={link.url}
                          nomeLink={link.nome}
                          idPage={pages?.id}
                          iduser={userId}
                          setLinks={setLinks}
                          id={link.id}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p className="text-center">Nenhum link disponível</p>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ModalAdd show={show} setShow={setShow} userId={userId} setLinks={setLinks} />
    </div>
  );
}

export default DashboardLinkList;
