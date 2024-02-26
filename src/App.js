import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; // eslint-disable-next-line
// import { Container } from 'react-bootstrap';
//import Topbar from './Components/TopBar';
//import PrimDiv from './Components/primeiraDiv';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';

function App() {
  return (
  <>
 <Login/>
 <Signup/>
  </>);
}

export default App;
