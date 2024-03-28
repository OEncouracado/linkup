import React from 'react'

function PaginaLink({ url, nome, linkEstilo }) {
  const userEstilo = {
    backgroundColor: linkEstilo?.corBotao,
    color: linkEstilo?.corTextoBotao,
    boxShadow: `0px 5px 15px ${linkEstilo?.corSombraBotao}`,
  }
  console.log(userEstilo)
  return (
    <a className='paginaLink' style={userEstilo} href={url}><div className='linkPage'>
      {nome}
    </div></a>
  )
}

export default PaginaLink