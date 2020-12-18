import React from "react";
import Carousel from "./Carousel";
import ListaDestacados from "./ListaDestacados";

export default function Home() {
  document.title = "UCABMart";
  return (
    <React.Fragment>
      <Carousel />
      <ListaDestacados />
    </React.Fragment>
  );
}
