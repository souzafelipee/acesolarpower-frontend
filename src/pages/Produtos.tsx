import React, {useState, FormEvent, useEffect} from 'react';
import SideBar from '../components/SideBar';
import {Container,Form,Row,Col,Button,Card,Table,InputGroup,Spinner,Alert,Modal} from 'react-bootstrap';
import { VscSave } from 'react-icons/vsc';
import { useParams, useHistory } from 'react-router-dom';
import api from '../services/api';

interface ProdutoParams{
  codProduto: string;
}

function Produtos(){
  const params = useParams<ProdutoParams>();
  const history = useHistory();

  const [codProduto, setCodProduto] = useState('');  
  const [nome, setNome] = useState('');
  const [tipoProduto, setTipoProduto] = useState('');
  const [marca, setMarca] = useState('');
  const [potencia, setPotencia] = useState('');
  const [tipoModulo, setTipoModulo] = useState('');
  const [tipoInversor, setTipoInversor] = useState('');
  const [tipoEstrutura, setTipoEstrutura] = useState('');
  const [custoUltimaCompra, setCustoUltimaCompra] = useState('');
  const [custoMedioMensal, setCustoMedioMensal] = useState('');

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);
  const [msgErro, setMsgErro] = useState('');
  const [msgAoCadastrar, setMsgAoCadastrar] = useState('');
  const [mostrarModalMsg, setMostrarModalMsg] = useState(false);

  const [mostrarModalCarregando, setMostrarModalCarregando] = useState(false);
  const handleCloseCarregando = () => setMostrarModalCarregando(false);
  const handleCloseModalMsg = () => setMostrarModalMsg(false);

  async function getProduto() {
    setCarregando(true);
    await api.get(`produto/${params.codProduto}`).then(response => {
      setCarregando(false)
      const produtoAux = response.data;
      //setCliente(response.data);
      setCodProduto(produtoAux.codProduto);
      setNome(produtoAux.nome);
      setMarca(produtoAux.marca);
      setTipoProduto(produtoAux.tipoProduto);
      setPotencia(produtoAux.potencia);
      setTipoModulo(produtoAux.tipoModulo);
      setTipoInversor(produtoAux.tipoInversor)
      setTipoEstrutura(produtoAux.tipoEstrutura)      
      setCustoMedioMensal(produtoAux.custoMedioMensal)
      setCustoUltimaCompra(produtoAux.custoUltimaCompra)
    })
    .catch(error => {   
      setCarregando(false)
      setMsgErro(String(error))
      setErro(true)
    });
  }
  useEffect( () => {
    if (!(params.codProduto === undefined)){      
      getProduto();      
    }    
  }, [params.codProduto]);
  function trataRespostaProdutoSucesso(){
    setMostrarModalCarregando(false)
    history.push('/filtroProdutos')
  }
  function trataRespostaProdutoErro(dados:any){
    setMostrarModalCarregando(false)
    setMsgAoCadastrar('Erro ao Cadastrar Produto: \n'+String(dados))
    setMostrarModalMsg(true)
  }
  async function handleSubmit(e: FormEvent){
    e.preventDefault();

    const produto = {nome,marca,tipoProduto,potencia,tipoModulo,tipoInversor,
                     tipoEstrutura,custoMedioMensal,custoUltimaCompra}
                  
    setMostrarModalCarregando(true)
    console.log('codproduto')
    console.log(params.codProduto)
    if (!(params.codProduto === undefined)){
      await api.post(`produto/${params.codProduto}`, produto).then(response => {
        trataRespostaProdutoSucesso();
      })
      .catch(error => {   
        trataRespostaProdutoErro(error);
      })     
    }
    else{
      await api.post('produto', produto).then(response => {
        trataRespostaProdutoSucesso();
      })
      .catch(error => {   
        trataRespostaProdutoErro(error);
      })     
    }        
  }
  
  return (
    <div id='page-Produtos'>
      <SideBar/>
      {carregando && (
      <Container className="justify-content-start text-center align-center">
        <Spinner animation="grow" />
        Carregando...
      </Container>
      )} 
      {(!carregando && !erro) && (
        <Container>
        <Form onSubmit={handleSubmit}>
          <Container className="mt-3">
            <Form.Group >
              <Row className="justify-content-start text-center align-center border">
                <Button variant="success" type='submit'><VscSave/> Salvar</Button>
              </Row>
            </Form.Group>
          </Container>
          <Container className="mt-1 border">
            <Form.Group as={Row} className="my-2" size="sm">                            
              <Form.Label column xs={1}>Cod:</Form.Label>
              <Col xs={2} className="justify-content-start text-left align-left">                
                <Form.Control readOnly={true} type='text' name="codProduto" placeholder="código"
                              value={codProduto} onChange={e => setCodProduto(e.target.value)} />
              </Col>
              <Form.Label column xs={1}>Nome:</Form.Label>
              <Col xs={8}className="justify-content-start text-left align-left">
                <Form.Control className="py-1" type='text' name="nome" placeholder="Nome" 
                              value={nome} onChange={e => setNome(e.target.value)}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="my-2">
              <Form.Label column xs={1}>Marca: </Form.Label>
              <Col xs={2} className="justify-content-start text-left align-left">                
                <Form.Control type='text' name="marca" placeholder="Marca" 
                              value={marca} onChange={e => setMarca(e.target.value)}/>
              </Col>
              <Form.Label column xs={2}>Tipo Produto: </Form.Label>
              <Col xs={2} className="justify-content-start text-left align-left">                
                <Form.Control as="select" name="tipoProduto" placeholder="Classe"
                              value={tipoProduto} onChange={e => setTipoProduto(e.target.value)}>
                  <option selected hidden>-</option>
                  <option value="modulo">Módulo</option>
                  <option value="inversor">Inversor</option>
                  <option value="estrutura">Estrutura</option>
                  <option value="outros">Outros</option>
                </Form.Control>
              </Col>
              <Form.Label column xs={1}>Potência: </Form.Label>
              <Col xs={2} className="justify-content-start text-left align-left">                
                <InputGroup>
                  <Form.Control type='text' name="potencia" placeholder="Potência"
                                value={potencia} onChange={e => setPotencia(e.target.value)} />
                  <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2">W</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="my-2">
              <Form.Label column xs={2}>Custo Médio Mensal: </Form.Label>
              <Col xs={2} className="justify-content-start text-left align-left">                
                <InputGroup>
                  <Form.Control type='text' name="custoMedioMensal" placeholder="Custo Médio Mensal"
                                value={custoMedioMensal} onChange={e => setCustoMedioMensal(e.target.value)} />
                </InputGroup>
              </Col>
              <Form.Label column xs={3}>Custo Ultima Compra: </Form.Label>
              <Col xs={2} className="justify-content-start text-left align-left">                
                <InputGroup>
                  <Form.Control type='text' name="custoUltimaCompra" placeholder="Custo Última COmpra"
                                value={custoUltimaCompra} onChange={e => setCustoUltimaCompra(e.target.value)} />
                </InputGroup>
              </Col>
            </Form.Group>
            
              {(tipoProduto==='modulo') && (
                <div>
                  <Form.Group as={Row} className="my-2">
                    <Form.Label column xs={2}>Tipo de Módulo: </Form.Label>
                    <Col xs={2} className="justify-content-start text-left align-left">                
                      <Form.Control as="select" name="tipoModulo" placeholder="Tipo de Módulo"
                                    value={tipoModulo} onChange={e => setTipoModulo(e.target.value)}>
                        <option selected hidden>-</option>
                        <option value="monocristalino">Monocristalino</option>
                        <option value="policristalino">Policristalino</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                </div>
              )}
              {(tipoProduto==='inversor') && (
                <div>
                  <Form.Group as={Row} className="my-2">
                    <Form.Label column xs={2}>Tipo de Inversor: </Form.Label>
                    <Col xs={2} className="justify-content-start text-left align-left">                
                    <Form.Control as="select" name="tipoInversor" placeholder="Classe"
                                  value={tipoInversor} onChange={e => setTipoInversor(e.target.value)}>
                      <option selected hidden>-</option>
                      <option value="monofasico220">Monofásico 220</option>
                      <option value="trifasico220">Trifásico 220</option>
                      <option value="trifasico380">Trifásico 380</option>
                    </Form.Control>
                    </Col>
                  </Form.Group>
                </div>
              )}
              {(tipoProduto==='estrutura') && (
                <div>
                  <Form.Group as={Row} className="my-2">
                    <Form.Label column xs={2}>Tipo de Estrutura: </Form.Label>
                    <Col xs={3} className="justify-content-start text-left align-left">                
                    <Form.Control as="select" name="tipoEstrutura" placeholder="Classe"
                                  value={tipoEstrutura} onChange={e => setTipoEstrutura(e.target.value)}>
                      <option selected hidden>-</option>
                      <option value="colonial">Colonial</option>
                      <option value="eternitFibrocimento">Eternit/Fibrocimento</option>
                      <option value="telhaMetalica">Telha Metálica</option>
                      <option value="laje">Laje</option>
                      <option value="solo">Solo</option>
                    </Form.Control>
                    </Col>
                  </Form.Group>
                </div>
              )}
          </Container>
        </Form>
      </Container>
      )}
      {erro && (
        <Alert variant="danger">
          Erro!: 
          {msgErro}
        </Alert>
      )}
      <Modal show={mostrarModalCarregando} onHide={handleCloseCarregando}>
        <Modal.Body className='justify-content-start text-center align-center'>
          <Spinner animation="grow" />
          Carregando...        
        </Modal.Body>
      </Modal>    
      <Modal show={mostrarModalMsg} onHide={handleCloseModalMsg}>
        <Modal.Body className='justify-content-start text-center align-center'>
          {msgAoCadastrar}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalMsg}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Produtos;