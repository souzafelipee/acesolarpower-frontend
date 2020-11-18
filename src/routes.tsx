import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import FiltroClientes from './pages/FiltroClientes';
import FiltroProdutos from './pages/FiltroProdutos';
import Clientes from './pages/Clientes';
import DashBoard from './pages/DashBoard';
import Produtos from './pages/Produtos';
import Login from './pages/Login';

function Routes(){    
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/filtroclientes" component={FiltroClientes}/>                
                <Route exact path="/clientes" component={Clientes}/>                
                <Route path="/clientes/:codCliente" component={Clientes}/>
                <Route path="/filtroprodutos" component={FiltroProdutos}/>
                <Route exact path="/produtos" component={Produtos}/>                
                <Route path="/produtos/:codProduto" component={Produtos}/>
                <Route path="/dashboard" component={DashBoard}/>
            </Switch>
        </BrowserRouter>        
    );    
}
export default Routes;