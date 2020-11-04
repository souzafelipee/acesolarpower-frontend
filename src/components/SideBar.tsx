import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useHistory } from 'react-router-dom';
import aceSolarPowerLogoPequena from '../img/logomuitopequena.png';

function SideBar(){
  const history = useHistory();
  function handleClickLink(e: any){      
    history.push('/'+e);
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="/">
      <img
        alt=""
        src={aceSolarPowerLogoPequena}
        width="40"
        height="40"
        className="d-inline-block align-top"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto" onSelect={handleClickLink}>
        <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
        <Nav.Link eventKey="filtroclientes">Clientes</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Navbar>
  );
}

export default SideBar