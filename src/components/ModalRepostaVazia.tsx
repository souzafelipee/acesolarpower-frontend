import React from 'react';
import {Modal, Button} from 'react-bootstrap';

interface ModalRespostaVaziaProps{  
  mostrarModal: boolean;
  handleClose: any;
  mensagem: string;
}

const ModalRespostaVazia: React.FC<ModalRespostaVaziaProps> = (props) =>{
  return (    
    <>
    <Modal show={props.mostrarModal} onHide={props.handleClose}>
      <Modal.Body className='justify-content-start text-center align-center'>
      {props.mensagem}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}
export default ModalRespostaVazia;