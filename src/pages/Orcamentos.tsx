import React, {FormEvent, useEffect, useState} from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { VscSave } from 'react-icons/vsc';
import SideBar from '../components/SideBar';
import InputString from '../components/InputString';

function Orcamentos(){
  const [codOrcamento, setCodOrcamento] = useState('');  
  return(
    <div id="pages-dashboard" >
      <SideBar />
      <Form>
        <Container className="border">
          <Row className="justify-content-center text-center align-center mt-3">
            <b>Orçamentos</b>
          </Row>
          <Container className="mt-3">
            <Form.Group >
              <Row className="justify-content-start text-center align-center border">
                <Button variant="success" type='submit'><VscSave/> Salvar</Button>
              </Row>
            </Form.Group>
          </Container>
          <Container className="mt-1 border">            
            <Form.Group as={Row} size="sm">                            
              <InputString 
                stateName='codOrcamento' state={codOrcamento} placeHolder='Código'
                functionState={setCodOrcamento} label='Cód:' tamanhoLabel={1}
                tamanhoInput={2} readOnly={true} 
              />              
              <InputString 
                tamanhoLabel={1} label='Cliente: '   
                tamanhoInput={8} stateName='cliente' placeHolder='Cliente'
                state={codOrcamento} functionState={setCodOrcamento}
              />
            </Form.Group>
            <Form.Group as={Row} size="sm">
              <InputString 
                tamanhoLabel={3} label='Qtde Modulos sugerida: '   
                tamanhoInput={2} stateName='cliente' placeHolder='Qtde'
                state={codOrcamento} functionState={setCodOrcamento}
              />
            </Form.Group>
          </Container>
        </Container>
      </Form>
    </div>
  );
}
export default Orcamentos;