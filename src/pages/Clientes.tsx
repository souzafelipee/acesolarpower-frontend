import React, { useState, FormEvent, useEffect} from 'react';
import SideBar from '../components/SideBar';
import MaskedInput from "react-maskedinput"; 
import {Container,Form,Row,Col,Button,Card,Table,InputGroup,Spinner,Alert,Modal} from 'react-bootstrap';
import api from '../services/api';
import { useParams, useHistory } from 'react-router-dom';
import { VscSave } from 'react-icons/vsc';
import { BsCheck } from 'react-icons/bs';
interface ClienteParams{
  codCliente: string;
}
/*interface Cliente{
  celular: string;
  codCliente: string;
  email: string;
  nome: string;
  cnpjCpf: string;
}*/
interface UnidadeConsumidora{
  numeroUC: string;
  endereco: string;
  numero: string;
  codCidade: string;
  bairro: string;
  consumoMedioMensal: string;
  taxaDisponibilidade: string;
  classe: string;
  fase: string;
  seq: number;
}
function Clientes(){
  const params = useParams<ClienteParams>();
  const history = useHistory();
  //const [cliente, setCliente] = useState<Cliente>();
  const [unidadesConsumidoras, setUnidadesConsumidoras] = useState<UnidadeConsumidora[]>([]);
  const [codCliente, setCodCliente] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [cnpjCpf, setCnpjCpf] = useState('');
  const [numeroUC, setNumeroUC] = useState('');
  const [enderecoUC, setEnderecoUC] = useState('');
  const [numeroEnderecoUC, setNumeroEnderecoUC] = useState('');
  const [codCidadeUC, setCodCidadeUC] = useState('');
  const [bairroUC, setBairroUC] = useState('');
  const [consumoMedioMensalUC, setConsumoMedioMensalUC] = useState('');
  const [taxaDisponibilidadeUC, setTaxaDisponibilidadeUC] = useState('');
  const [classeUC, setClasseUC] = useState('');
  const [faseUC, setFaseUC] = useState('');
  const [seqUC, setSeqUC] = useState(-1);  
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);
  const [msgErro, setMsgErro] = useState('');
  const [msgAoCadastrar, setMsgAoCadastrar] = useState('');
  const [mostrarModalMsg, setMostrarModalMsg] = useState(false);
  const handleCloseModalMsg = () => setMostrarModalMsg(false);
  const [mostrarModalCarregando, setMostrarModalCarregando] = useState(false);
  const handleCloseCarregando = () => setMostrarModalCarregando(false);

  
  async function getCliente() {
    setCarregando(true);
    await api.get(`cliente/${params.codCliente}`).then(response => {
      setCarregando(false)
      const clienteAux = response.data;
      //setCliente(response.data);
      setCodCliente(clienteAux.codCliente);
      setCelular(clienteAux.celular);
      setEmail(clienteAux.email);
      setNome(clienteAux.nome);
      setCnpjCpf(clienteAux.cnpjCpf);
      setUnidadesConsumidoras(clienteAux.unidadesConsumidoras)
    })
    .catch(error => {   
      setCarregando(false)
      setMsgErro(String(error))
      setErro(true)
    });    
  }
  useEffect( () => {
    if (!(params.codCliente === undefined)){      
      getCliente();      
    }    
  }, [params.codCliente]);
  function handleClickAdicionar(){ 
    console.log('seqUC')   
    console.log(seqUC)   
    if (!(seqUC === -1)) {
      let unidadesConsumidorasAux = [...unidadesConsumidoras]
      unidadesConsumidorasAux[seqUC].bairro = bairroUC
      unidadesConsumidorasAux[seqUC].classe = classeUC
      unidadesConsumidorasAux[seqUC].codCidade = codCidadeUC
      unidadesConsumidorasAux[seqUC].consumoMedioMensal = consumoMedioMensalUC
      unidadesConsumidorasAux[seqUC].endereco = enderecoUC
      unidadesConsumidorasAux[seqUC].fase = faseUC
      unidadesConsumidorasAux[seqUC].numero = numeroEnderecoUC
      unidadesConsumidorasAux[seqUC].numeroUC = numeroUC
      unidadesConsumidorasAux[seqUC].taxaDisponibilidade = taxaDisponibilidadeUC
      setUnidadesConsumidoras(unidadesConsumidorasAux)
    }
    else{
      var unidadeConsumidoraTipada: UnidadeConsumidora = {
        numeroUC,
        "endereco": enderecoUC,
        "numero": numeroEnderecoUC,
        "codCidade": codCidadeUC,
        "bairro": bairroUC,
        "consumoMedioMensal": consumoMedioMensalUC,
        "taxaDisponibilidade":taxaDisponibilidadeUC,
        "classe":classeUC,
        "fase": faseUC,
        "seq": (unidadesConsumidoras.length)
      };
      setUnidadesConsumidoras([...unidadesConsumidoras, unidadeConsumidoraTipada])
      setNumeroUC('')
      setEnderecoUC('')
      setNumeroEnderecoUC('')
      setCodCidadeUC('')
      setBairroUC('')
      setConsumoMedioMensalUC('')
      setTaxaDisponibilidadeUC('')
      setClasseUC('')
      setFaseUC('')
      setSeqUC(-1)
    }    
    console.log('unidadesConsumidoras:')
    console.log(unidadesConsumidoras)
  };
  function handleClickUnidade(unidadeConsumidora: UnidadeConsumidora){
    console.log(unidadeConsumidora)
    setNumeroUC(unidadeConsumidora.numeroUC)
    setEnderecoUC(unidadeConsumidora.endereco)
    setNumeroEnderecoUC(unidadeConsumidora.numero)
    setCodCidadeUC(unidadeConsumidora.codCidade)
    setBairroUC(unidadeConsumidora.bairro)
    setConsumoMedioMensalUC(unidadeConsumidora.consumoMedioMensal)
    setTaxaDisponibilidadeUC(unidadeConsumidora.taxaDisponibilidade)
    setClasseUC(unidadeConsumidora.classe)
    setFaseUC(unidadeConsumidora.fase)
    setSeqUC(unidadeConsumidora.seq)
  }
  function trataRespostaClienteSucesso(){
    setMostrarModalCarregando(false)
    history.push('/filtroclientes')
  }
  function trataRespostaClienteErro(dados:any){
    setMostrarModalCarregando(false)
    setMsgAoCadastrar('Erro ao Cadastrar Cliente: \n'+String(dados))
    setMostrarModalMsg(true)
  }
  async function handleSubmit(e: FormEvent){
    e.preventDefault();
    const cliente = {celular,email,nome,cnpjCpf,unidadesConsumidoras}
    setMostrarModalCarregando(true)
    if (!(params.codCliente === undefined)){
      await api.post(`cliente/${params.codCliente}`, cliente).then(response => {
        trataRespostaClienteSucesso();
      })
      .catch(error => {   
        trataRespostaClienteErro(error);
      })     
    }
    else{
      await api.post('cliente', cliente).then(response => {
        trataRespostaClienteSucesso();
      })
      .catch(error => {   
        trataRespostaClienteErro(error);
      })     
    }        
  }
  return (
    <div id='page-Clientes'>
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
                  <Form.Control readOnly={true} type='text' name="codCliente" placeholder="código"
                                value={codCliente} onChange={e => setCodCliente(e.target.value)} />
                </Col>
                <Form.Label column xs={1}>Nome:</Form.Label>
                <Col xs={8}className="justify-content-start text-left align-left">
                  <Form.Control className="py-1" type='text' name="nome" placeholder="Nome" 
                                value={nome} onChange={e => setNome(e.target.value)}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="my-2">                            
                <Form.Label column xs={2}>CPF/CNPJ:</Form.Label>
                <Col xs={4} className="justify-content-start text-left align-left">                
                  <Form.Control type='text' name="cpfCnpj" placeholder="CPF/CPNJ" 
                                value={cnpjCpf} onChange={e => setCnpjCpf(e.target.value)}/>
                </Col>
                <Form.Label column xs={2}>Celular:</Form.Label>
                <Col xs={4}className="justify-content-start text-left align-left">
                  <Form.Control as={MaskedInput} mask='(11)11111-1111' type='text' name="celular" placeholder="Celular" 
                                value={celular} onChange={e => setCelular(e.target.value)}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="my-2">                            
                <Form.Label column xs={2}>Email:</Form.Label>
                <Col xs={10} className="justify-content-start text-left align-left">                
                  <Form.Control  type='text' name="email" placeholder="Email" 
                                value={email} onChange={e => setEmail(e.target.value)}/>
                </Col>
              </Form.Group>
              <Container className="mt-1 border">
                <Card bg='dark' text='white' className='text-center'>Unidades Consumidoras:</Card>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                    <th>#</th>  
                    <th>Número UC</th>
                    <th>Endereço</th>
                    <th>Numero</th>
                    <th>Bairro</th>
                    <th>Cidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unidadesConsumidoras.map(unidadeConsumidora => (                    
                      <tr key={unidadeConsumidora.numeroUC} onClick={ e => handleClickUnidade(unidadeConsumidora)}>
                        <td>{unidadeConsumidora.seq}</td>
                        <td>{unidadeConsumidora.numeroUC}</td>
                        <td>{unidadeConsumidora.endereco}</td>
                        <td>{unidadeConsumidora.numero}</td>
                        <td>{unidadeConsumidora.bairro}</td>
                        <td>{unidadeConsumidora.codCidade}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Form.Group as={Row} className="my-2">                            
                  <Form.Label column xs={2}>Número UC:</Form.Label>
                  <Col xs={2} className="justify-content-start text-left align-left">                
                    <Form.Control type='text' name="numeroUC" placeholder="Número UC"
                                  value={numeroUC} onChange={e => setNumeroUC(e.target.value)} />
                  </Col>
                </Form.Group>                
                <Form.Group as={Row} className="my-2">                            
                  <Form.Label column xs={1}>Endereço:</Form.Label>
                    <Col xs={7} className="justify-content-start text-left align-left">                
                      <Form.Control type='text' name="EnderecoUC" placeholder="Endereço"
                                    value={enderecoUC} onChange={e => setEnderecoUC(e.target.value)} />
                    </Col>                                
                  <Form.Label column xs={1}>Numero:</Form.Label>
                  <Col xs={3} className="justify-content-start text-left align-left">                
                    <Form.Control type='text' name="numeroUC" placeholder="Número Endereço"
                                  value={numeroEnderecoUC} onChange={e => setNumeroEnderecoUC(e.target.value)} />
                  </Col>                
                </Form.Group>
                <Form.Group as={Row} className="my-2">                            
                  <Form.Label column xs={1}>Cidade:</Form.Label>
                    <Col xs={3} className="justify-content-start text-left align-left">                
                      <Form.Control type='text' name="CidadeUC" placeholder="Cidade"
                                    value={codCidadeUC} onChange={e => setCodCidadeUC(e.target.value)} />
                    </Col>                                
                  <Form.Label column xs={1}>Bairro:</Form.Label>
                  <Col xs={3} className="justify-content-start text-left align-left">                
                    <Form.Control type='text' name="BairroUC" placeholder="Bairro UC"
                                  value={bairroUC} onChange={e => setBairroUC(e.target.value)} />
                  </Col>                
                  <Form.Label column xs={1}>CMM:</Form.Label>
                  <Col xs={3} className="justify-content-start text-left align-left">                
                    <InputGroup>
                      <Form.Control type='text' name="ConsumoMedioMensalUC" placeholder="CMM"
                                    value={consumoMedioMensalUC} onChange={e => setConsumoMedioMensalUC(e.target.value)} />
                      <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2">kWh/mês</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="my-2">                                                
                  <Form.Label column xs={2}>Taxa Disponibilidade:</Form.Label>
                  <Col xs={3} className="justify-content-start text-left align-left">                
                    <InputGroup>
                      <Form.Control type='text' name="BairroUC" placeholder="Taxa disponibilidade"
                                    value={taxaDisponibilidadeUC} onChange={e => setTaxaDisponibilidadeUC(e.target.value)} />
                      <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2">kWh/mês</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>                
                  <Form.Label column xs={1}>Classe:</Form.Label>
                  <Col xs={2} className="justify-content-start text-left align-left">                
                    <Form.Control as="select" name="ClasseUC" placeholder="Classe"
                                  value={classeUC} onChange={e => setClasseUC(e.target.value)}>
                      <option selected hidden>-</option>
                      <option value="Residencial">Residencial</option>
                      <option value="Rural">Rural</option>
                      <option value="ComercialServicosOutros">ComercialServicosOutros</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Religioso">Religioso</option>
                    </Form.Control>
                  </Col>
                  <Form.Label column xs={1}>Fase: </Form.Label>
                  <Col xs={3} className="justify-content-start text-left align-left">                
                    <Form.Control as="select"type='text' name="FaseUC" placeholder="Fase"
                                  value={faseUC} onChange={e => setFaseUC(e.target.value)}>
                      <option selected hidden>-</option>
                      <option value="Monofasico">Monofasico</option>
                      <option value="Bifasico">Bifasico</option>
                      <option value="Trifasico">Trifasico</option>                    
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group className="justify-content-start text-center align-center" as={Row}>
                  <Button variant="success" type='button' onClick={handleClickAdicionar}><BsCheck/>Gravar</Button>
                </Form.Group>
              </Container>
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
      <Modal show={mostrarModalCarregando} onHide={handleCloseCarregando}>
        <Modal.Body className='justify-content-start text-center align-center'>
          <Spinner animation="grow" />
          Carregando...        
        </Modal.Body>
      </Modal>    
    </div>
  );
}
export default Clientes