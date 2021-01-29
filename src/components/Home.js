import React from "react";
import Carousel from "./Carousel";
import ListaDestacados from "./ListaDestacados";

export default function Home(props) {
  document.title = "UCABMart";

  return (
    <React.Fragment>
      <Carousel />
      <ListaDestacados productos={props.productos} datos={props.datos} />
    </React.Fragment>
  );
}
