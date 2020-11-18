import React from 'react'
import { useHistory } from 'react-router-dom';

interface Produto{
  codProduto: number;
  nome: string;
  marca: string;
  potencia: number;
  custoMedioMensal: number;
  custoUltimaCompra: number;
  tipoProduto: string;
  tipoModulo: string;
  tipoInversor: string;
  tipoEstrutura: string;
}
interface ListaProdutosProps{
  produto: Produto;
}
const ListaProdutos: React.FC<ListaProdutosProps> = (props) =>{
  const history = useHistory();
  function handleClick(){
    history.push('/produtos/'+props.produto.codProduto)
  }
  return (
    <tr onClick={handleClick}>
      <td>{props.produto.codProduto}</td>
      <td>{props.produto.nome}</td>
      <td>{props.produto.marca}</td>
    </tr>
  );
}

export default ListaProdutos;