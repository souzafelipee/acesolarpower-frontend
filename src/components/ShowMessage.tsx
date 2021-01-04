import React from 'react';
import {Modal, Button} from 'react-bootstrap';

interface ShowMessageProps{  
  mostrarModal: boolean;
  handleClose: any;
  mensagem: string;
}

const ShowMessage: React.FC<ShowMessageProps> = (props) =>{
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
export default ShowMessage;