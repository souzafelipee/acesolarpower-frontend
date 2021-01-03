import React from 'react'
import { usePromiseTracker} from 'react-promise-tracker'
import {Spinner, Modal} from 'react-bootstrap';

function LoadingSpinerComponent(){
  const { promiseInProgress } = usePromiseTracker();
  return (    
    <>
    <Modal show={promiseInProgress}>
      <Modal.Body className='justify-content-start text-center align-center'>
        <Spinner animation="grow" />
        Carregando...        
      </Modal.Body>
    </Modal>  
    </>
  )
}

export default LoadingSpinerComponent;