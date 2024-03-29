import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // eslint-disable-next-line
import Homepage from './pages/home'; // eslint-disable-next-line
import Signup from './Components/Signup/Signup';
import Login from './Components/Login';
import { useAuth } from './hook/authUser'; // eslint-disable-next-line
import Dashboard from './pages/Dashboard'; // eslint-disable-next-line
import Inventario from './Components/Inventario';
import { TelaLoading } from './Components/Loading';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pagina from './pages/Pagina';

function App() {
  const {isAuthed, authUser} = useAuth ();
  return (
  <>
    <Router>
      <Routes>
        <Route path='/' element={authUser === undefined ? <TelaLoading/> : isAuthed ? (<Dashboard/>):(<Login/>)}/>
        <Route path='/:id' element={<Pagina />}/>
      </Routes>
    </Router>
  </>);}

export default App;
