import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import {Container,Row,Col,Button, InputGroup, Form, Table} from 'react-bootstrap';
import { BsFillPersonPlusFill, BsSearch } from 'react-icons/bs';
import SideBar from '../components/SideBar';
import ListaKits from '../components/ListaKits';
import ModalRespostaVazia from '../components/ModalRepostaVazia';

interface Kit{
  codKit: number;
  nome: string;
  precoVenda: number;
  qtdeModulos: number;
  potenciaModulo: number;
  tipoModulo: string;
  marcaModulo: string;
  descricaoModulo: string;
  qtdeInversor: number;
  potenciaInversor: number;
  tipoInversor: string;
  marcaInversor: string;
  descricaoInversor: string;
  tipoEstrutura: string;
  descricaoCompleta: string;  
}

function FiltroKits(){
  const history = useHistory();     
  const [nome, setNome] = useState('');  
  const [kits, setKits] = useState<Kit[]>([]);
  const [mostrarModalVazio, setMostrarModalVazio] = useState(false);
  const handleCloseVazio = () => setMostrarModalVazio(false);

  function trataRespostaKitSucesso(dados:[]){
    setKits(dados) 
    if (dados.length === 0){
      setMostrarModalVazio(true)
    }
  }
  async function handleSearchClick(e: any) {
    await api.get('kit').then((response:any) =>{        
      trataRespostaKitSucesso(response.data)
    })
    .catch((error:any) => {   
      console.log('teste')
    })
  }
  function handleClickLink(e: any){
    history.push('/'+e.target.name);
  }
  return ( 
    <div id='page-filtroProdutos'>
      <SideBar />
      <Container className="border">
        <Row className="justify-content-center text-center align-center mt-3">
          <b>Filtro de Kits</b>
        </Row>
        <Row className="justify-content-center text-center align-center mt-3">
          <Col bsPrefix="col-xs-1 col-sm-2">      
              <Button 
                type='button' 
                variant="primary" 
                name='kits' 
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
                  <th>Nome</th>
                  </tr>
              </thead>
              <tbody>
                {kits.map(kit => (
                  <ListaKits 
                    key={kit.codKit} 
                    kit={kit}
                  />
                ))}
              </tbody>
          </Table>
        </Container>
      </Container>
      <ModalRespostaVazia 
        mostrarModal={mostrarModalVazio} 
        handleClose={handleCloseVazio} 
        mensagem={'Nenhum Kit Encontrado'}
      />
    </div>
  );
}

export default FiltroKits;