import React from 'react';
import { useState, FormEvent } from 'react';
import {Container,Row,Col,Form,Button,Image} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './Login.css';
import aceSolarPowerLogo from '../img/Logopequena.png';

function Login(){
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const history = useHistory();
  function handleSubmit(e: FormEvent){
    e.preventDefault();      
    localStorage.setItem('@AceSolarPower:usuario',usuario)  
    localStorage.setItem('@AceSolarPower:senha',senha)
    history.push('/dashboard');
  }  
  return(
    <Container>
      <Row className="text-center">
        <Col xs={10} sm={6} md={4} lg={4} xl={4} className="centraliza">
          <Image src={aceSolarPowerLogo} alt='aceSolarPower' fluid/>
          <form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" >
                <Form.Control 
                  value={usuario} 
                  onChange={event => setUsuario(event.target.value)} 
                  type="username" 
                  placeholder="Usuario"/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Control value={senha} 
                onChange={event => setSenha(event.target.value)} 
                type="password" 
                placeholder="Senha" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Entrar
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;