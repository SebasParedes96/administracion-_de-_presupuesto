import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuthContext } from '../../context/authContext';

function NavBar() {

  const { logout } = useAuthContext();
  const {isAuthenticated} = useAuthContext();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Presupuesto</Navbar.Brand>
        { isAuthenticated ? 
        <><Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link onClick={logout}>Salir</Nav.Link>
            </Nav>
          </Navbar.Collapse></>
        : <></> }
      </Container>
    </Navbar>
  );
}

export default NavBar;