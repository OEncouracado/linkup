import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // eslint-disable-next-line
import Homepage from "./pages/home"; // eslint-disable-next-line
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login";
import { useAuth } from "./hook/authUser"; // eslint-disable-next-line
import Dashboard from "./pages/Dashboard"; // eslint-disable-next-line
import Inventario from "./Components/Inventario";
import { TelaLoading } from "./Components/Loading";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";// eslint-disable-next-line
import Pagina from "./pages/Pagina";
import UserProfile from "./pages/perfil";
import ContatoPage from "./pages/contato";
import RecuperacaoEnviado from "./Components/Telas Extras/recuperacaoEnviado";
import RecuperarSenha from "./Components/Telas Extras/recuperarSenha";
import UsuarioBloqueado from "./Components/Telas Extras/usuarioBloqueado";
import Despedida from "./Components/Telas Extras/despedida";
import VerificacaoEmail from "./Components/Telas Extras/verificacaoEmail";
import Termos from "./Components/TermoseCondições";
import { LightModeProvider } from "./Components/Dashboard/LightModeContext";
import SuccessPage from "./pages/Sucesso";
import CancelPage from "./pages/Cancelar";
import NotFound from "./pages/404";
import CheckUserExists from "./Components/CheckUserExists";
import AdminPage from "./pages/Admin";
import { SpeedInsights } from "@vercel/speed-insights/react"
import NotAuthorized from "./pages/Admin/notAuthorized";

function App() {
  const { isAuthed, authUser } = useAuth();
  return (
    <LightModeProvider>
      <SpeedInsights/>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="contato" element={<ContatoPage />} />
          <Route
            path="/dashboard"
            element={
              authUser === undefined ? (
                <TelaLoading />
              ) : isAuthed ? (
                <Dashboard />
              ) : (
                <Navigate to="/Login" />
              )
            }
          />
          <Route
            path="/perfil"
            element={
              authUser === undefined ? (
                <TelaLoading />
              ) : isAuthed ? (
                <UserProfile />
              ) : (
                <Navigate to="/Login" />
              )
            }
          />
          <Route
            path="/Login"
            element={isAuthed ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/recuperacao"
            element={
              isAuthed ? <Navigate to="/dashboard" /> : <RecuperarSenha />
            }
          />
          <Route
            path="/recuperacao/concluido"
            element={
              isAuthed ? <Navigate to="/dashboard" /> : <RecuperacaoEnviado />
            }
          />
          <Route
            path="/Singup"
            element={isAuthed ? <Navigate to="/dashboard" /> : <Signup />}
          />
          <Route path="/:usuario" element={<CheckUserExists />} />

          <Route path="/bloqueado" element={<UsuarioBloqueado />} />
          <Route path="/despedida" element={<Despedida />} />
          <Route path="/verificacaoEmail" element={<VerificacaoEmail />} />
          <Route path="/s/TermoseCondicoes" element={<Termos />} />
          <Route path="/s/Sucesso" element={<SuccessPage />} />
          <Route path="/s/Cancelado" element={<CancelPage />} />
          <Route path="/s/404" element={<NotFound />} />
          <Route path="/s/*" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />

          
          
        </Routes>
      </Router>
    </LightModeProvider>
  );
}

export default App;
