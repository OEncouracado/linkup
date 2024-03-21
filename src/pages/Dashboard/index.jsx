import React, { useEffect } from 'react'
import { usePages } from './../../hook';
import { useAuth } from './../../hook';

function Dashboard() {
    const { authUser } = useAuth();
    const pages = usePages(authUser?.uid);

    useEffect(() => {
        console.log(pages);
    }, [pages]);


    return (
        <div className='dashboardFundo d-flex justify-content-center align-items-center'>
            <div>
                Dashboard
            </div>
        </div>
    )
}

export default Dashboard
