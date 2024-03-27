import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CookieConsent from 'react-cookie-consent';
import Home from './pages/Home/Home';
import Ohospital from './pages/Ohospital/Ohospital';
import Servicos from './pages/Nova Pagina/servicos';
import Planos from './pages/plano/plano';
import Resultados from './pages/Resultados';
import Contato from './pages/Contato/Contato';
import Politica from './pages/CookiePoli/Politica';
import ScrollArrow from './components/arrowTop/ScrollArrow';
import Sucesso from './pages/Sucesso/Sucesso';
import Trabalhe from './pages/trabalheConosco/Trabalhe';
import UnderC from './pages/emconstrucao';
import NotFound from './pages/NotFound/NotFound';
import Marcacao from './pages/Resultados';
import Adm from './pages/admin';
import ApiRoute from './components/ApiRoute';
import Vagas from './pages/admin/vagas';
import Loginpage from './pages/admin/loginpage';
import SairPage from "./components/Manager/Deslogar";
import Magnify from "./components/app_Magnify";

function App() {
  const getRedirectComponent = (Component) => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(token);
      const userApp = decodedToken.App;
      if (userApp === 'ADM') {
        return <Component />;
      } else if (userApp === 'MAGNIFY') {
        return <Magnify />;
      }
    }
    return <Loginpage />;
  };
  // const isAuthenticated = (allowedApp) => {
  //   const token = localStorage.getItem('token');
  //   const decodedToken = JSON.parse(token);
  //   if (!token) {
  //     return false;
  //   }
  //   return decodedToken.App === allowedApp;
    
  // };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/servic" element={<Servicos />} />
        <Route exact path="/OHospital" element={<Ohospital />} />
        <Route exact path="/plano" element={<Planos />} />
        <Route exact path="/planos-de-sauacutede.html" element={<Planos />} />
        <Route exact path="/mobile/planos-de-sauacutede.html" element={<Planos />} />
        <Route exact path="/resultado" element={<Resultados />} />
        <Route exact path="/contato" element={<Contato />} />
        <Route exact path="/politica-de-privacidade" element={<Politica />} />
        <Route exact path="/sucesso" element={<Sucesso />} />
        <Route exact path="/ouvidoria.html" element={<Contato />} />
        <Route exact path="/contato.html" element={<Contato />} />
        <Route exact path="/trabalhe-conosco.html" element={<Trabalhe />} />
        <Route exact path="/trabalhe-conosco" element={<Trabalhe />} />
        <Route exact path="/serviccedilos.html" element={<Servicos />} />
        <Route exact path="/corpo-cliacutenico.html" element={<Servicos />} />
        <Route exact path="/o-hospital.html" element={<UnderC />} />
        <Route exact path="/marcacao" element={<Marcacao />} />
        {/* Rota para a página de login */}
        <Route
          exact
          path="/adm/login"
          element={getRedirectComponent()}
        />
        <Route path="/api/*" element={<ApiRoute />} />
        <Route path="*" element={<NotFound />} />
        {/* Rota para o painel de controle de carrossel */}
        <Route
          exact
          path="/adm/carrossel"
          element={
            getRedirectComponent(Adm)}
        />

        {/* Rota para o painel de vagas */}
        <Route
          exact
          path="/adm/vagas"
          element={getRedirectComponent(Vagas)}
        />

        {/* Rota para a página de logout */}
        <Route
          exact
          path="/adm/sair"
          element={getRedirectComponent(SairPage)}
        />

        {/* Rota para a página de Magnify */}
        <Route
          exact
          path="/magnify"
          element={getRedirectComponent()}
        />
      </Routes>
      <ScrollArrow />
      <CookieConsent expires={150} buttonText="Eu compreendo." style={{ backgroundColor: 'rgba(53,53,53,0.9)' }}>
        Usamos cookies em nosso site para fornecer a experiência mais relevante, lembrando suas preferências e visitas repetidas. <br /> Ao clicar em “Aceitar”, você concorda com o uso de TODOS os cookies. &emsp; <Link className="link-info" to={'/politica-de-privacidade'}>Saiba mais</Link>      {/* O que está escrito na barra */}
      </CookieConsent>
    </Router>
  );
}

export default App;
