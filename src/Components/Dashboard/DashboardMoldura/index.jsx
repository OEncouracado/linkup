import React from 'react'

function Moldura({ frames, handleSelectFrame }) {
    return (
        <div className=' d-flex justify-content-center align-items-center mt-5 mb-2'>
            {frames.map(frame => (
                <img
                    key={frame.id}
                    src={frame.src}
                    alt={`moldura ${frame.id}`}
                    className='mx-2 frameOption'
                    onClick={() => handleSelectFrame(frame)}
                />
            ))}
        </div>
    )
}

export default Moldura
