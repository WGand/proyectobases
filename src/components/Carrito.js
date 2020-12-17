import React from "react";
import DateAndTimePickers from "./FechaHora";
import ListaCarrito from "./ListaCarrito";

export default function Carrito() {
  document.title = "Carrito de Compras";
  return (
    <React.Fragment>
      <DateAndTimePickers />
      <ListaCarrito />
    </React.Fragment>
  );
}
