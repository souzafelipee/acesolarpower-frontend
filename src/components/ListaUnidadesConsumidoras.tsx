import React from 'react'
import { useHistory } from 'react-router-dom';

interface UnidadeConsumidora{
  numeroUC: string;
  endereco: string;
  numero: string;
  codCidade: string;
  bairro: string;
  consumoMedioMensal: string;
  taxaDisponibilidade: string;
  classe: string;
  fase: string;
}
interface ListaUnidadeConsumidora{
  unidadeConsumidora: UnidadeConsumidora;
}
const ListaUnidadesConsumidoras: React.FC<ListaUnidadeConsumidora> = (props) =>{
  const history = useHistory();
  function handleClick(){
  }
  return (
    <tr onClick={handleClick}>
      <td>{props.unidadeConsumidora.numeroUC}</td>
      <td>{props.unidadeConsumidora.endereco}</td>
      <td>{props.unidadeConsumidora.codCidade}</td>
    </tr>
  );
}

export default ListaUnidadesConsumidoras;