import React,{ useState } from 'react';
import SideBar from '../components/SideBar';
import {Row,Col,Button,InputGroup,Form} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

function FiltroClientes(){
  const history = useHistory();
  function handleSearchClick(e: any) {
    
  }
  function handleClickLink(e: any){      
    history.push('/'+e.target.name);
  }
  const [nome, setNome] = useState('');
  return (
    <div id='page-filtroClientes'>
    <SideBar/>
    <Row className="justify-content-center text-center align-center ">
    <Col bsPrefix="col-xs-1 col-sm-2">      
        <Button 
        type='button' 
        variant="primary" 
        name='clientes' 
        onClick={handleClickLink}>+Novo
        </Button>
    </Col>
    <Col bsPrefix="col-xs-11 col-sm-10 d-none d-sm-block">
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
    </div>
  );
}
export default FiltroClientes;