import React from "react";
import Home from "./components/Home";
import Carrito from "./components/Carrito";
import Perfil from "./components/Perfil";
import PrimarySearchAppBar from "./components/Appbar";
import ReposicionInventario from "./components/ReposicionInventario";
import ProcesarPedidos from "./components/ProcesarPedidos";
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
        <Route path="/perfil">
          <Perfil />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
