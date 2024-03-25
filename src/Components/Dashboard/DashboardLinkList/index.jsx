
import React from 'react';
import DashboardLink from '../DashboardLink';

function DashboardLinkList({ pages }) {
    console.log(pages);

    return (
        <div className='linksList pt-4'>
            <p className='dashboardtituloLinks'>Links</p>
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

