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
import CrearEmpleado from "./components/CrearEmpleado";
import ModificarEmpleado from "./components/ModificarEmpleado";
import ModificarTienda from "./components/ModificarTienda";
import ProcederPago from "./components/ProcederPago";
import ModificacionProducto from "./components/ModificacionProducto";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const [datos, setDatos] = React.useState([]);
  const [tipoPersona, setTipoPersona] = React.useState("");
  const [empleado, setEmpleado] = React.useState({});
  const [tienda, setTienda] = React.useState({});
  const [productos, setProductos] = React.useState([]);
  const [totalCarrito, setTotalCarrito] = React.useState(0);
  const [producto, setProducto] = React.useState({});

  const datosUsuario = (datosAppbar) => {
    setDatos(datosAppbar);
  };

  const tipo = (tipoAppbar) => {
    setTipoPersona(tipoAppbar);
  };

  const datosEmpleado = (datosControlEmpleado) => {
    setEmpleado(datosControlEmpleado);
  };

  const datosTienda = (datosTiendaModificar) => {
    setTienda(datosTiendaModificar);
  };

  const listaProductos = (datosProductos) => {
    setProductos(datosProductos);
  };

  const precioTotal = (datosTotal) => {
    setTotalCarrito(datosTotal);
  };

  const datosProducto = (datosModificarProducto) => {
    setProducto(datosModificarProducto);
  };

  return (
    <BrowserRouter>
      <PrimarySearchAppBar
        conseguirDatos={datosUsuario}
        conseguirTipo={tipo}
        conseguirProductos={listaProductos}
      />
      <Switch>
        <Route exact path={["/", "/proyectobases"]}>
          <Home productos={productos} datos={datos} />
        </Route>

        <Route exact path="/carrito/pago">
          <ProcederPago total={totalCarrito} />
        </Route>
        <Route path="/carrito">
          <Carrito conseguirTotal={precioTotal} />
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
          <ControlEmpleado enviarDatos={datosEmpleado} />
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
          <TiendaModificar enviarDatos={datosTienda} />
        </Route>
        <Route exact path="/perfil/controltienda/modificar/tienda">
          <ModificarTienda datos={tienda} />
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
          <ProductoModificar conseguirProducto={datosProducto} />
        </Route>
        <Route exact path="/perfil/controlproducto/modificar/modificacion">
          <ModificacionProducto producto={producto} />
        </Route>
        <Route exact path="/perfil/controlempleado/crear">
          <CrearEmpleado />
        </Route>
        <Route exact path="/perfil/controlempleado/modificar">
          <ModificarEmpleado datos={empleado} />
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
