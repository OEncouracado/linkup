import React, { useEffect } from 'react'
import { usePages, useAuth  } from './../../hook';

function Dashboard() {
    const { authUser } = useAuth();
    const id = authUser?.uid;
    const pages = usePages(id);

    useEffect(() => {
        console.log(id);
        console.log(pages);
    }, [pages, authUser, id]);


    return (
        <div className='dashboardFundo d-flex justify-content-center align-items-center'>
            <div>
                Dashboard
            </div>
        </div>
    )
}

export default Dashboard
