import React from 'react'
import Link from '../DashboardLink'

function LinkList({ pages }) {

    console.log(pages);
    return (
        <div className='linksList pt-4'>
            <p className='dashboardtituloLinks'>Links</p>
            <div className='d-flex flex-column'>
                {pages?.map(page => (
                    page.Links?.map(link => (
                        <Link key={link} link={link} />
                    ))
                ))}
            </div>
        </div>
    );
}
export default LinkList
