import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { DropzoneDialog } from "material-ui-dropzone";
import TablaEmpleados from "./TablaEmpleados";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import axios from "axios";

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

export default function ControlEmpleado(props) {
  const history = useHistory();
  const classes = useStyles();

  const [datosEmpleado, setDatosEmpleado] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [disabled, setDisabled] = React.useState(false);

  const [archivo, setArchivo] = React.useState([]);
  const [respuesta, setRespuesta] = React.useState("");

  const handleClickopen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getDatosEmpleado = (datosTabla) => {
    setDatosEmpleado(datosTabla);
  };

  const irPerfil = () => {
    history.push("/perfil");
  };

  const irCrear = () => {
    history.push("/perfil/controlempleado/crear");
  };

  const conseguirDatos = () => {
    props.enviarDatos(datosEmpleado);
  };

  const irModificar = () => {
    conseguirDatos();
    history.push("/perfil/controlempleado/modificar");
  };

  const subirArchivo = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/upload",
      data: {
        file: archivo[0],
      },
    }).then((response) => {
      setRespuesta(response);
    });
    setOpenBackdrop(false);
  };

  const llenarTabla = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/horarioempleados",
    }).then((response) => {
      console.log(response);
    });
    setOpenBackdrop(false);
  };

  React.useEffect(() => {
    if (Object.entries(datosEmpleado).length !== 0) {
      conseguirDatos();
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [datosEmpleado]);

  React.useEffect(() => {
    if (archivo.length !== 0) {
      subirArchivo();
    }
  }, [archivo]);

  React.useEffect(() => {
    if (respuesta !== "") {
      llenarTabla();
    }
  }, [respuesta]);

  console.log(archivo);
  console.log(respuesta);

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
      <div style={{ display: "flex" }}>
        <Boton
          variant="contained"
          className="m-4"
          color="primary"
          onClick={irModificar}
          disabled={disabled}
        >
          Modificar Empleado
        </Boton>
        <Boton
          variant="contained"
          className="m-4"
          color="primary"
          onClick={handleClickopen}
        >
          Subir horarios
        </Boton>
      </div>
      <DropzoneDialog
        dropzoneText="Arrastre archivo aquí o haga click"
        dialogTitle="Subir horarios"
        acceptedFiles={[".xlsx"]}
        cancelButtonText={"Cancelar"}
        submitButtonText={"Subir"}
        maxFileSize={5000000}
        open={open}
        onClose={handleClose}
        onSave={(files) => {
          setArchivo(files);
          setOpen(false);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
