import React from 'react'
import { useHistory } from 'react-router-dom';

interface Cliente{
  codCliente: number;
  celular: string;
  cnpjCpf: string;
  email: string;
  nome: string;
}
interface ListaClientesProps{
  cliente: Cliente;
}
const ListaClientes: React.FC<ListaClientesProps> = (props) =>{
  const history = useHistory();
  function handleClick(){
    history.push('/clientes/'+props.cliente.codCliente)
  }
  return (
    <tr onClick={handleClick}>
      <td>{props.cliente.codCliente}</td>
      <td>{props.cliente.cnpjCpf}</td>
      <td>{props.cliente.nome}</td>
    </tr>
  );
}

export default ListaClientes;