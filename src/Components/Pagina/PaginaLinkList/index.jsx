import React from 'react'
import PaginaLink from '../PaginaLink'

function PaginaLinkList({pages}) {
  return (
      <div className='paginaLinksList d-flex flex-column align-items-center'>
                {pages?.Links.map((link, index) => (
                        <PaginaLink key={index} url={link.url} nome={link.nome} />
                    ))}
      </div>
  )
}

export default PaginaLinkList
