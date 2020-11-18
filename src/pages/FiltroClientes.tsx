import React,{ useState } from 'react';
import SideBar from '../components/SideBar';
import ListaClientes from '../components/ListaClientes'
import {Row,Col,Button,InputGroup,Form,Container,Table,Modal,Spinner} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import api from '../services/api'
import { BsFillPersonPlusFill, BsSearch } from 'react-icons/bs';

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
  const [mostrarModalCarregando, setMostrarModalCarregando] = useState(false);
  const [mostrarModalErro, setMostrarModalErro] = useState(false);
  const [mostrarModalVazio, setMostrarModalVazio] = useState(false);
  const handleCloseCarregando = () => setMostrarModalCarregando(false);
  const handleCloseErro = () => setMostrarModalErro(false);
  const handleCloseVazio = () => setMostrarModalVazio(false);
  const [msgErro, setMsgErro] = useState('');
  /*useEffect( ()=> {
    api.get('cliente').then(response =>{
        setClientes(response.data)
    });
  }, [] )*/
  function trataRespostaClienteSucesso(dados:[]){
    setMostrarModalCarregando(false)        
    setClientes(dados) 
    console.log(dados)     
    if (dados.length === 0){
      setMostrarModalVazio(true)
    }
  }
  function trataRespostaClienteErro(dados:any){
    setMsgErro(String(dados))
    setMostrarModalCarregando(false)
    setMostrarModalErro(true)
  }
  const history = useHistory();
  async function handleSearchClick(e: any) {
    setMostrarModalCarregando(true);
    if (nome === ''){      
      await api.get('cliente').then(response =>{        
        trataRespostaClienteSucesso(response.data)
      })
      .catch(error => {   
        trataRespostaClienteErro(error)
      })
    }
    else{
      await api.get('cliente/nome/'+nome).then(response =>{
        trataRespostaClienteSucesso(response.data)
      })
      .catch(error => {   
        trataRespostaClienteErro(error)
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
        onClick={handleClickLink}><BsFillPersonPlusFill/> Novo
        </Button>
    </Col>
    <Col bsPrefix="col-xs-11 col-sm-10 ">
    <InputGroup>
        <Form.Control 
        name="nome" value={nome} onChange={event => setNome(event.target.value)} 
        type='text' placeholder="Pesquisar" />
        <InputGroup.Append>
        <Button type='button' onClick={handleSearchClick} variant="outline-secondary"><BsSearch/></Button>
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
    <Modal show={mostrarModalCarregando} onHide={handleCloseCarregando}>
      <Modal.Body className='justify-content-start text-center align-center'>
        <Spinner animation="grow" />
        Carregando...        
      </Modal.Body>
    </Modal>
    <Modal show={mostrarModalErro} onHide={handleCloseErro}>
      <Modal.Header closeButton>
        <Modal.Title>Erro ao Carregar Dados</Modal.Title>
      </Modal.Header>
      <Modal.Body>Erro: {msgErro}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseErro}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    <Modal show={mostrarModalVazio} onHide={handleCloseVazio}>
      <Modal.Body className='justify-content-start text-center align-center'>
        Nenhum Cliente Encontrado
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseVazio}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
    

    </div>
  );
}
export default FiltroClientes;