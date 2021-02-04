import React from "react";
import Typography from "@material-ui/core/Typography";
import ListaCarrito from "./ListaCarrito";

export default function Carrito(props) {
  document.title = "Carrito de Compras";

  const [total, setTotal] = React.useState(0);

  const conseguirTotal = (datosTotal) => {
    setTotal(datosTotal);
  };

  React.useEffect(() => {
    props.conseguirTotal(total);
  }, [total]);

  return (
    <React.Fragment>
      <Typography variant="h3" className="m-4">
        <b>Carrito de Compras</b>
      </Typography>
      <ListaCarrito
        conseguirTotal={conseguirTotal}
        datos={props.datos}
        tipo={props.tipo}
      />
    </React.Fragment>
  );
}
