import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  trash: {
    margin: 50,
  },
}));

export default function ProductoCarrito(props) {
  const classes = useStyles();

  const [cantidad, setCantidad] = React.useState("");
  const [cantidadProducto, setCantidadProducto] = React.useState(1);
  const [precioOriginal, setPrecioOriginal] = React.useState(props.precio);
  const [precioMod, setPrecioMod] = React.useState(0);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCantidad(event.target.value);
  };

  const deleteSignal = () => {
    setOpen(false);
    props.borrar(props.nombre);
  };

  const manejarBorrar = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    setPrecioOriginal(props.precio);
  }, []);

  React.useEffect(() => {
    switch (cantidad) {
      case "":
        setCantidadProducto(1);
        break;
      case 1:
        setCantidadProducto(2);
        break;
      case 2:
        setCantidadProducto(3);
        break;
      case 3:
        setCantidadProducto(4);
        break;
      case 4:
        setCantidadProducto(5);
        break;
      case 5:
        setCantidadProducto(6);
        break;
      case 6:
        setCantidadProducto(7);
        break;
      case 7:
        setCantidadProducto(8);
        break;
      case 8:
        setCantidadProducto(9);
        break;
      case 9:
        setCantidadProducto(10);
        break;
      default:
        break;
    }
  }, [cantidad]);

  React.useEffect(() => {
    setPrecioMod(precioOriginal * cantidadProducto);
  }, [cantidadProducto]);

  React.useEffect(() => {
    props.modificarCantidad(precioMod, props.nombre);
  }, [precioMod]);

  return (
    <ListItem divider>
      <img
        src="https://http2.mlstatic.com/televisor-aiwa-32-led-hd-hdmi-isdbt-D_NQ_NP_766490-MLV43440988575_092020-W.webp"
        class="tamañoCarrito"
        alt=""
      />
      <ListItemText primary={props.nombre} secondary={precioMod + ".000"} />
      <Select
        variant="outlined"
        value={cantidad}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">1</MenuItem>
        <MenuItem value={1}>2</MenuItem>
        <MenuItem value={2}>3</MenuItem>
        <MenuItem value={3}>4</MenuItem>
        <MenuItem value={4}>5</MenuItem>
        <MenuItem value={5}>6</MenuItem>
        <MenuItem value={6}>7</MenuItem>
        <MenuItem value={7}>8</MenuItem>
        <MenuItem value={8}>9</MenuItem>
        <MenuItem value={9}>10</MenuItem>
      </Select>
      <IconButton className={classes.trash} onClick={manejarBorrar}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.dialog}
      >
        <DialogTitle id="form-dialog-title" align="center">
          Eliminar Producto de Carrito
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea eliminar "{props.nombre}" del Carrito?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteSignal} color="primary" className="m-3">
            Si
          </Button>
          <Button onClick={handleClose} color="primary" className="m-3">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
}
