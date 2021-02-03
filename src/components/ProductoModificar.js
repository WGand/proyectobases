import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import TablaTodosProductos from "./TablaTodosProductos";
import axios from "axios";

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
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

  const [producto, setProducto] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const irControlProducto = () => {
    history.push("/perfil/controlproducto");
  };

  const deleteProducto = async () => {
    setOpen(false);
    setOpenBackdrop(true);
    await axios({
      method: "delete",
      url: "https://proyectobases1.herokuapp.com/producto",
      data: {
        producto_id: producto.id,
      },
    }).then((response) => {
      console.log(response);
    });
    setOpen(false);
    setOpenBackdrop(false);
  };

  const productoTabla = (datosTabla) => {
    setProducto(datosTabla);
  };

  console.log(producto);

  if (Object.entries(producto).length === 0) {
    return (
      <React.Fragment>
        <Button className="m-3" onClick={irControlProducto}>
          <Typography variant="h5">Control de Producto</Typography>
        </Button>
        <Typography variant="h4" className="m-3">
          <b>Control de Producto: Modificar o Eliminar</b>
        </Typography>

        <Paper className={classes.paper} variant="outlined">
          <TablaTodosProductos productoSelec={productoTabla} />
        </Paper>
        <Paper
          className={classes.paperSelec}
          variant="outlined"
          style={{ display: "flex" }}
        >
          <Typography className={"m-3"}>
            No se ha seleccionado un producto
          </Typography>
        </Paper>
        <Boton variant="contained" className="m-4" color="primary" disabled>
          Modificar Producto
        </Boton>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Button className="m-3" onClick={irControlProducto}>
          <Typography variant="h5">Control de Producto</Typography>
        </Button>
        <Typography variant="h4" className="m-3">
          <b>Control de Producto: Modificar o Eliminar</b>
        </Typography>

        <Paper className={classes.paper} variant="outlined">
          <TablaTodosProductos productoSelec={productoTabla} />
        </Paper>
        <Paper
          className={classes.paperSelec}
          variant="outlined"
          style={{ display: "flex" }}
        >
          <Typography className={"m-3"}>
            <b>{producto.nombre}</b> / {producto.categoria} / {producto.precio}
          </Typography>
          <IconButton className={classes.boton} onClick={handleClickOpen}>
            <RemoveCircleIcon color="error" />
          </IconButton>
        </Paper>
        <Boton variant="contained" className="m-4" color="primary">
          Modificar Producto
        </Boton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">Eliminar producto</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Seguro que desea eliminar el producto seleccionado?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={deleteProducto}>
              Si
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
        <Backdrop className={classes.backdrop} open={openBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    );
  }
}
