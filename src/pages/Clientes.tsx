import React, { useState, FormEvent, useEffect} from 'react';
import SideBar from '../components/SideBar';
import {Container,Form,Row,Col,Button} from 'react-bootstrap';
import api from '../services/api';
import { useParams, useHistory } from 'react-router-dom';

interface ClienteParams{
  codCliente: string;
}
interface Cliente{
  codCliente: string;
  celular: string;
  email: string;
  nome: string;
  cnpjCpf: string;
}
function Clientes(){
  const params = useParams<ClienteParams>();
  const history = useHistory();
  const [cliente, setCliente] = useState<Cliente>();
  const [codCliente, setCodCliente] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [cnpjCpf, setCnpjCpf] = useState('');

  async function getCliente() {
    await api.get(`cliente/${params.codCliente}`).then(response => {
      console.log(response.data);
      const clienteAux = response.data;
      setCliente(response.data);
      setCodCliente(clienteAux.codCliente);
      setCelular(clienteAux.celular);
      setEmail(clienteAux.email);
      setNome(clienteAux.nome);
      setCnpjCpf(clienteAux.cnpjCpf);
    });    
    console.log('cliente: ');
    console.log(cliente);
  }
  useEffect( () => {
    console.log('params.codCliente: '+params.codCliente)
    if (!(params.codCliente === undefined)){      
      console.log('params.codCliente entrou no if: '+params.codCliente);
      getCliente();      
    }    
  }, [params.codCliente]);
  async function handleSubmit(e: FormEvent){
    e.preventDefault();
    const cliente = {celular,email,nome,cnpjCpf}
    console.log(cliente)
    await api.post('cliente', cliente)
    history.push('/filtroclientes')
  }
  return (
    <div id='page-Clientes'>
      <SideBar/>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Container className="mt-3">
            <Form.Group>
              <Row className="justify-content-start text-center align-center border">
                <Button variant="success" type='submit'>Salvar</Button>
              </Row>
            </Form.Group>
          </Container>
          <Container className="mt-1 border">
            <Form.Group as={Row} className="mt-1">                            
              <Form.Label column xs={1}>Cod:</Form.Label>
              <Col xs={2} className="justify-content-start text-left align-left">                
                <Form.Control type='text' name="codCliente" placeholder="código"
                              value={codCliente} onChange={e => setCodCliente(e.target.value)} />
              </Col>
              <Form.Label column xs={1}>Nome:</Form.Label>
              <Col xs={8}className="justify-content-start text-left align-left">
                <Form.Control type='text' name="nome" placeholder="Nome" 
                              value={nome} onChange={e => setNome(e.target.value)}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>                            
              <Form.Label column xs={2}>CPF/CNPJ:</Form.Label>
              <Col xs={4} className="justify-content-start text-left align-left">                
                <Form.Control type='text' name="cpfCnpj" placeholder="CPF/CPNJ" 
                              value={cnpjCpf} onChange={e => setCnpjCpf(e.target.value)}/>
              </Col>
              <Form.Label column xs={2}>Celular:</Form.Label>
              <Col xs={4}className="justify-content-start text-left align-left">
                <Form.Control type='text' name="celular" placeholder="Celular" 
                              value={celular} onChange={e => setCelular(e.target.value)}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>                            
              <Form.Label column xs={2}>Email:</Form.Label>
              <Col xs={10} className="justify-content-start text-left align-left">                
                <Form.Control type='text' name="email" placeholder="Email" 
                              value={email} onChange={e => setEmail(e.target.value)}/>
              </Col>
            </Form.Group>
          </Container>
        </Form>
      </Container>
    </div>
  );
}
export default Clientes