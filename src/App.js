import React from "react";
import PrimarySearchAppBar from "./components/Appbar";
import Carousel from "./components/Carousel";
import InteractiveList from "./components/ListaDestacados";
import "./App.css";

function App() {
  document.title = "UCABMart";
  return (
    <React.Fragment>
      <PrimarySearchAppBar />
      <Carousel />
      <InteractiveList />
    </React.Fragment>
  );
}

export default App;
