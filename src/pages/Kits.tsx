import React, {FormEvent, useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../services/api';
import SideBar from '../components/SideBar';
import { Button, Col, Container, Form, InputGroup, Row, Tab, Tabs } from 'react-bootstrap';
import { VscSave } from 'react-icons/vsc';
import InputString from '../components/InputString';

interface KitParams{
  codKit: string;
}

function Kits(){
  const params = useParams<KitParams>();
  const history = useHistory();

  const [codKit, setCodKit] = useState('');  
  const [nome, setNome] = useState('');  
  const [precoVenda, setPrecoVenda] = useState('');
  const [qtdeModulos, setQtdeModulos] = useState('');
  const [potenciaModulo, setPotenciaModulo] = useState('');
  const [tipoModulo, setTipoModulo] = useState('');
  const [descricaoModulo, setDescricaoModulo] = useState('');
  const [marcaModulo, setMarcaModulo] = useState('');
  const [qtdeInversor, setQtdeInversor] = useState('');
  const [potenciaInversor, setPotenciaInversor] = useState('');
  const [tipoInversor, setTipoInversor] = useState('');
  const [marcaInversor, setMarcaInversor] = useState('');
  const [descricaoInversor, setDescricaoInversor] = useState('');
  const [tipoEstrutura, setTipoEstrutura] = useState('');
  const [descricaoCompleta, setDescricaoCompleta] = useState('');

  async function getKit() {
    console.log('chamou o getKit')
    await api.get(`kit/${params.codKit}`).then((response:any) => {
      const kitAux = response.data;
      console.log(response.data)
      setCodKit(kitAux.codKit);
      setNome(kitAux.nome);
      setPrecoVenda(kitAux.precoVenda);
      setQtdeModulos(kitAux.qtdeModulos);
      setPotenciaModulo(kitAux.potenciaModulo);
      setTipoModulo(kitAux.tipoModulo);
      setDescricaoModulo(kitAux.descricaoModulo);
      setMarcaModulo(kitAux.marcaModulo);
      setQtdeInversor(kitAux.qtdeInversor);
      setPotenciaInversor(kitAux.potenciaInversor);
      setTipoInversor(kitAux.tipoInversor);
      setMarcaInversor(kitAux.marcaInversor);
      setDescricaoInversor(kitAux.descricaoInversor)
      setTipoEstrutura(kitAux.tipoEstrutura);
      setDescricaoCompleta(kitAux.descricaoCompleta);
    })
    .catch((error:any) => {   
      //testar
    });
  }

  useEffect( () => {
    console.log('chamou o useEffect')
    console.log(params.codKit)
    if (!(params.codKit === undefined)){      
      getKit();      
    }    
  }, [params.codKit]);

  function trataRespostaKitSucesso(){
    history.push('/filtroKits')
  }
  function trataRespostaKitErro(dados:any){
  }

  async function handleSubmit(e: FormEvent){
    e.preventDefault();
    const kit = {nome,precoVenda,tipoEstrutura,descricaoCompleta,
                qtdeModulos,potenciaModulo,tipoModulo,descricaoModulo,marcaModulo,
                qtdeInversor,potenciaInversor,tipoInversor,descricaoInversor,marcaInversor}
    if (!(params.codKit === undefined)){
      await api.post(`kit/${params.codKit}`, kit).then((response:any) => {
        trataRespostaKitSucesso();
      })
      .catch((error:any) => {   
        trataRespostaKitErro(error);
      })     
    }
    else{
      await api.post('kit', kit).then((response:any) => {
        trataRespostaKitSucesso();
      })
      .catch((error:any) => {   
        trataRespostaKitErro(error);
      })     
    }        
  }
  return(
    <div id='page-Kits'>
    <SideBar/>
    <Form onSubmit={handleSubmit}>
      <Container className="mt-3">
        <Form.Group >
          <Row className="justify-content-start text-center align-center border">
            <Button variant="success" type='submit'><VscSave/> Salvar</Button>
          </Row>
        </Form.Group>
      </Container>
      <Container className="mt-1 border">
      <Tabs defaultActiveKey="kitTab">        
        <Tab  eventKey="kitTab" title="Kit">        
          <Form.Group as={Row} className="m-1" size="sm">                            
            <InputString 
              stateName='codKit' state={codKit} placeHolder='Código'
              functionState={setCodKit} label='Cód:' tamanhoLabel={1}
              tamanhoInput={2} readOnly={true} 
            />              
            <InputString 
              tamanhoLabel={1} label='Nome: '   
              tamanhoInput={8} stateName='nome' placeHolder='Nome'
              state={nome} functionState={setNome}                 
            />          
          </Form.Group>      
        <Form.Group as={Row} className="m-1" size="sm">
          <InputString 
            tamanhoLabel={1} label='Valor: '   
            tamanhoInput={2} stateName='precoVenda' placeHolder='Valor'
            state={precoVenda} functionState={setPrecoVenda}                 
          />
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
        <fieldset className="border p-2 m-2">
          <legend className="w-auto form-control my-0" >Módulo</legend>        
          <Form.Group as={Row} className="my-0">
            <InputString 
              tamanhoLabel={1} label='Qtde: '   
              tamanhoInput={2} stateName='qtdeModulos' placeHolder='Qtde'
              state={qtdeModulos} functionState={setQtdeModulos}                 
            />
            <InputString 
              tamanhoLabel={1} label='Descrição: '   
              tamanhoInput={5} stateName='descricaoModulo' placeHolder='Descrição'
              state={descricaoModulo} functionState={setDescricaoModulo}                 
            />
            <InputString 
              tamanhoLabel={1} label='Marca: '   
              tamanhoInput={2} stateName='marcaModulo' placeHolder='Marca'
              state={marcaModulo} functionState={setMarcaModulo}                 
            />
          </Form.Group>
          <Form.Group as={Row} className="my-1">
            <Form.Label column xs={1}>Potência: </Form.Label>
            <Col xs={2} className="justify-content-start text-left align-left">                
              <InputGroup>
                <Form.Control type='text' name="potencia" placeholder="Potência"
                              value={potenciaModulo} onChange={e => setPotenciaModulo(e.target.value)} />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon2">W</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>          
            <Form.Label column xs={1}>Tipo: </Form.Label>
            <Col xs={2} className="justify-content-start text-left align-left">                
              <Form.Control as="select" name="tipoModulo" placeholder="Tipo de Módulo"
                            value={tipoModulo} onChange={e => setTipoModulo(e.target.value)}>
                <option selected hidden>-</option>
                <option value="monocristalino">Monocristalino</option>
                <option value="policristalino">Policristalino</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </fieldset>
        <fieldset className="border mx-2 mt-1 p-2">
          <legend className="w-auto form-control my-0" >Inversor</legend>        
          <Form.Group as={Row} className="my-0">
          <InputString 
            tamanhoLabel={1} label='Qtde: '   
            tamanhoInput={2} stateName='qtdeIversor' placeHolder='Qtde'
            state={qtdeInversor} functionState={setQtdeInversor}                 
          />
          <InputString 
            tamanhoLabel={1} label='Descrição: '   
            tamanhoInput={5} stateName='descricaoInversor' placeHolder='Descrição'
            state={descricaoInversor} functionState={setDescricaoInversor}
          />
          <InputString 
            tamanhoLabel={1} label='Marca: '   
            tamanhoInput={2} stateName='marcaInversor' placeHolder='Marca'
            state={marcaInversor} functionState={setMarcaInversor}          
          />
        </Form.Group>
        <Form.Group as={Row} className="my-1">
          <Form.Label column xs={1}>Potência: </Form.Label>
          <Col xs={2} className="justify-content-start text-left align-left">                
            <InputGroup>
              <Form.Control type='text' name="potenciaInversor" placeholder="Potência"
                            value={potenciaInversor} onChange={e => setPotenciaInversor(e.target.value)} />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon2">W</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Form.Label column xs={1}>Tipo: </Form.Label>
          <Col xs={3} className="justify-content-start text-left align-left">                
            <Form.Control as="select" name="tipoInversor" placeholder="Tipo de Inversor"
                          value={tipoInversor} onChange={e => setTipoInversor(e.target.value)}>
              <option selected hidden>-</option>
              <option value="monofasico220">Monofásico 220</option>
              <option value="trifasico220">Trifásico 220</option>
              <option value="trifasico380">Trifásico 380</option>
            </Form.Control>
          </Col>
          </Form.Group>
        </fieldset>
        <Form.Group className="mx-2 mt-0 mb-1">
          <Form.Label column xs={2}>Descrição completa:</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>      
      </Tab>      
      <Tab className="border" eventKey="produtosTab" title="Produtos">        
      </Tab>
    </Tabs>          
    </Container>           
    </Form>
    </div>
  );
}

export default Kits;