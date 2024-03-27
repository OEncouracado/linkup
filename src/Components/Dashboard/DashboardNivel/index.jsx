import React from 'react'
import { ProgressBar } from 'react-bootstrap'

function DashboardNivel({ nivel, xp, maxxp }) {
    return (
        <div className='d-flex flex-column align-items-center w-25 my-3'>
            <h6>Nível <span className='text-success'>{nivel}</span></h6>
            <ProgressBar className='bar xp-bar' striped animated variant='success' now={xp} max={maxxp} />
        </div>
    )
}

export default DashboardNivel
