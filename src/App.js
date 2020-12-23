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
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <PrimarySearchAppBar />
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
        <Route path="/perfil">
          <Perfil />
        </Route>
      </Switch>
      <Divider variant="middle" class="border border-primary m-4" />
    </BrowserRouter>
  );
}

export default App;
