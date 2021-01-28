import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ProductoCarrito from "./ProductoCarrito";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 1000,
    backgroundColor: theme.palette.background,
    margin: "auto",
  },
}));

const Boton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#00aae3",
    borderColor: "#00aae3",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#1d8fb5",
      borderColor: "#1d8fb5",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
})(Button);

export default function ListaCarrito(props) {
  const classes = useStyles();

  const [listaProductos, setListaProductos] = React.useState([]);
  const [eliminarProducto, setEliminarProducto] = React.useState("");

  const borrarProducto = (producto) => {
    setEliminarProducto(producto);
  };

  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem("carrito"))) {
      setListaProductos(JSON.parse(localStorage.getItem("carrito")));
    } else {
      localStorage.setItem("carrito", JSON.stringify([]));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(listaProductos));
  }, [listaProductos]);

  React.useEffect(() => {
    if (eliminarProducto !== "") {
      let aux = listaProductos.filter(
        (producto) => producto.nombre !== eliminarProducto
      );
      setListaProductos(aux);
    }
  }, [eliminarProducto]);

  // console.log(listaProductos);
  // console.log("producto a eliminar: " + eliminarProducto);

  return (
    <div className={classes.root}>
      <List>
        {listaProductos.map((producto, value) => (
          <ProductoCarrito
            nombre={producto.nombre}
            precio={producto.precio}
            borrar={borrarProducto}
          />
        ))}
      </List>
      <Typography variant="h4" align="right" className="m-4">
        Total
        <Typography variant="h5" align="right" color="textSecondary">
          300$
        </Typography>
      </Typography>
      <Boton variant="contained" className="m-3" color="primary">
        Comprar
      </Boton>
      <Divider variant="middle" class="border border-primary m-4" />
    </div>
  );
}
