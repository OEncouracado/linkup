
import React from 'react';
import DashboardLink from '../DashboardLink';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function DashboardLinkList({ pages }) {
    console.log(pages);
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
                    overlay={renderTooltip()} ><i class="addLink fa fa-plus-circle ms-3" aria-hidden="true"></i></OverlayTrigger>
            <div className='d-flex flex-column'>
                {pages?.map(page => (
                    (page.Links.map((link, index) => (
                        <DashboardLink key={index} link={link} />
                    )))
                ))}
            </div>
        </div>
    );
}

export default DashboardLinkList;

