import React from 'react';
import {Col,Form} from 'react-bootstrap'

interface InputProps{  
  state: string;
  stateName:string;
  placeHolder: string;
  functionState: Function;
  label: string;  
  tamanhoLabel: number;
  tamanhoInput: number;
  readOnly?: boolean | undefined;
}
const InputString: React.FC<InputProps> = (props) =>{
  return(
    <>
      <Form.Label column xs={props.tamanhoLabel}>{props.label}</Form.Label>
      <Col xs={props.tamanhoInput} className="justify-content-start text-left align-left">                
        <Form.Control readOnly={props.readOnly ?? false} type='text' 
                      name={props.stateName} placeholder={props.placeHolder}
                      value={props.state} onChange={e => props.functionState(e.target.value)} />
      </Col>
    </>
  );
}

export default InputString;