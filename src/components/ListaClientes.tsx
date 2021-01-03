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
const ListaClientes: React.FC<ListaClientesProps> = ({cliente}) =>{
  const history = useHistory();
  function handleClick(){
    history.push('/clientes/'+cliente.codCliente)
  }
  return (
    <tr onClick={handleClick}>
      <td>{cliente.codCliente}</td>
      <td>{cliente.cnpjCpf}</td>
      <td>{cliente.nome}</td>
    </tr>
  );
}

export default ListaClientes;