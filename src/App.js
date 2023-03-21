import './App.css';
import React from 'react'
import { Container } from 'react-bootstrap';
import Topbar from './Components/TopBar';

function App() {
  return (
  <>
 <Topbar/>
  <Container className="d-flex flex-column align-items-center justify-content-center mt-3"> 
  
  <h1 className="titulo mb-0">LinkUp</h1>
  <h6 className="titulo mt-0">teste de subtitulo</h6>
  </Container>
  </>);
}

export default App;
