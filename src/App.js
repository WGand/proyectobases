import React from "react";
import Home from "./components/Home";
import Carrito from "./components/Carrito";
import Perfil from "./components/Perfil";
import PrimarySearchAppBar from "./components/Appbar";
import Divider from "@material-ui/core/Divider";
import ReposicionInventario from "./components/ReposicionInventario";
import ProcesarPedidos from "./components/ProcesarPedidos";
import Reportes from "./components/Reportes";
import ControlEmpleado from "./components/ControlEmpleado";
import ControlUsuario from "./components/ControlUsuario";
import ControlProveedor from "./components/ControlProveedor";
import ControlTienda from "./components/ControlTienda";
import TiendaRegistrar from "./components/TiendaRegistrar";
import TiendaModificar from "./components/TiendaModificar";
import TiendaInventario from "./components/TiendaInventario";
import NotiMart from "./components/NotiMart";
import ControlProducto from "./components/ControlProducto";
import ProductoRegistrar from "./components/ProductoRegistrar";
import ProductoModificar from "./components/ProductoModificar";
import Registrar from "./components/Registrar";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const [datos, setDatos] = React.useState([]);
  const [tipoPersona, setTipoPersona] = React.useState("");

  const datosUsuario = (datosAppbar) => {
    setDatos(datosAppbar);
  };

  const tipo = (tipoAppbar) => {
    setTipoPersona(tipoAppbar);
  };

  return (
    <BrowserRouter>
      <PrimarySearchAppBar conseguirDatos={datosUsuario} conseguirTipo={tipo} />
      <Switch>
        <Route exact path={["/", "/proyectobases"]}>
          <Home />
        </Route>
        <Route path="/carrito">
          <Carrito />
        </Route>
        <Route exact path="/perfil/reposicion">
          <ReposicionInventario />
        </Route>
        <Route exact path="/perfil/procesarpedidos">
          <ProcesarPedidos />
        </Route>
        <Route exact path="/perfil/reportes">
          <Reportes />
        </Route>
        <Route exact path="/perfil/controlempleado">
          <ControlEmpleado />
        </Route>
        <Route exact path="/perfil/controlusuario">
          <ControlUsuario />
        </Route>
        <Route exact path="/perfil/controlproveedor">
          <ControlProveedor />
        </Route>
        <Route exact path="/perfil/controltienda">
          <ControlTienda />
        </Route>
        <Route exact path="/perfil/notimart">
          <NotiMart />
        </Route>
        <Route exact path="/perfil/controltienda/registrar">
          <TiendaRegistrar />
        </Route>
        <Route exact path="/perfil/controltienda/modificar">
          <TiendaModificar />
        </Route>
        <Route exact path="/perfil/controltienda/inventario">
          <TiendaInventario />
        </Route>
        <Route exact path="/perfil/controlproducto">
          <ControlProducto />
        </Route>
        <Route exact path="/perfil/controlproducto/registrar">
          <ProductoRegistrar />
        </Route>
        <Route exact path="/perfil/controlproducto/modificar">
          <ProductoModificar />
        </Route>
        <Route path="/perfil">
          <Perfil datos={datos} tipo={tipoPersona} />
        </Route>
        <Route path="/registrar">
          <Registrar />
        </Route>
      </Switch>
      <Divider variant="middle" class="border border-primary m-4" />
    </BrowserRouter>
  );
}

export default App;
