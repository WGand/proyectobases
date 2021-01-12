import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import TablaTiendas from "./TablaTiendas";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 500,
    margin: 30,
    marginTop: 60,
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

export default function TiendaModificar(props) {
  const history = useHistory();
  const classes = useStyles();

  const [datosTienda, setDatosTienda] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const handleClickOpen = () => {
    if (datosTienda.tienda_id) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const eliminarTienda = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "delete",
      url: "https://proyectobases1.herokuapp.com/tienda",
      data: {
        nombre: datosTienda.nombre,
      },
    }).then((response) => {
      console.log(response);
    });
    setOpen(false);
    setOpenBackdrop(false);
  };

  const getDatosTabla = (datosTabla) => {
    setDatosTienda(datosTabla);
  };

  const conseguirDatos = () => {
    props.enviarDatos(datosTienda);
  };

  const irControlTienda = () => {
    history.push("/perfil/controltienda");
  };

  const irModificar = () => {
    history.push("/perfil/controltienda/modificar/tienda");
  };

  const validarSelec = () => {
    if (datosTienda.tienda_id) {
      conseguirDatos();
      irModificar();
    }
  };

  console.log(datosTienda);

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irControlTienda}>
        <Typography variant="h5">Control de Tienda</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Control de Tienda: Modificar o Eliminar</b>
      </Typography>
      <Paper className={classes.paper} variant="outlined">
        <TablaTiendas tiendaSelec={getDatosTabla} />
      </Paper>
      <div style={{ display: "flex" }}>
        <Boton
          variant="contained"
          className="m-4"
          color="primary"
          onClick={validarSelec}
        >
          Modificar Tienda
        </Boton>
        <Boton
          variant="contained"
          className="m-4"
          color="primary"
          onClick={handleClickOpen}
        >
          Eliminar Tienda
        </Boton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">Eliminar tienda</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Seguro que desea eliminar la tienda seleccionada?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={eliminarTienda}>
              Si
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
          <Backdrop className={classes.backdrop} open={openBackdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Dialog>
      </div>
    </React.Fragment>
  );
}
