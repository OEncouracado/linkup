import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // eslint-disable-next-line
import Homepage from './pages/home'; // eslint-disable-next-line
import Signup from './Components/Signup/Signup';
import Login from './Components/Login';
import { useAuth } from './hook/authUser'; // eslint-disable-next-line
import Dashboard from './pages/Dashboard'; // eslint-disable-next-line
import Inventario from './Components/Inventario';

function App() {
  const {isAuthed} = useAuth ();

  return (<>
    {isAuthed ? <Dashboard/>:<Login/>}
  </>);
}

export default App;
