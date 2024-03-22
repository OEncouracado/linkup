import React from 'react';// eslint-disable-next-line
import { Image, Nav, Navbar } from 'react-bootstrap';
import "./style.css"
import tempLogo from '../../Images/linkuplogotemporariosfundo.png';

function Topbar() {
  return (
    <Navbar variant='dark' className='d-flex menu mt-2 px-5'>
            <Navbar.Brand href='/'>
                <i class="fa fa-link me-2" aria-hidden="true"/>
                  <Image className='logoimgtopbar' src={tempLogo}></Image>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link href='#'>Teste</Nav.Link>
                    <Nav.Link href='#'>Teste</Nav.Link>
                    <Nav.Link href='#'>Teste</Nav.Link>
                    <Nav.Link href='#'>Teste</Nav.Link>
                </Nav>
            </Navbar.Collapse>
    </Navbar>
  )
}

export default Topbar