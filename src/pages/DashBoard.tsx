import React from 'react';
import SideBar from '../components/SideBar';
import imgClientes from '../img/clientes2.png';
import imgKits from '../img/kits.png';
import imgProdutos from '../img/produtos.png';
import imgOrcamentos from '../img/orcamentos.png';
import {Container, Card, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DashBoard(){
  return(
    <div id="pages-dashboard" >
      <SideBar />
      <Container className="mt-3 ml-5 border">
        <Row>
          <Link to='/orcamentos'>
            <Card className="justify-content-center text-center align-center" style={{ width: '10rem' }} >
              <Card.Img variant="top" src={imgOrcamentos} />
              <Card.Body>
                <Card.Title>Orçamentos</Card.Title>
              </Card.Body>
            </Card>
          </Link>
          <Link to='/filtroclientes'>
            <Card className="justify-content-center text-center align-center" style={{ width: '10rem' }} >
              <Card.Img variant="top" src={imgClientes} />
              <Card.Body>
                <Card.Title >Clientes</Card.Title>
              </Card.Body>
            </Card>
          </Link>
          <Link to='/filtrokits'>
            <Card className="justify-content-center text-center align-center" style={{ width: '10rem' }} >
              <Card.Img variant="top" src={imgKits} />
              <Card.Body >
                <Card.Title >Kits</Card.Title>
              </Card.Body>
            </Card>
          </Link>
          <Link to='/filtroprodutos'>
            <Card className="justify-content-center text-center align-center" style={{ width: '10rem' }} >
              <Card.Img variant="top" src={imgProdutos} />
              <Card.Body >
                <Card.Title >Produtos</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Row>
      </Container>
    </div>
  );
}
export default DashBoard