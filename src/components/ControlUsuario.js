import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import TablaNatural from "./TablaNatural";
import TablaJuridico from "./TablaJuridico";
import TablaEmpleados from "./TablaEmpleados";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  search: {
    width: 350,
    margin: 30,
  },
  boton: {
    height: 55,
    margin: 30,
  },
  paper: {
    width: 1300,
    margin: 30,
  },
  text: {
    width: 250,
    margin: 15,
  },
  textCRIF: {
    width: 300,
    margin: 30,
    marginTop: 10,
  },
  botonGenerar: {
    height: 70,
    width: 90,
    margin: 30,
    marginTop: 5,
  },
  botonTabla: {
    height: 70,
    width: 90,
    margin: 30,
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

export default function ControlUsuario() {
  const history = useHistory();
  const classes = useStyles();

  const [empleado, setEmpleado] = React.useState({});
  const [juridico, setJuridico] = React.useState({});
  const [natural, setNatural] = React.useState({});

  const [openEmpleado, setOpenEmpleado] = React.useState(false);
  const [openJuridico, setOpenJuridico] = React.useState(false);
  const [openNatural, setOpenNatural] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const handleClickOpenEmpleado = () => {
    if (empleado.rif) {
      setOpenEmpleado(true);
    }
  };

  const handleClickOpenJuridico = () => {
    if (juridico.rif) {
      setOpenJuridico(true);
    }
  };

  const handleClickOpenNatural = () => {
    if (natural.rif) {
      setOpenNatural(true);
    }
  };

  const handleCloseEmpleado = () => {
    setOpenEmpleado(false);
  };

  const handleCloseJuridico = () => {
    setOpenJuridico(false);
  };

  const handleCloseNatural = () => {
    setOpenNatural(false);
  };

  const getEmpleado = (datosTabla) => {
    setEmpleado(datosTabla);
  };

  const getJuridico = (datosTabla) => {
    setJuridico(datosTabla);
  };

  const getNatural = (datosTabla) => {
    setNatural(datosTabla);
  };

  const irPerfil = () => {
    history.push("/perfil");
  };

  const eliminarEmpleado = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "delete",
      url: "https://proyectobases1.herokuapp.com/empleado",
      data: {
        rif: empleado.rif,
      },
    }).then((response) => {
      console.log(response);
    });
    setOpenEmpleado(false);
    setOpenBackdrop(false);
  };

  const eliminarJuridico = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "delete",
      url: "https://proyectobases1.herokuapp.com/usuarioJuridico",
      data: {
        rif: juridico.rif,
      },
    }).then((response) => {
      console.log(response);
    });
    setOpenJuridico(false);
    setOpenBackdrop(false);
  };

  const eliminarNatural = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "delete",
      url: "https://proyectobases1.herokuapp.com/usuarioNatural",
      data: {
        rif: natural.rif,
      },
    }).then((response) => {
      console.log(response);
    });
    setOpenNatural(false);
    setOpenBackdrop(false);
  };

  console.log(empleado);
  console.log(juridico);
  console.log(natural);

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irPerfil}>
        <Typography variant="h5">Responsabilidades</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Control de Usuario</b>
      </Typography>
      <Paper className={classes.paper} variant="outlined">
        <Typography variant="h5" className="m-4">
          Natural
        </Typography>
        <TablaNatural naturalSelec={getNatural} />

        <Boton
          variant="contained"
          className={classes.botonTabla}
          color="primary"
          onClick={handleClickOpenNatural}
        >
          Eliminar natural
        </Boton>
        <Dialog
          open={openNatural}
          onClose={handleCloseNatural}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">
            Eliminar usuario natural
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Seguro que desea eliminar el usuario natural seleccionado?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={eliminarNatural} color="primary">
              Si
            </Button>
            <Button onClick={handleCloseNatural} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
          <Backdrop className={classes.backdrop} open={openBackdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Dialog>
      </Paper>
      <Paper className={classes.paper} variant="outlined">
        <Typography variant="h5" className="m-4">
          Jurídico
        </Typography>
        <TablaJuridico juridicoSelec={getJuridico} />
        <Boton
          variant="contained"
          className={classes.botonTabla}
          color="primary"
          onClick={handleClickOpenJuridico}
        >
          Eliminar jurídico
        </Boton>
        <Dialog
          open={openJuridico}
          onClose={handleCloseJuridico}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">
            Eliminar usuario jurídico
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Seguro que desea eliminar el usuario jurídico seleccionado?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={eliminarJuridico} color="primary">
              Si
            </Button>
            <Button onClick={handleCloseJuridico} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
          <Backdrop className={classes.backdrop} open={openBackdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Dialog>
      </Paper>
      <Paper className={classes.paper} variant="outlined">
        <Typography variant="h5" className="m-4">
          Empleado
        </Typography>
        <TablaEmpleados empleadoSelec={getEmpleado} />
        <Boton
          variant="contained"
          className={classes.botonTabla}
          color="primary"
          onClick={handleClickOpenEmpleado}
        >
          Eliminar empleado
        </Boton>
        <Dialog
          open={openEmpleado}
          onClose={handleCloseEmpleado}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">Eliminar empleado</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Seguro que desea eliminar el empleado seleccionado?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={eliminarEmpleado} color="primary">
              Si
            </Button>
            <Button onClick={handleCloseEmpleado} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
          <Backdrop className={classes.backdrop} open={openBackdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Dialog>
      </Paper>
      <Typography variant="h4" className="m-3">
        <b>Generar Carnet</b>
      </Typography>
      <div style={{ display: "flex" }}>
        <Typography variant="h5" className="m-4">
          Tienda:
        </Typography>
        <TextField variant="outlined" className={classes.text} />
      </div>
      <Typography variant="h5" className="m-4">
        Cédula de Identidad / RIF
      </Typography>
      <TextField
        variant="outlined"
        className={classes.textCRIF}
        label="Cédula / RIF"
      />
      <Boton
        variant="contained"
        className={classes.botonGenerar}
        color="primary"
      >
        Generar
      </Boton>
    </React.Fragment>
  );
}
