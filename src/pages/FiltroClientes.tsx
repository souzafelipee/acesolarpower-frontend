import React,{ useState } from 'react';
import SideBar from '../components/SideBar';
import ListaClientes from '../components/ListaClientes'
import {Row,Col,Button,InputGroup,Form,Container,Table} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import api from '../services/api'

interface Cliente{
  codCliente: number;
  celular: string;
  cnpjCpf: string;
  email: string;
  nome: string;
}
function FiltroClientes(){
  const [nome, setNome] = useState('');
  const [clientes, setClientes] = useState<Cliente[]>([]);
  /*useEffect( ()=> {
    api.get('cliente').then(response =>{
        setClientes(response.data)
    });
  }, [] )*/
  const history = useHistory();
  async function handleSearchClick(e: any) {
    if (nome === ''){
      await api.get('cliente').then(response =>{
        setClientes(response.data)
      })
    }
    else{
      await api.get('cliente/nome/'+nome).then(response =>{
        setClientes(response.data)
      })
    }
    
  }
  function handleClickLink(e: any){      
    history.push('/'+e.target.name);
  }  
  return (
    <div id='page-filtroClientes'>
    <SideBar/>
    <Container>
    <Row className="justify-content-center text-center align-center mt-3">
    <Col bsPrefix="col-xs-1 col-sm-2">      
        <Button 
        type='button' 
        variant="primary" 
        name='clientes' 
        onClick={handleClickLink}>+Novo
        </Button>
    </Col>
    <Col bsPrefix="col-xs-11 col-sm-10 ">
    <InputGroup>
        <Form.Control 
        name="nome" value={nome} onChange={event => setNome(event.target.value)} 
        type='text' placeholder="Pesquisar" />
        <InputGroup.Append>
        <Button type='button' onClick={handleSearchClick} variant="outline-secondary">P</Button>
        </InputGroup.Append>
    </InputGroup>                    
    </Col>
    </Row>
    <Container className="mt-4">
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>Cod</th>
                <th>CPF/CNPJ</th>
                <th>Nome</th>
                </tr>
            </thead>
            <tbody>
            {clientes.map(cliente => (
            <ListaClientes 
              key={cliente.codCliente} 
              cliente={cliente}
            />
            ))}
            </tbody>
        </Table>
      </Container>
    </Container>
    </div>
  );
}
export default FiltroClientes;