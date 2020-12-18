import React from "react";
import Home from "./components/Home";
import Carrito from "./components/Carrito";
import PrimarySearchAppBar from "./components/Appbar";
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
