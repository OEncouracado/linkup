
import React from 'react';
import DashboardLink from '../DashboardLink';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function DashboardLinkList({ pages }) {
    const Array = pages;
    console.log("Array de Páginas", Array);
    const paginas = pages?.Links;
    console.log("Páginas", paginas);
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Adicionar novo Link
        </Tooltip>
    );

    return (
        <div className='linksList pt-4'>
            <p className='dashboardtituloLinks'>Links</p>
            <OverlayTrigger placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip()} >
                        <i class="addLink fa fa-plus-circle ms-3" aria-hidden="true"></i>
                        </OverlayTrigger>
            <div className='d-flex flex-column'>
                {pages?.Links.map((link, index) => (
                        <DashboardLink key={index} url={link.url} nome={link.nome} />
                    ))}
            </div>
        </div>
    );
}

export default DashboardLinkList;

