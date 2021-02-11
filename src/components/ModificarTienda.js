import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  ubi: {
    marginLeft: 30,
    width: 250,
  },
  campo: {
    width: 300,
    maxWidth: 300,
    marginLeft: 10,
    marginRight: 30,
  },
  helper: {
    marginLeft: 20,
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

export default function ModificarTienda(props) {
  const history = useHistory();
  const classes = useStyles();

  const [nombreTienda, setNombreTienda] = React.useState("");
  const [tiendaRespuesta, setTiendaRespuesta] = React.useState([]);
  const [tiendaExiste, setTiendaExiste] = React.useState(false);
  const [labelTienda, setLabelTienda] = React.useState("");

  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [ubicacion, setUbicacion] = React.useState([]);
  const [ubicacionEstado, setUbicacionEstado] = React.useState("");
  const [ubicacionMunicipio, setUbicacionMunicipio] = React.useState("");
  const [ubicacionParroquia, setUbicacionParroquia] = React.useState("");

  const irModificar = () => {
    history.push("/perfil/controltienda/modificar");
  };

  const handleChangeNombreTienda = (event) => {
    setNombreTienda(event.target.value);
  };

  const validarNombreTienda = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/validarTienda",
      data: {
        nombre: nombreTienda,
      },
    }).then((response) => {
      setTiendaRespuesta(response.data);
      console.log(response);
    });
  };

  const enviarDatos = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "put",
      url: "https://proyectobases1.herokuapp.com/tienda",
      data: {
        nombre: nombreTienda,
        tienda_id: props.datos.tienda_id,
      },
    }).then((response) => {
      console.log(response);
    });
    setOpenBackdrop(false);
    irModificar();
  };

  const validar = () => {
    if (nombreTienda.length !== 0) {
      validarNombreTienda();
      if (tiendaRespuesta.length === 0) {
        enviarDatos();
      }
    }
  };

  const ubicacionActual = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/lugarparroquia",
      data: {
        parroquia: props.datos.fk_lugar,
      },
    }).then((response) => {
      setUbicacion(response.data);
    });
  };

  React.useEffect(() => {
    ubicacionActual();
  }, []);

  React.useEffect(() => {
    if (tiendaRespuesta.length === 0) {
      setTiendaExiste(false);
      setLabelTienda("Nombre de la tienda");
    } else {
      setTiendaExiste(true);
      setLabelTienda("Ya existe una tienda con este nombre");
    }
  }, [tiendaRespuesta]);

  React.useEffect(() => {
    if (props.datos) {
      setLabelTienda(props.datos.nombre);
    }
    setNombreTienda(labelTienda);
  }, [props.datos]);

  React.useEffect(() => {
    if (!ubicacion[0] || !ubicacion[1] || !ubicacion[2]) {
      if (props.datos) {
        ubicacionActual();
      }
    } else {
      setUbicacionEstado(ubicacion[2].value);
      setUbicacionMunicipio(ubicacion[1].value);
      setUbicacionParroquia(ubicacion[0].value);
    }
  }, [ubicacion, props.datos]);

  console.log(props.datos);
  console.log("nombre nuevo: " + nombreTienda);

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irModificar}>
        <Typography variant="h5">Modificar Tienda</Typography>
      </Button>
      <Typography variant="h4" className="m-4">
        <b>Detalle de tienda</b>
      </Typography>
      <Typography variant="h5" className="m-3">
        Ubicación
      </Typography>
      <div style={{ display: "flex" }} class="m-3">
        <Typography variant="h6" className="m-2">
          Estado:
        </Typography>
        <Typography className="m-3">{ubicacionEstado}</Typography>
      </div>
      <div style={{ display: "flex" }} class="m-4">
        <Typography variant="h6" className="m-2">
          Municipio:
        </Typography>
        <Typography className="m-3">{ubicacionMunicipio}</Typography>
      </div>
      <div style={{ display: "flex" }} class="m-4">
        <Typography variant="h6" className="m-2">
          Parroquia:
        </Typography>
        <Typography className="m-3">{ubicacionParroquia}</Typography>
      </div>
      <div style={{ display: "flex" }} class="m-4">
        <Typography variant="h6" className="m-2">
          Nombre:
        </Typography>
        <TextField
          id="outlined-primNombre"
          label={labelTienda}
          variant="outlined"
          className={classes.campo}
          onChange={handleChangeNombreTienda}
          error={tiendaExiste}
        />
      </div>
      <Boton
        variant="contained"
        className="m-4"
        color="primary"
        onClick={validar}
      >
        Guardar cambios
      </Boton>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
