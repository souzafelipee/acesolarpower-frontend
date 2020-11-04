import React from 'react';
import SideBar from '../components/SideBar';
import imgClientes from '../img/clientes.png';
import {Container, Image,FormLabel,Card} from 'react-bootstrap';
import { useHistory,Link } from 'react-router-dom';

function DashBoard(){
  const history = useHistory();
  function handleClickCard(event: any){
    history.push('/filtroclientes');
  }
  return(
    <div id="pages-dashboard" >
      <SideBar />
      <Container className="mt-3 ml-5 border">
        <Link to='/filtroclientes'>
          <Card style={{ width: '8rem' }} >
            <Card.Img variant="top" src={imgClientes} />
            <Card.Body>
              <Card.Title>Clientes</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Container>
    </div>
  );
}
export default DashBoard