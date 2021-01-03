import React,{ useState } from 'react';
import SideBar from '../components/SideBar';
import {Row,Col,Button,InputGroup,Form,Container,Table,Modal,Spinner} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ListaProdutos from '../components/ListaProdutos';
import api from '../services/api';
import {BsFillPersonPlusFill, BsSearch} from 'react-icons/bs';

interface Produtos{
  codProduto: number;
  nome: string;
  marca: string;
  potencia: number;
  custoMedioMensal: number;
  custoUltimaCompra: number;
  tipoProduto: string;
  tipoModulo: string;
  tipoInversor: string;
  tipoEstrutura: string;
}
function FiltroProdutos(){
  const history = useHistory();
  const [nome, setNome] = useState('');
  const [produtos, setProdutos] = useState<Produtos[]>([]);
  const [msgErro, setMsgErro] = useState('');
  const [mostrarModalCarregando, setMostrarModalCarregando] = useState(false);
  const [mostrarModalVazio, setMostrarModalVazio] = useState(false);
  const [mostrarModalErro, setMostrarModalErro] = useState(false);
  const handleCloseCarregando = () => setMostrarModalCarregando(false);
  const handleCloseVazio = () => setMostrarModalVazio(false);
  const handleCloseErro = () => setMostrarModalErro(false);

  function trataRespostaProdutoSucesso(dados:[]){
    setMostrarModalCarregando(false)        
    setProdutos(dados) 
    if (dados.length === 0){
      setMostrarModalVazio(true)
    }
  }
  function trataRespostaProdutoErro(dados:any){
    setMsgErro(String(dados))
    setMostrarModalCarregando(false)
    setMostrarModalErro(true)
  }
  function handleClickLink(e: any){      
    history.push('/'+e.target.name);
  } 
  async function handleSearchClick(e: any) {
    setMostrarModalCarregando(true);
    if (nome === ''){      
      await api.get('produto').then((response:any) =>{        
        trataRespostaProdutoSucesso(response.data)
      })
      .catch((error:any) => {   
        trataRespostaProdutoErro(error)
      })
    }
  }
  return(
    <div id='page-filtroProdutos'>
      <SideBar/>
      <Container className="border">
        <Row className="justify-content-center text-center align-center mt-3">
          <b>Filtro de Produtos</b>
        </Row>
        <Row className="justify-content-center text-center align-center mt-3">
          <Col bsPrefix="col-xs-1 col-sm-2">      
              <Button 
              type='button' 
              variant="primary" 
              name='produtos' 
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
                  <th>Marca</th>
                  </tr>
              </thead>
              <tbody>
                {produtos.map(produto => (
                  <ListaProdutos 
                    key={produto.codProduto} 
                    produto={produto}
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
      <Modal show={mostrarModalVazio} onHide={handleCloseVazio}>
        <Modal.Body className='justify-content-start text-center align-center'>
          Nenhum Produto Encontrado
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseVazio}>
            Fechar
          </Button>
        </Modal.Footer>
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
    </div>
  );
}
export default FiltroProdutos;