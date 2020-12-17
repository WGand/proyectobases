import React from "react";
import Carousel from "./Carousel";
import ListaDestacados from "./ListaDestacados";

export default function Home() {
  return (
    <React.Fragment>
      <Carousel />
      <ListaDestacados />
    </React.Fragment>
  );
}
