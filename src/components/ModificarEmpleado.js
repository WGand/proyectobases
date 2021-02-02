import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import TablaHorario from "./TablaHorario";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  campo: {
    width: 300,
    maxWidth: 300,
    marginLeft: 10,
    marginRight: 30,
  },
  tlf: { marginLeft: 50, marginRight: 40 },
  tlfSub: {
    marginLeft: 50,
    marginTop: 20,
  },
  dir: {
    marginLeft: 150,
  },
  dirEsp: {
    marginLeft: 150,
    width: 300,
    maxWidth: 300,
  },
  helper: {
    marginLeft: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  paper: {
    width: 550,
    margin: 30,
    marginTop: 60,
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

export default function PerfilDatos(props) {

  const [datosEmpleado, setDatosEmpleado] = React.useState([]);

  const classes = useStyles();
  const history = useHistory();

  const [prefijoHab, setPrefijoHab] = React.useState("");
  const [prefijoMov, setPrefijoMov] = React.useState("");
  const [preMovil, setPreMovil] = React.useState("");
  const [preHabitacion, setPreHabitacion] = React.useState("");

  const [estado, setEstado] = React.useState(0);
  const [municipio, setMunicipio] = React.useState(0);
  const [parroquia, setParroquia] = React.useState(0);

  const [listaEstados, setListaEstados] = React.useState([]);
  const [estadoSelec, setEstadoSelec] = React.useState("");
  const [listaMunicipios, setListaMunicipios] = React.useState([]);
  const [municipioSelec, setMunicipioSelec] = React.useState("");

  const [listaParroquias, setListaParroquias] = React.useState([]);
  const [parroquiaSelec, setParroquiaSelec] = React.useState("");

  const [ubicacion, setUbicacion] = React.useState([]);
  const [ubicacionEstado, setUbicacionEstado] = React.useState("");
  const [ubicacionMunicipio, setUbicacionMunicipio] = React.useState("");
  const [ubicacionParroquia, setUbicacionParroquia] = React.useState("");

  const [labelPrimNombre, setLabelPrimNombre] = React.useState("");
  const [labelSegNombre, setLabelSegNombre] = React.useState("");
  const [labelPrimApellido, setLabelPrimApellido] = React.useState("");
  const [labelSegApellido, setLabelSegApellido] = React.useState("");
  const [labelCorreo, setLabelCorreo] = React.useState("");
  const [labelCelular, setLabelCelular] = React.useState("");
  const [labelTelefono, setLabelTelefono] = React.useState("");
  const [primNombre, setPrimNombre] = React.useState("");
  const [segNombre, setSegNombre] = React.useState("");
  const [primApellido, setPrimApellido] = React.useState("");
  const [segApellido, setSegApellido] = React.useState("");
  const [correo, setCorreo] = React.useState("");
  const [movil, setMovil] = React.useState("");
  const [habitacion, setHabitacion] = React.useState("");

  const [correoRespuesta, setCorreoRespuesta] = React.useState(0);
  const [correoExiste, setCorreoExiste] = React.useState(false);
  const [horario, setHorario] = React.useState({});

  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const handleChangeHab = (event) => {
    setPrefijoHab(event.target.value);
  };

  const handleChangeMov = (event) => {
    setPrefijoMov(event.target.value);
  };

  const handleChangeEstado = (event) => {
    setEstado(event.target.value);
  };

  const handleChangeMunicipio = (event) => {
    setMunicipio(event.target.value);
  };

  const handleChangeParroquia = (event) => {
    setParroquia(event.target.value);
  };

  const handleChangePrimerNombre = (event) => {
    setPrimNombre(event.target.value);
  };

  const handleChangeSegundoNombre = (event) => {
    setSegNombre(event.target.value);
  };

  const handleChangePrimerApellido = (event) => {
    setPrimApellido(event.target.value);
  };

  const handleChangeSegundoApellido = (event) => {
    setSegApellido(event.target.value);
  };

  const handleChangeCorreo = (event) => {
    setCorreo(event.target.value);
  };

  const handleChangeMovil = (event) => {
    setMovil(event.target.value);
  };

  const handleChangeHabitacion = (event) => {
    setHabitacion(event.target.value);
  };

  const irControlEmpleado = () => {
    history.push("/perfil/controlempleado");
  };

  const horarioTabla = (horario) => {
    setHorario(horario);
  };

  const fetchEstados = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/especificolugar",
      data: {
        tipo_lugar: "ESTADO",
      },
    }).then((response) => {
      setListaEstados(response.data);
    });
  };

  const fetchMunicipios = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/especificolugar",
      data: {
        tipo_lugar: "MUNICIPIO",
        lugar: estadoSelec,
      },
    }).then((response) => {
      setListaMunicipios(response.data);
    });
  };

  const fetchParroquias = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/especificolugar",
      data: {
        tipo_lugar: "PARROQUIA",
        lugar: municipioSelec,
        estado: estadoSelec,
      },
    }).then((response) => {
      setListaParroquias(response.data);
    });
  };

  const ubicacionActual = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/lugarparroquia",
      data: {
        parroquia: datosEmpleado[0].fk_lugar,
      },
    }).then((response) => {
      setUbicacion(response.data);
    });
  };

  const updateUsuarioEmpleado = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "put",
      url: "https://proyectobases1.herokuapp.com/empleado",
      data: {
        rif: datosEmpleado[0].rif,
        correo_electronico: correo,
        primer_nombre: primNombre,
        segundo_nombre: segNombre,
        primer_apellido: primApellido,
        segundo_apellido: segApellido,
        contrasena: datosEmpleado[0].contrasena,
        parroquia: parroquiaSelec,
        municipio: municipioSelec,
        estado: estadoSelec,
        telefono: habitacion,
        prefijo_telefono: preHabitacion,
        celular: movil,
        prefijo_celular: preMovil,
        horario: horario,
      },
    }).then((response) => {
      console.log(response);
    });
    setOpenBackdrop(false);
  };

  const conseguirDatosEmpleado = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/login",
      data: {
        correo: props.datos.correo_electronico,
        contrasena: props.datos.contrasena,
        tipo: "empleado",
      },
    }).then((response) => {
      setDatosEmpleado(response.data);
    });
  };

  const compararCorreoEmpleado = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/correo",
      data: {
        correo_electronico: correo,
        tipo: "EMPLEADO",
      },
    }).then((response) => {
      setCorreoRespuesta(response.data);
    });
  };

  const validarEmpleado = () => {
    if (
      primNombre.length !== 0 &&
      primApellido.length !== 0 &&
      movil.length !== 0 &&
      habitacion.length !== 0 &&
      correo.length !== 0
    ) {
      compararCorreoEmpleado();
      if (correoRespuesta === 0) {
        updateUsuarioEmpleado();
      }
    } else {
      console.log("faltan datos");
    }
  };

  React.useEffect(() => {
    fetchEstados();
    conseguirDatosEmpleado();
  }, []);

  React.useEffect(() => {
    if (!datosEmpleado[0]) {
      console.log("no existe");
      conseguirDatosEmpleado();
    } else {
      console.log("existe");
    }
  }, [datosEmpleado]);

  React.useEffect(() => {
    if (!listaEstados[estado]) {
      fetchEstados();
    } else {
      fetchMunicipios();
      setEstadoSelec(listaEstados[estado].nombre);
    }
  }, [listaEstados, estado, estadoSelec]);

  React.useEffect(() => {
    if (!listaMunicipios[municipio]) {
      fetchMunicipios();
    } else {
      fetchParroquias();
      setMunicipioSelec(listaMunicipios[municipio].nombre);
    }
  }, [listaMunicipios, municipio, municipioSelec]);

  React.useEffect(() => {
    if (!listaParroquias[parroquia]) {
      fetchParroquias();
    } else {
      setParroquiaSelec(listaParroquias[parroquia].nombre);
    }
  }, [listaParroquias, parroquia, parroquiaSelec]);

  React.useEffect(() => {
    if (datosEmpleado[0]) {
      setLabelPrimNombre(datosEmpleado[0].primer_nombre);
      setLabelSegNombre(datosEmpleado[0].segundo_nombre);
      setLabelPrimApellido(datosEmpleado[0].primer_apellido);
      setLabelSegApellido(datosEmpleado[0].segundo_apellido);
      setLabelCorreo(datosEmpleado[0].correo_electronico);
      setLabelCelular(datosEmpleado[0].celular);
      setLabelTelefono(datosEmpleado[0].telefono);
    }
    setPrimNombre(labelPrimNombre);
    setSegNombre(labelSegNombre);
    setPrimApellido(labelPrimApellido);
    setSegApellido(labelSegApellido);
    setCorreo(labelCorreo);
    setMovil(labelCelular);
    setHabitacion(labelTelefono);

    if (datosEmpleado[0]) {
      switch (datosEmpleado[0].prefijo_celular) {
        case "0414":
          setPrefijoMov(0);
          break;
        case "0424":
          setPrefijoMov(1);
          break;
        case "0412":
          setPrefijoMov(2);
          break;
        case "0416":
          setPrefijoMov(3);
          break;
        default:
          break;
      }
      switch (datosEmpleado[0].prefijo_telefono) {
        case "0241":
          setPrefijoHab(0);
          break;
        case "0242":
          setPrefijoHab(1);
          break;
        case "0243":
          setPrefijoHab(2);
          break;
        case "0212":
          setPrefijoHab(3);
          break;
        default:
          break;
      }
    }
  }, [labelPrimNombre, labelCorreo, datosEmpleado]);

  React.useEffect(() => {
    if (!ubicacion[0] || !ubicacion[1] || !ubicacion[2]) {
      if (datosEmpleado[0]) {
        ubicacionActual();
      }
    } else {
      setUbicacionEstado(ubicacion[2].value);
      setUbicacionMunicipio(ubicacion[1].value);
      setUbicacionParroquia(ubicacion[0].value);
    }
  }, [ubicacion, datosEmpleado]);

  React.useEffect(() => {
    switch (prefijoMov) {
      case "":
        setPreMovil("0414");
        break;
      case 1:
        setPreMovil("0424");
        break;
      case 2:
        setPreMovil("0412");
        break;
      case 3:
        setPreMovil("0416");
        break;
      default:
        break;
    }
  }, [prefijoMov]);

  React.useEffect(() => {
    switch (prefijoHab) {
      case "":
        setPreHabitacion("0241");
        break;
      case 1:
        setPreHabitacion("0242");
        break;
      case 2:
        setPreHabitacion("0243");
        break;
      case 3:
        setPreHabitacion("0212");
        break;
      default:
        break;
    }
  }, [prefijoHab]);

  React.useEffect(() => {
    if (correoRespuesta !== 0 && correo !== labelCorreo) {
      setCorreoExiste(true);
      setLabelCorreo("Ya existe un usuario con este correo");
    } else {
      setCorreoExiste(false);
      setLabelCorreo(labelCorreo);
    }
  }, [correoRespuesta, labelCorreo]);

  console.log("--------------------------");
  console.log(datosEmpleado);
  console.log(horario);
  console.log("nombre: " + primNombre);
  console.log("apellido:" + primApellido);
  console.log("segundo apellido: " + segApellido);
  console.log("--------------------------");

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irControlEmpleado}>
        <Typography variant="h5">Responsabilidades</Typography>
      </Button>
      <div style={{ display: "flex" }} class="m-4">
        <Typography variant="h6" className="m-2">
          Primer Nombre:
        </Typography>
        <TextField
          id="outlined-primNombre"
          label={labelPrimNombre}
          variant="outlined"
          className={classes.campo}
          onChange={handleChangePrimerNombre}
        />
        <Typography variant="h6" className="m-2">
          Segundo Nombre:
        </Typography>
        <TextField
          id="outlined-segNombre"
          label={labelSegNombre}
          variant="outlined"
          className={classes.campo}
          onChange={handleChangeSegundoNombre}
        />
      </div>
      <div style={{ display: "flex" }} class="m-4">
        <Typography variant="h6" className="m-2">
          Primer Apellido:
        </Typography>
        <TextField
          id="outlined-primApellido"
          label={labelPrimApellido}
          variant="outlined"
          className={classes.campo}
          onChange={handleChangePrimerApellido}
        />
        <Typography variant="h6" className="m-2">
          Segundo Apellido:
        </Typography>
        <TextField
          id="outlined-segApellido"
          label={labelSegApellido}
          variant="outlined"
          className={classes.campo}
          onChange={handleChangeSegundoApellido}
        />
      </div>
      <div style={{ display: "flex" }} class="m-4">
        <Typography variant="h6" className="m-2">
          Cargos:
        </Typography>
        <TextField
          id="outlined-primNombre"
          label="Cargos"
          variant="outlined"
          className={classes.campo}
          disabled
        />
      </div>
      <div class="m-4">
        <Typography variant="h6" className="m-2">
          Teléfonos
        </Typography>
        <Typography variant="subtitle1" className={classes.tlfSub}>
          Móvil
        </Typography>
        <div style={{ display: "flex" }}>
          <Select
            value={prefijoMov}
            onChange={handleChangeMov}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className={classes.tlf}
            variant="outlined"
          >
            <MenuItem value="">0414</MenuItem>
            <MenuItem value={1}>0424</MenuItem>
            <MenuItem value={2}>0412</MenuItem>
            <MenuItem value={3}>0416</MenuItem>
          </Select>
          <TextField
            id="outlined-telefono-mov"
            variant="outlined"
            className={classes.campo}
            label={labelCelular}
            type="tel"
            onChange={handleChangeMovil}
          />
        </div>
        <Typography variant="subtitle1" className={classes.tlfSub}>
          Habitación
        </Typography>
        <div style={{ display: "flex" }}>
          <Select
            value={prefijoHab}
            onChange={handleChangeHab}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className={classes.tlf}
            variant="outlined"
          >
            <MenuItem value="">0241</MenuItem>
            <MenuItem value={1}>0242</MenuItem>
            <MenuItem value={2}>0243</MenuItem>
            <MenuItem value={3}>0212</MenuItem>
          </Select>
          <TextField
            id="outlined-telefono-hab"
            variant="outlined"
            className={classes.campo}
            label={labelTelefono}
            type="tel"
            onChange={handleChangeHabitacion}
          />
        </div>
      </div>
      <div style={{ display: "flex" }} class="m-4">
        <Typography variant="h6" className="m-2">
          Correo electrónico:
        </Typography>
        <TextField
          id="outlined-correo"
          label={labelCorreo}
          variant="outlined"
          type="email"
          className={classes.campo}
          onChange={handleChangeCorreo}
          error={correoExiste}
        />
      </div>
      <div class="m-4">
        <Typography variant="h6" className="m-2">
          Horario
        </Typography>
        <Paper className={classes.paper} variant="outlined">
          <Typography variant="subtitle1" className="m-2">
            Seleccione turnos de empleado
          </Typography>
          <TablaHorario conseguirHorario={horarioTabla} />
        </Paper>
      </div>
      <div class="m-4">
        <Typography variant="h6" className="m-2">
          Dirección de habitación:
        </Typography>
        <List>
          <ListItem>
            <Select
              value={estado}
              onChange={handleChangeEstado}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              className={classes.dir}
              variant="outlined"
            >
              {listaEstados.map((estado, value) => (
                <MenuItem value={value}>{estado.nombre}</MenuItem>
              ))}
            </Select>
            <FormHelperText className={classes.helper}>
              {ubicacionEstado}
            </FormHelperText>
          </ListItem>
          <ListItem>
            <Select
              value={municipio}
              onChange={handleChangeMunicipio}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              className={classes.dir}
              variant="outlined"
            >
              {listaMunicipios.map((municipio, value) => (
                <MenuItem value={value}>{municipio.nombre}</MenuItem>
              ))}
            </Select>
            <FormHelperText className={classes.helper}>
              {ubicacionMunicipio}
            </FormHelperText>
          </ListItem>
          <ListItem>
            <Select
              value={parroquia}
              onChange={handleChangeParroquia}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              className={classes.dir}
              variant="outlined"
            >
              {listaParroquias.map((parroquia, value) => (
                <MenuItem value={value}>{parroquia.nombre}</MenuItem>
              ))}
            </Select>
            <FormHelperText className={classes.helper}>
              {ubicacionParroquia}
            </FormHelperText>
          </ListItem>
        </List>
        <TextField
          id="outlined-direccion"
          label="Dirección específica"
          variant="outlined"
          multiline
          rows="3"
          className={classes.dirEsp}
        />
      </div>
      <Boton
        variant="contained"
        color="primary"
        onClick={validarEmpleado}
        className="m-4"
      >
        Guardar cambios
      </Boton>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
