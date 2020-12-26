import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  campo: {
    width: 500,
    maxWidth: 500,
    marginLeft: 100,
  },
  prov: {
    marginLeft: 50,
    marginRight: 40,
    width: 200,
  },
  precio: {
    marginLeft: 20,
    width: 70,
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

export default function ProductoRegistrar() {
  const history = useHistory();
  const classes = useStyles();
  const [proveedor, setProveedor] = React.useState("");
  const [precio, setPrecio] = React.useState("");

  const irControlProducto = () => {
    history.push("/perfil/controlproducto");
  };

  const handleChangeProv = (event) => {
    setProveedor(event.target.value);
  };

  const handleChangePrecio = (event) => {
    setPrecio(event.target.value);
  };

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irControlProducto}>
        <Typography variant="h5">Control de Producto</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Control de Producto: Registrar</b>
      </Typography>
      <div style={{ display: "flex" }} className="m-4">
        <Typography variant="h6" className="m-2">
          Nombre:
        </Typography>
        <TextField
          id="outlined-nombre"
          label="Nombre del Producto"
          variant="outlined"
          className={classes.campo}
        />
      </div>
      <div style={{ display: "flex" }} className="m-4">
        <Typography variant="h6" className="m-2">
          Descripción:
        </Typography>
        <TextField
          id="outlined-desc"
          label="Descripción del Producto"
          variant="outlined"
          className={classes.campo}
          multiline
        />
      </div>
      <div style={{ display: "flex" }} className="m-4">
        <Typography variant="h6" className="m-2">
          Proveedor:
        </Typography>
        <Select
          value={proveedor}
          onChange={handleChangeProv}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className={classes.prov}
          variant="outlined"
        >
          <MenuItem value="">Proveedor 1</MenuItem>
          <MenuItem value={1}>Proveedor 2</MenuItem>
          <MenuItem value={2}>Proveedor 3</MenuItem>
          <MenuItem value={3}>Proveedor 4</MenuItem>
        </Select>
      </div>
      <div style={{ display: "flex" }} className="m-4">
        <Typography variant="h6" className="m-2">
          Precio:
        </Typography>
        <TextField
          id="outlined-precio"
          label="Precio del Producto"
          variant="outlined"
          className={classes.campo}
        />
        <Select
          value={precio}
          onChange={handleChangePrecio}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          variant="outlined"
          className={classes.precio}
        >
          <MenuItem value="">$</MenuItem>
          <MenuItem value={1}>Bs.</MenuItem>
        </Select>
      </div>
      <Boton variant="contained" className="m-4" color="primary">
        Registrar Producto
      </Boton>
    </React.Fragment>
  );
}
