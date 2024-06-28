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
} from "react-router-dom";
import Pagina from "./pages/Pagina";
import UserProfile from "./pages/perfil";
import ContatoPage from "./pages/contato";
import RecuperacaoEnviado from "./Components/Telas Extras/recuperacaoEnviado";
import RecuperarSenha from "./Components/Telas Extras/recuperarSenha";

function App() {
  const { isAuthed, authUser } = useAuth();
  return (
    <div >
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
            element={isAuthed ? <Navigate to="/dashboard" /> : <RecuperarSenha />}
          />
           <Route
            path="/recuperacao/concluido"
            element={isAuthed ? <Navigate to="/dashboard" /> : <RecuperacaoEnviado />}
          />
          <Route
            path="/Singup"
            element={isAuthed ? <Navigate to="/dashboard" /> : <Signup />}
          />
          <Route path="/:usuario" element={<Pagina />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
