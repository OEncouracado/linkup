import React from 'react'

function PaginaLink({url, nome}) {
  return (
    <a className='paginaLink' href={url}><div className='linkPage '>
      {nome}
    </div></a>
  )
}

export default PaginaLink