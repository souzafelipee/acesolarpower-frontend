import React from 'react'
import { useHistory } from 'react-router-dom';


interface Kit{
  codKit: number;
  nome: string;
  precoVenda: number;
  qtdeModulos: number;
  potenciaModulo: number;
  tipoModulo: string;
  marcaModulo: string;
  descricaoModulo: string;
  qtdeInversor: number;
  potenciaInversor: number;
  tipoInversor: string;
  marcaInversor: string;
  descricaoInversor: string;
  tipoEstrutura: string;
  descricaoCompleta: string;  
}
interface ListaKitsProps{
  kit: Kit;
}
const ListaKits: React.FC<ListaKitsProps> = (props) =>{
  const history = useHistory();
  function handleClick(){
    history.push('/kits/'+props.kit.codKit)
  }
  return (
    <tr onClick={handleClick}>
      <td>{props.kit.codKit}</td>
      <td>{props.kit.nome}</td>
    </tr>
  );
}

export default ListaKits;