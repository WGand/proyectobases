import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import TablaTodosProductos from "./TablaTodosProductos";

const useStyles = makeStyles((theme) => ({
  search: {
    width: 350,
    margin: 30,
  },
  paper: {
    width: 800,
    margin: 30,
    marginTop: 60,
  },
  paperSelec: {
    width: 900,
    margin: 30,
  },
  boton: {
    marginLeft: 300,
  },
  table: {
    width: 500,
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

export default function ProductoModificar() {
  const history = useHistory();
  const classes = useStyles();

  const irControlProducto = () => {
    history.push("/perfil/controlproducto");
  };

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irControlProducto}>
        <Typography variant="h5">Control de Producto</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Control de Producto: Modificar o Eliminar</b>
      </Typography>

      <Paper className={classes.paper} variant="outlined">
        <TablaTodosProductos />
      </Paper>
      <Paper
        className={classes.paperSelec}
        variant="outlined"
        style={{ display: "flex" }}
      >
        Producto / Descripción / Cantidad / Precio **PRODUCTO SELECCIONADO**
        <IconButton className={classes.boton}>
          <RemoveCircleIcon color="error" />
        </IconButton>
      </Paper>
      <Boton variant="contained" className="m-4" color="primary">
        Modificar Producto
      </Boton>
    </React.Fragment>
  );
}
