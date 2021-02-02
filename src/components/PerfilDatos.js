import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
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
}));

const GreenCheckbox = withStyles({
  root: {
    color: "#00AAE3",
    "&$checked": {
      color: "#00AAE3",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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
  const [state, setState] = React.useState({
    checkedNinguno: true,
    checkedEfectivo: true,
    checkedDebito: true,
    checkedCredito: true,
    checkedCheque: true,
  });
  const classes = useStyles();

  const [prefijoHab, setPrefijoHab] = React.useState("");
  const [prefijoMov, setPrefijoMov] = React.useState("");
  const [preMovil, setPreMovil] = React.useState("");
  const [preHabitacion, setPreHabitacion] = React.useState("");

  const [estado, setEstado] = React.useState(0);
  const [municipio, setMunicipio] = React.useState(0);
  const [parroquia, setParroquia] = React.useState(0);
  const [estadoF, setEstadoF] = React.useState(0);
  const [municipioF, setMunicipioF] = React.useState(0);
  const [parroquiaF, setParroquiaF] = React.useState(0);

  const [listaEstados, setListaEstados] = React.useState([]);
  const [estadoSelec, setEstadoSelec] = React.useState("");
  const [estadoFSelec, setEstadoFSelec] = React.useState("");
  const [listaMunicipios, setListaMunicipios] = React.useState([]);
  const [listaMunicipiosF, setListaMunicipiosF] = React.useState([]);
  const [municipioSelec, setMunicipioSelec] = React.useState("");
  const [municipioFSelec, setMunicipioFSelec] = React.useState("");
  const [listaParroquias, setListaParroquias] = React.useState([]);
  const [listaParroquiasF, setListaParroquiasF] = React.useState([]);
  const [parroquiaSelec, setParroquiaSelec] = React.useState("");
  const [parroquiaFSelec, setParroquiaFSelec] = React.useState("");

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
  const [labelDemCom, setLabelDemCom] = React.useState("");
  const [labelRazonSocial, setLabelRazonSocial] = React.useState("");
  const [labelPaginaWeb, setLabelPaginaWeb] = React.useState("");
  const [labelCapitalDisponible, setLabelCapitalDisponible] = React.useState(
    ""
  );

  const [primNombre, setPrimNombre] = React.useState("");
  const [segNombre, setSegNombre] = React.useState("");
  const [primApellido, setPrimApellido] = React.useState("");
  const [segApellido, setSegApellido] = React.useState("");
  const [correo, setCorreo] = React.useState("");
  const [movil, setMovil] = React.useState("");
  const [habitacion, setHabitacion] = React.useState("");

  const [correoRespuesta, setCorreoRespuesta] = React.useState(0);
  const [correoExiste, setCorreoExiste] = React.useState(false);

  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [datosUsuario, setDatosUsuario] = React.useState([]);

  const [demCom, setDemCom] = React.useState("");
  const [razonSocial, setRazonSocial] = React.useState("");
  const [paginaWeb, setPaginaWeb] = React.useState("");
  const [capitalDisponible, setCapitalDisponible] = React.useState("");

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

  const handleCheckboxes = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
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

  const handleChangeEstadoF = (event) => {
    setEstadoF(event.target.value);
  };

  const handleChangeMunicipioF = (event) => {
    setMunicipioF(event.target.value);
  };

  const handleChangeParroquiaF = (event) => {
    setParroquiaF(event.target.value);
  };

  const handleChangeDemCom = (event) => {
    setDemCom(event.target.value);
  };

  const handleChangeRazonSocial = (event) => {
    setRazonSocial(event.target.value);
  };

  const handleChangePaginaWeb = (event) => {
    setPaginaWeb(event.target.value);
  };

  const handleChangeCapitalDisponible = (event) => {
    setCapitalDisponible(event.target.value);
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

  const fetchMunicipiosF = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/especificolugar",
      data: {
        tipo_lugar: "MUNICIPIO",
        lugar: estadoFSelec,
      },
    }).then((response) => {
      setListaMunicipiosF(response.data);
    });
  };

  const fetchParroquiasF = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/especificolugar",
      data: {
        tipo_lugar: "PARROQUIA",
        lugar: municipioFSelec,
        estado: estadoFSelec,
      },
    }).then((response) => {
      setListaParroquiasF(response.data);
    });
  };

  const ubicacionActual = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/lugarparroquia",
      data: {
        parroquia: props.datos[0].fk_lugar,
      },
    }).then((response) => {
      setUbicacion(response.data);
    });
  };

  const compararDatos = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/login",
      data: {
        correo: correo,
        contrasena: props.datos[0].contrasena,
        tipo: "natural",
      },
    }).then((response) => {
      setDatosUsuario(response.data);
    });
  };

  const updateUsuario = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "put",
      url: "https://proyectobases1.herokuapp.com/usuarioNatural",
      data: {
        rif: props.datos[0].rif,
        correo_electronico: correo,
        primer_nombre: primNombre,
        segundo_nombre: segNombre,
        primer_apellido: primApellido,
        segundo_apellido: segApellido,
        contrasena: props.datos[0].contrasena,
        telefono: habitacion,
        prefijo_telefono: preHabitacion,
        celular: movil,
        prefijo_celular: preMovil,
        parroquia: parroquiaSelec,
        municipio: municipioSelec,
        estado: estadoSelec,
      },
    }).then((response) => {
      console.log(response);
    });
    compararDatos();
    setOpenBackdrop(false);
  };

  const updateUsuarioEmpleado = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "put",
      url: "https://proyectobases1.herokuapp.com/empleado",
      data: {
        rif: props.datos[0].rif,
        correo: correo,
        cedula: props.datos[0].cedula_identidad,
        primer_nombre: primNombre,
        segundo_nombre: segNombre,
        primer_apellido: primApellido,
        segundo_apellido: segApellido,
        contrasena: props.datos[0].contrasena,
        telefono: habitacion,
        prefijo: preHabitacion,
        celular: movil,
        prefijo_celular: preMovil,
        lugar: parroquiaSelec,
        hora_inicio: props.datos[0].hora_inicio,
        hora_fin: props.datos[0].hora_fin,
        dia: props.datos[0].dia,
      },
    }).then((response) => {
      console.log(response);
    });
    compararDatos();
    setOpenBackdrop(false);
  };

  const updateUsuarioJuridico = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "put",
      url: "https://proyectobases1.herokuapp.com/usuarioJuridico",
      data: {
        rif: props.datos[0].rif,
        correo_electronico: correo,
        contrasena: props.datos[0].contrasena,
        denominacion_comercial: demCom,
        razon_social: razonSocial,
        pagina_web: paginaWeb,
        capital_disponible: capitalDisponible,
        telefono: habitacion,
        prefijo_telefono: preHabitacion,
        celular: movil,
        prefijo_celular: preMovil,
        parroquia: parroquiaSelec,
        municipio: municipioSelec,
        estado: estadoSelec,
        persona_contacto_nombre: props.datos[0].persona_contacto_nombre,
        persona_contacto_primer_apellido:
          props.datos[0].persona_contacto_primer_apellido,
        persona_contacto_segundo_apellido:
          props.datos[0].persona_contacto_segundo_apellido,
        persona_contacto_telefono: props.datos[0].persona_contacto_telefono,
        persona_contacto_prefijo_telefono:
          props.datos[0].persona_contacto_prefijo_telefono,
        persona_contacto_celular: props.datos[0].persona_contacto_celular,
        persona_contacto_prefijo_celular:
          props.datos[0].persona_contacto_prefijo_celular,
      },
    }).then((response) => {
      console.log(response);
    });
    compararDatos();
    setOpenBackdrop(false);
  };

  const compararCorreo = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/correo",
      data: {
        correo_electronico: correo,
        tipo: "NATURAL",
      },
    }).then((response) => {
      setCorreoRespuesta(response.data);
    });
  };

  const compararCorreoJuridico = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/correo",
      data: {
        correo_electronico: correo,
        tipo: "JURIDICO",
      },
    }).then((response) => {
      setCorreoRespuesta(response.data);
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

  const validar = () => {
    if (
      primNombre.length !== 0 &&
      primApellido.length !== 0 &&
      movil.length !== 0 &&
      habitacion.length !== 0 &&
      correo.length !== 0
    ) {
      compararCorreo();
      if (correoRespuesta === 0) {
        updateUsuario();
      }
    } else {
      console.log("faltan datos");
    }
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

  const validarJuridico = () => {
    if (
      demCom.length !== 0 &&
      razonSocial.length !== 0 &&
      paginaWeb.length !== 0 &&
      capitalDisponible.length !== 0 &&
      correo.length !== 0
    ) {
      compararCorreoJuridico();
      if (correoRespuesta === 0) {
        updateUsuarioJuridico();
      }
    } else {
      console.log("faltan datos");
    }
  };

  React.useEffect(() => {
    fetchEstados();
    ubicacionActual();
  }, []);

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
    setLabelPrimNombre(props.datos[0].primer_nombre);
    setLabelSegNombre(props.datos[0].segundo_nombre);
    setLabelPrimApellido(props.datos[0].primer_apellido);
    setLabelSegApellido(props.datos[0].segundo_apellido);
    setLabelCorreo(props.datos[0].correo_electronico);
    setLabelCelular(props.datos[0].celular);
    setLabelTelefono(props.datos[0].telefono);
    setLabelDemCom(props.datos[0].denominacion_comercial);
    setLabelRazonSocial(props.datos[0].razon_social);
    setLabelPaginaWeb(props.datos[0].pagina_web);
    setLabelCapitalDisponible(props.datos[0].capital_disponible);
    setPrimNombre(labelPrimNombre);
    setSegNombre(labelSegNombre);
    setPrimApellido(labelPrimApellido);
    setSegApellido(labelSegApellido);
    setCorreo(labelCorreo);
    setMovil(labelCelular);
    setHabitacion(labelTelefono);
    setDemCom(labelDemCom);
    setRazonSocial(labelRazonSocial);
    setCapitalDisponible(labelCapitalDisponible);
    setPaginaWeb(labelPaginaWeb);
    switch (props.datos[0].prefijo_celular) {
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
    switch (props.datos[0].prefijo_telefono) {
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
  }, [labelPrimNombre, labelCorreo]);

  React.useEffect(() => {
    if (!ubicacion[0] || !ubicacion[1] || !ubicacion[2]) {
      ubicacionActual();
    } else {
      setUbicacionEstado(ubicacion[2].value);
      setUbicacionMunicipio(ubicacion[1].value);
      setUbicacionParroquia(ubicacion[0].value);
    }
  }, [ubicacion]);

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

  React.useEffect(() => {
    if (!listaEstados[estadoF]) {
      fetchEstados();
    } else {
      fetchMunicipiosF();
      setEstadoFSelec(listaEstados[estadoF].nombre);
    }
  }, [listaEstados, estadoF, estadoFSelec]);

  React.useEffect(() => {
    if (!listaMunicipiosF[municipioF]) {
      fetchMunicipiosF();
    } else {
      fetchParroquiasF();
      setMunicipioFSelec(listaMunicipiosF[municipioF].nombre);
    }
  }, [listaMunicipiosF, municipioF, municipioFSelec]);

  React.useEffect(() => {
    if (!listaParroquiasF[parroquiaF]) {
      fetchParroquiasF();
    } else {
      setParroquiaFSelec(listaParroquiasF[parroquiaF].nombre);
    }
  }, [listaParroquiasF, parroquiaF, parroquiaSelec]);

  console.log("--------------------------");
  console.log(props.tipo);
  console.log(props.datos);
  console.log("correo: " + correo);
  console.log("primer nombre: " + primNombre);
  console.log("segundo nombre: " + segNombre);
  console.log("primer apellido: " + primApellido);
  console.log("segundo apellido" + segApellido);
  console.log("celular: " + movil);
  console.log("prefijo celular: " + preMovil);
  console.log("telefono: " + habitacion);
  console.log("prefijo telefono: " + preHabitacion);
  console.log("parroquia fk: " + parroquiaSelec);
  console.log("hora fin: " + props.datos[0].hora_fin);
  console.log("hora incio: " + props.datos[0].hora_inicio);
  console.log("--------------------------");

  if (props.tipo === "natural") {
    return (
      <React.Fragment>
        <Typography variant="h5">
          <b>Puntos disponibles: 1000</b>
        </Typography>
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
            Medios de pago:
          </Typography>
          <List className={classes.dir}>
            <ListItem>
              <FormControlLabel
                className="m-2"
                control={
                  <GreenCheckbox
                    checked={state.checkedNinguno}
                    onChange={handleCheckboxes}
                    name="checkedNinguno"
                  />
                }
                label="Ninguno"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                className="m-2"
                control={
                  <GreenCheckbox
                    checked={state.checkedEfectivo}
                    onChange={handleCheckboxes}
                    name="checkedEfectivo"
                  />
                }
                label="Efectivo"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                className="m-2"
                control={
                  <GreenCheckbox
                    checked={state.checkedDebito}
                    onChange={handleCheckboxes}
                    name="checkedDebito"
                  />
                }
                label="Débito"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                className="m-2"
                control={
                  <GreenCheckbox
                    checked={state.checkedCredito}
                    onChange={handleCheckboxes}
                    name="checkedCredito"
                  />
                }
                label="Crédito"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                className="m-2"
                control={
                  <GreenCheckbox
                    checked={state.checkedCheque}
                    onChange={handleCheckboxes}
                    name="checkedCheque"
                  />
                }
                label="Cheque"
              />
            </ListItem>
          </List>
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
          onClick={validar}
          className="m-4"
        >
          Guardar cambios
        </Boton>
        <Backdrop className={classes.backdrop} open={openBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    );
  } else if (props.tipo === "juridico") {
    return (
      <React.Fragment>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Denominación comercial:
          </Typography>
          <TextField
            id="outlined-primNombre"
            label={labelDemCom}
            variant="outlined"
            className={classes.campo}
            onChange={handleChangeDemCom}
          />
        </div>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Razón social:
          </Typography>
          <TextField
            id="outlined-primApellido"
            label={labelRazonSocial}
            variant="outlined"
            className={classes.campo}
            onChange={handleChangeRazonSocial}
          />
        </div>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Página web:
          </Typography>
          <TextField
            id="outlined-primApellido"
            label={labelPaginaWeb}
            variant="outlined"
            className={classes.campo}
            onChange={handleChangePaginaWeb}
          />
        </div>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Capital disponible:
          </Typography>
          <TextField
            id="outlined-primApellido"
            label={labelCapitalDisponible}
            variant="outlined"
            className={classes.campo}
            onChange={handleChangeCapitalDisponible}
            type="number"
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
            Medios de pago:
          </Typography>
          <List className={classes.dir}>
            <ListItem>
              <FormControlLabel
                className="m-2"
                control={
                  <GreenCheckbox
                    checked={state.checkedNinguno}
                    onChange={handleCheckboxes}
                    name="checkedNinguno"
                  />
                }
                label="Ninguno"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                className="m-2"
                control={
                  <GreenCheckbox
                    checked={state.checkedEfectivo}
                    onChange={handleCheckboxes}
                    name="checkedEfectivo"
                  />
                }
                label="Efectivo"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                className="m-2"
                control={
                  <GreenCheckbox
                    checked={state.checkedDebito}
                    onChange={handleCheckboxes}
                    name="checkedDebito"
                  />
                }
                label="Débito"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                className="m-2"
                control={
                  <GreenCheckbox
                    checked={state.checkedCredito}
                    onChange={handleCheckboxes}
                    name="checkedCredito"
                  />
                }
                label="Crédito"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                className="m-2"
                control={
                  <GreenCheckbox
                    checked={state.checkedCheque}
                    onChange={handleCheckboxes}
                    name="checkedCheque"
                  />
                }
                label="Cheque"
              />
            </ListItem>
          </List>
        </div>
        <div class="m-4">
          <Typography variant="h6" className="m-2">
            Dirección Fiscal:
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
        <div class="m-4">
          <Typography variant="h6" className="m-2">
            Dirección Física Principal:
          </Typography>
          <List>
            <ListItem>
              <Select
                value={estadoF}
                onChange={handleChangeEstadoF}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className={classes.dir}
                variant="outlined"
              >
                {listaEstados.map((estadoF, value) => (
                  <MenuItem value={value}>{estadoF.nombre}</MenuItem>
                ))}
              </Select>
            </ListItem>
            <ListItem>
              <Select
                value={municipioF}
                onChange={handleChangeMunicipioF}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className={classes.dir}
                variant="outlined"
              >
                {listaMunicipiosF.map((municipioF, value) => (
                  <MenuItem value={value}>{municipioF.nombre}</MenuItem>
                ))}
              </Select>
            </ListItem>
            <ListItem>
              <Select
                value={parroquiaF}
                onChange={handleChangeParroquiaF}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className={classes.dir}
                variant="outlined"
              >
                {listaParroquiasF.map((parroquiaF, value) => (
                  <MenuItem value={value}>{parroquiaF.nombre}</MenuItem>
                ))}
              </Select>
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
          onClick={validarJuridico}
          className="m-4"
        >
          Guardar cambios
        </Boton>
        <Backdrop className={classes.backdrop} open={openBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    );
  } else if (props.tipo === "empleado") {
    return (
      <React.Fragment>
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
            Medios de pago:
          </Typography>
          <List className={classes.dir}>
            <ListItem>
              <FormControlLabel
                className="m-2"
                control={
                  <GreenCheckbox
                    checked={state.checkedNinguno}
                    onChange={handleCheckboxes}
                    name="checkedNinguno"
                  />
                }
                label="Ninguno"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                className="m-2"
                control={
                  <GreenCheckbox
                    checked={state.checkedEfectivo}
                    onChange={handleCheckboxes}
                    name="checkedEfectivo"
                  />
                }
                label="Efectivo"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                className="m-2"
                control={
                  <GreenCheckbox
                    checked={state.checkedDebito}
                    onChange={handleCheckboxes}
                    name="checkedDebito"
                  />
                }
                label="Débito"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                className="m-2"
                control={
                  <GreenCheckbox
                    checked={state.checkedCredito}
                    onChange={handleCheckboxes}
                    name="checkedCredito"
                  />
                }
                label="Crédito"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                className="m-2"
                control={
                  <GreenCheckbox
                    checked={state.checkedCheque}
                    onChange={handleCheckboxes}
                    name="checkedCheque"
                  />
                }
                label="Cheque"
              />
            </ListItem>
          </List>
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
}
