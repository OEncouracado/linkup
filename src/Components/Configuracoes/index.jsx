import React from 'react'
import { Alert, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UserCss, UserInfo, useAuth, usePages } from '../../hook';// eslint-disable-next-line
import TrocalinkUserName from './TrocalinkUserName';

function Configuracoes() {
    const { authUser } = useAuth();
  const id = authUser?.uid;
  const userArray = UserInfo(id);
  const pageInfo = usePages(id);
  const cssArray = UserCss(id);// eslint-disable-next-line
  const css = cssArray && cssArray[0];// eslint-disable-next-line
  const pages = pageInfo?.Links;// eslint-disable-next-line
  const stats = userArray && userArray[0];
  const username = stats?.linkUserName;

  return (
    <div className="dashboardLinks pb-5 d-flex flex-column justify-content-center align-items-center">
    <Alert variant="info" className="mb-5">
      Sua página já está disponível aqui:{" "}
      <Link to={`/${username}`} target="_blank" rel="noreferrer">
        {username}
      </Link>
      </Alert>
      <Container className="personalizarContainers editFundo d-flex flex-column align-items-center py-2 px-3 w-75">
        <TrocalinkUserName/>
      </Container>

    </div>
  )
}

export default Configuracoes
