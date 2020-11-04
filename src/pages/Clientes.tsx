import React from 'react';
import SideBar from '../components/SideBar';
import {Container,Form,Row,Col,Button} from 'react-bootstrap';

function Clientes(){
  return (
    <div id='page-Clientes'>
      <SideBar/>
      <Container>
        <Form >
          <Container className="mt-3">
            <Form.Group>
              <Row className="justify-content-end text-center align-center">
                <Button variant="success" type='submit'>Salvar</Button>
              </Row>
            </Form.Group>
          </Container>
          <Container className="border">
            <Form.Group as={Row} className="mt-1">                            
              <Form.Label column xs={1}>Cod:</Form.Label>
              <Col xs={2} className="justify-content-start text-left align-left">                
                <Form.Control type='text' name="codCliente" placeholder="codCliente" />
              </Col>
              <Form.Label column xs={1}>Nome:</Form.Label>
              <Col xs={8}className="justify-content-start text-left align-left">
                <Form.Control type='text' name="nome" placeholder="Nome" />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>                            
              <Form.Label column xs={2}>CPF/CNPJ:</Form.Label>
              <Col xs={4} className="justify-content-start text-left align-left">                
                <Form.Control type='text' name="cpfCnpj" placeholder="CPF/CPNJ" />
              </Col>
              <Form.Label column xs={2}>Celular:</Form.Label>
              <Col xs={4}className="justify-content-start text-left align-left">
                <Form.Control type='text' name="celular" placeholder="Celular" />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>                            
              <Form.Label column xs={2}>Email:</Form.Label>
              <Col xs={10} className="justify-content-start text-left align-left">                
                <Form.Control type='text' name="email" placeholder="Email" />
              </Col>
            </Form.Group>
          </Container>
        </Form>
      </Container>
    </div>
  );
}
export default Clientes