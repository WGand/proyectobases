import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TablaEmpleados from "./TablaEmpleados";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 1300,
    margin: 30,
    marginTop: 60,
  },
  paperSelec: {
    width: 800,
    margin: 30,
  },
  search: {
    width: 350,
    margin: 30,
  },
  plus: {
    color: "#008332",
  },
  boton: {
    marginLeft: 80,
  },
  botonCrear: {
    height: 55,
    margin: 30,
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

export default function ControlEmpleado(props) {
  const history = useHistory();
  const classes = useStyles();

  const [datosEmpleado, setDatosEmpleado] = React.useState({});

  const getDatosEmpleado = (datosTabla) => {
    setDatosEmpleado(datosTabla);
  };

  const irPerfil = () => {
    history.push("/perfil");
  };

  const irCrear = () => {
    history.push("/perfil/controlempleado/crear");
  };

  const irModificar = () => {
    history.push("/perfil/controlempleado/modificar");
  };

  const conseguirDatos = () => {
    props.enviarDatos(datosEmpleado);
  };

  const validarModificar = () => {
    if (datosEmpleado) {
      conseguirDatos();
      irModificar();
    }
  };

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irPerfil}>
        <Typography variant="h5">Responsabilidades</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Control de Empleado</b>
      </Typography>
      <Boton
        variant="contained"
        className={classes.botonCrear}
        color="primary"
        onClick={irCrear}
      >
        Crear empleado
      </Boton>
      <Paper className={classes.paper} variant="outlined">
        <TablaEmpleados empleadoSelec={getDatosEmpleado} />
      </Paper>
      <Boton
        variant="contained"
        className="m-4"
        color="primary"
        onClick={validarModificar}
      >
        Modificar Empleado
      </Boton>
    </React.Fragment>
  );
}
