import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import FiltroClientes from './pages/FiltroClientes';
import FiltroProdutos from './pages/FiltroProdutos';
import FiltroKits from './pages/FiltroKits';
import Clientes from './pages/Clientes';
import DashBoard from './pages/DashBoard';
import Produtos from './pages/Produtos';
import Login from './pages/Login';
import Kits from './pages/Kits';

function Routes(){    
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/dashboard" component={DashBoard}/>
                <Route path="/filtroclientes" component={FiltroClientes}/>                
                <Route exact path="/clientes" component={Clientes}/>                
                <Route path="/clientes/:codCliente" component={Clientes}/>
                <Route path="/filtroprodutos" component={FiltroProdutos}/>
                <Route exact path="/produtos" component={Produtos}/>      
                <Route path="/filtrokits" component={FiltroKits}/>
                <Route exact path="/kits" component={Kits}/>
                <Route path="/kits/:codKit" component={Kits}/>
                <Route path="/produtos/:codProduto" component={Produtos}/>                
            </Switch>
        </BrowserRouter>        
    );    
}
export default Routes;