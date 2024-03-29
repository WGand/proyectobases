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
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
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
  sub: {
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
  tipo: {
    width: 120,
  },
  cedula: {
    width: 80,
  },
  boton: {
    marginLeft: 550,
    marginTop: 50,
    width: 150,
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

export default function Registrar() {
  const [state, setState] = React.useState({
    checkedNinguno: true,
    checkedEfectivo: false,
    checkedDebito: false,
    checkedCredito: false,
    checkedCheque: false,
  });

  const classes = useStyles();
  const history = useHistory();
  const [fechaActual, setFechaActual] = React.useState("");

  const [prefijoHab, setPrefijoHab] = React.useState("");
  const [prefijoHabPC, setPrefijoHabPC] = React.useState("");
  const [prefijoMov, setPrefijoMov] = React.useState("");
  const [prefijoMovPC, setPrefijoMovPC] = React.useState("");
  const [preMovil, setPreMovil] = React.useState(0);
  const [preMovilPC, setPreMovilPC] = React.useState(0);
  const [preHabitacion, setPreHabitacion] = React.useState(0);
  const [preHabitacionPC, setPreHabitacionPC] = React.useState(0);
  const [movil, setMovil] = React.useState(0);
  const [movilPC, setMovilPC] = React.useState(0);
  const [habitacion, setHabitacion] = React.useState(0);
  const [habitacionPC, setHabitacionPC] = React.useState(0);

  const [estado, setEstado] = React.useState(0);
  const [municipio, setMunicipio] = React.useState(0);
  const [parroquia, setParroquia] = React.useState(0);
  const [estadoF, setEstadoF] = React.useState(0);
  const [municipioF, setMunicipioF] = React.useState(0);
  const [parroquiaF, setParroquiaF] = React.useState(0);

  const [tipo, setTipo] = React.useState("");
  const [tipoPersona, setTipoPersona] = React.useState("");
  const [cedula, setCedula] = React.useState("");
  const [tipoCedula, setTipoCedula] = React.useState("");

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

  const [contraseña, setContraseña] = React.useState("");
  const [contraseña2, setContraseña2] = React.useState("");

  const [noIguales, setNoIguales] = React.useState(false);
  const [correoRespuesta, setCorreoRespuesta] = React.useState(0);
  const [correoExiste, setCorreoExiste] = React.useState(false);
  const [rifRespuesta, setRifRespuesta] = React.useState(0);
  const [rifExiste, setRifExiste] = React.useState(false);

  const [labelContraseña2, setLabelContraseña2] = React.useState("");
  const [labelCorreo, setLabelCorreo] = React.useState("");
  const [labelRif, setLabelRif] = React.useState("");

  const [primNombre, setPrimNombre] = React.useState("");
  const [segNombre, setSegNombre] = React.useState("");
  const [primApellido, setPrimApellido] = React.useState("");
  const [segApellido, setSegApellido] = React.useState("");
  const [numCedula, setNumCedula] = React.useState(0);
  const [rif, setRif] = React.useState(0);
  const [correo, setCorreo] = React.useState("");

  const [demCom, setDemCom] = React.useState("");
  const [razonSocial, setRazonSocial] = React.useState("");
  const [paginaWeb, setPaginaWeb] = React.useState("");
  const [capitalDisponible, setCapitalDisponible] = React.useState("");

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openCredito, setOpenCredito] = React.useState(false);
  const [openDebito, setOpenDebito] = React.useState(false);

  const [numCredito, setNumCredito] = React.useState("");
  const [numDebito, setNumDebito] = React.useState("");
  const [fechaCredito, setFechaCredito] = React.useState("");
  const [fechaDebito, setFechaDebito] = React.useState("");
  const [nombreCredito, setNombreCredito] = React.useState("");
  const [nombreDebito, setNombreDebito] = React.useState("");

  const handleChangeHab = (event) => {
    setPrefijoHab(event.target.value);
  };

  const handleChangeHabPC = (event) => {
    setPrefijoHabPC(event.target.value);
  };

  const handleChangeMov = (event) => {
    setPrefijoMov(event.target.value);
  };

  const handleChangeMovPC = (event) => {
    setPrefijoMovPC(event.target.value);
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

  const handleChangeEstadoF = (event) => {
    setEstadoF(event.target.value);
  };

  const handleChangeMunicipioF = (event) => {
    setMunicipioF(event.target.value);
  };

  const handleChangeParroquiaF = (event) => {
    setParroquiaF(event.target.value);
  };

  const handleChangeTipo = (event) => {
    setTipo(event.target.value);
  };

  const handleChangeCedula = (event) => {
    setCedula(event.target.value);
  };

  const handleCheckboxes = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeContraseña = (event) => {
    setContraseña(event.target.value);
  };

  const handleChangeContraseña2 = (event) => {
    setContraseña2(event.target.value);
  };

  const handleChangePrimNombre = (event) => {
    setPrimNombre(event.target.value);
  };

  const handleChangeSegNombre = (event) => {
    setSegNombre(event.target.value);
  };

  const handleChangePrimApellido = (event) => {
    setPrimApellido(event.target.value);
  };

  const handleChangeSegApellido = (event) => {
    setSegApellido(event.target.value);
  };

  const handleChangeNumCedula = (event) => {
    setNumCedula(event.target.value);
  };

  const handleChangeRif = (event) => {
    setRif(event.target.value);
  };

  const handleChangeCorreo = (event) => {
    setCorreo(event.target.value);
  };

  const handleChangeMovil = (event) => {
    setMovil(event.target.value);
  };

  const handleChangeMovilPC = (event) => {
    setMovilPC(event.target.value);
  };

  const handleChangeHabitacion = (event) => {
    setHabitacion(event.target.value);
  };
  const handleChangeHabitacionPC = (event) => {
    setHabitacionPC(event.target.value);
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

  const handleChangeNumCredito = (event) => {
    setNumCredito(event.target.value);
  };

  const handleChangeNumDebito = (event) => {
    setNumDebito(event.target.velue);
  };

  const handleChangeFechaCredito = (event) => {
    setFechaCredito(event.target.value);
  };

  const handleChangeFechaDebito = (event) => {
    setFechaDebito(event.target.value);
  };

  const handleChangeNombreCredito = (event) => {
    setNombreCredito(event.target.value);
  };

  const handleChangeNombreDebito = (event) => {
    setNombreDebito(event.target.value);
  };

  const handleCloseCredito = () => {
    setState({ ...state, ["checkedCredito"]: false });
    setOpenCredito(false);
  };

  const handleCloseDebito = () => {
    setState({ ...state, ["checkedDebito"]: false });
    setOpenDebito(false);
  };

  const enviarDatos = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/usuarioNatural",
      data: {
        rif: rif,
        correo_electronico: correo,
        cedula: numCedula,
        primer_nombre: primNombre,
        segundo_nombre: segNombre,
        primer_apellido: primApellido,
        segundo_apellido: segApellido,
        contrasena: contraseña,
        tipo_cedula: tipoCedula,
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
    setOpenBackdrop(false);
    history.push("/");
  };

  const enviarDatosJuridico = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/usuarioJuridico",
      data: {
        rif: rif,
        correo_electronico: correo,
        contrasena: contraseña,
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
        persona_contacto_nombre: primNombre,
        persona_contacto_primer_apellido: primApellido,
        persona_contacto_segundo_apellido: segApellido,
        persona_contacto_telefono: movilPC,
        persona_contacto_prefijo_telefono: preHabitacionPC,
        persona_contacto_celular: habitacionPC,
        persona_contacto_prefijo_celular: preMovilPC,
      },
    }).then((response) => {
      console.log(response);
    });
    setOpenBackdrop(false);
    history.push("/");
  };

  const compararCorreo = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/correo",
      data: {
        correo_electronico: correo,
        tipo: tipoPersona,
      },
    }).then((response) => {
      setCorreoRespuesta(response.data);
    });
  };

  const compararRif = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/rif",
      data: {
        rif: rif,
        tipo: tipoPersona,
      },
    }).then((response) => {
      setRifRespuesta(response.data);
    });
  };

  const validar = () => {
    if (
      rif.length !== 0 &&
      correo.length !== 0 &&
      numCedula.length !== 0 &&
      primNombre.length !== 0 &&
      primApellido.length !== 0 &&
      contraseña.length !== 0 &&
      movil.length !== 0 &&
      habitacion.length !== 0
    ) {
      if (contraseña === contraseña2) {
        compararCorreo();
        compararRif();
        if (correoRespuesta === 0 && rifRespuesta === 0) {
          enviarDatos();
        }
      }
    } else {
      console.log("faltan datos");
    }
  };

  const validarJuridico = () => {
    if (
      rif.length !== 0 &&
      demCom.length !== 0 &&
      razonSocial.length !== 0 &&
      movil.length !== 0 &&
      habitacion.length !== 0 &&
      correo.length !== 0 &&
      paginaWeb.length !== 0 &&
      capitalDisponible.length !== 0 &&
      primNombre.length !== 0 &&
      primApellido.length !== 0 &&
      movilPC.length !== 0 &&
      habitacionPC !== 0 &&
      contraseña.length !== 0
    ) {
      if (contraseña === contraseña2) {
        compararCorreo();
        compararRif();
        if (correoRespuesta === 0 && rifRespuesta === 0) {
          enviarDatosJuridico();
        }
      }
    } else {
      console.log("faltan datos");
    }
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

  React.useEffect(() => {
    fetchEstados();
    const hoy = new Date();
    if (hoy.getMonth() + 1 >= 10) {
      const fecha = hoy.getFullYear() + "-" + (hoy.getMonth() + 1);
      setFechaActual(fecha);
    } else {
      const fecha = hoy.getFullYear() + "-0" + (hoy.getMonth() + 1);
      setFechaActual(fecha);
    }
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

  React.useEffect(() => {
    if (contraseña.length === 0 && contraseña2.length === 0) {
      setLabelContraseña2("Verificar contraseña");
    } else {
      if (contraseña === contraseña2) {
        setNoIguales(false);
        setLabelContraseña2("Las contraseñas coinciden");
      } else {
        setNoIguales(true);
        setLabelContraseña2("Las contraseñas deben ser iguales");
      }
    }
  }, [contraseña, contraseña2]);

  React.useEffect(() => {
    if (correoRespuesta === 0) {
      setCorreoExiste(false);
      setLabelCorreo("Correo electrónico");
    } else {
      setCorreoExiste(true);
      setLabelCorreo("Ya existe un usuario con este correo");
    }
  }, [correoRespuesta]);

  React.useEffect(() => {
    if (rifRespuesta === 0) {
      setRifExiste(false);
      setLabelRif("RIF");
    } else {
      setRifExiste(true);
      setLabelRif("Ya existe un usuario con este RIF");
    }
  }, [rifRespuesta]);

  React.useEffect(() => {
    if (cedula === "") {
      setTipoCedula("v");
    } else {
      setTipoCedula("e");
    }
  }, [cedula]);

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
    switch (prefijoMovPC) {
      case "":
        setPreMovilPC("0414");
        break;
      case 1:
        setPreMovilPC("0424");
        break;
      case 2:
        setPreMovilPC("0412");
        break;
      case 3:
        setPreMovilPC("0416");
        break;
      default:
        break;
    }
  }, [prefijoMovPC]);

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
    switch (prefijoHabPC) {
      case "":
        setPreHabitacionPC("0241");
        break;
      case 1:
        setPreHabitacionPC("0242");
        break;
      case 2:
        setPreHabitacionPC("0243");
        break;
      case 3:
        setPreHabitacionPC("0212");
        break;
      default:
        break;
    }
  }, [prefijoHabPC]);

  React.useEffect(() => {
    switch (tipo) {
      case "":
        setTipoPersona("NATURAL");
        break;
      case 1:
        setTipoPersona("JURIDICO");
        break;
      default:
        break;
    }
  }, [tipo]);

  React.useEffect(() => {
    if (state.checkedCredito === true) {
      setOpenCredito(true);
    }
  }, [state.checkedCredito]);

  React.useEffect(() => {
    if (state.checkedDebito === true) {
      setOpenDebito(true);
    }
  }, [state.checkedDebito]);

  console.log("tipo persona: ", tipoPersona);
  console.log("primer nombre contacto: " + primNombre);
  console.log("primer apellido contacto: " + primApellido);
  console.log("segundo apellido contacto: " + segApellido);
  console.log("prefijo telefono contacto: " + preMovilPC);
  console.log("telefono contacto: " + movilPC);
  console.log("prefijo habitacion contacto: " + preHabitacionPC);
  console.log("habitacion contacto: " + habitacionPC);
  console.log("----------------------------------");
  console.log("denominacion comercial: " + demCom);
  console.log("razon social: " + razonSocial);
  console.log("pagina web: " + paginaWeb);
  console.log("capital disponible: " + capitalDisponible);
  console.log("correo: " + correo);
  console.log("rif: " + rif);
  console.log("contraseña: " + contraseña);
  console.log("estado: " + estadoSelec);
  console.log("municipio: " + municipioSelec);
  console.log("parroquia: " + parroquiaSelec);
  console.log("parroquia F : " + parroquiaFSelec);
  console.log("prefijo telefono: " + preMovil);
  console.log("telefono: " + movil);
  console.log("prefijo habitacion : " + preHabitacion);
  console.log("habitacion: " + habitacion);
  console.log("numero credito:" + numCredito);
  console.log("fecha credito: " + fechaCredito);
  console.log("fecha actual: ", fechaActual);

  if (tipo === "") {
    return (
      <React.Fragment>
        <Typography variant="h5" className="m-4">
          <b>Registrarse</b>
        </Typography>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Tipo de Persona:
          </Typography>
          <Select
            value={tipo}
            onChange={handleChangeTipo}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className={classes.tipo}
            variant="outlined"
          >
            <MenuItem value="">Natural</MenuItem>
            <MenuItem value={1}>Jurídica</MenuItem>
          </Select>
        </div>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Primer Nombre:
          </Typography>
          <TextField
            id="outlined-primNombre"
            label="Primer Nombre"
            variant="outlined"
            className={classes.campo}
            onChange={handleChangePrimNombre}
          />
          <Typography variant="h6" className="m-2">
            Segundo Nombre:
          </Typography>
          <TextField
            id="outlined-segNombre"
            label="Segundo Nombre"
            variant="outlined"
            className={classes.campo}
            onChange={handleChangeSegNombre}
          />
        </div>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Primer Apellido:
          </Typography>
          <TextField
            id="outlined-primApellido"
            label="Primer Apellido"
            variant="outlined"
            className={classes.campo}
            onChange={handleChangePrimApellido}
          />
          <Typography variant="h6" className="m-2">
            Segundo Apellido:
          </Typography>
          <TextField
            id="outlined-segApellido"
            label="Segundo Apellido"
            variant="outlined"
            className={classes.campo}
            onChange={handleChangeSegApellido}
          />
        </div>
        <div class="m-4">
          <Typography variant="h6" className="m-2">
            Teléfonos
          </Typography>
          <Typography variant="subtitle1" className={classes.sub}>
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
              label="Teléfono celular"
              type="tel"
              onChange={handleChangeMovil}
            />
          </div>
          <Typography variant="subtitle1" className={classes.sub}>
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
              label="Teléfono de habitación"
              type="tel"
              onChange={handleChangeHabitacion}
            />
          </div>
        </div>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Cédula de identidad:
          </Typography>
          <Select
            value={cedula}
            onChange={handleChangeCedula}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className={classes.cedula}
            variant="outlined"
          >
            <MenuItem value="">V</MenuItem>
            <MenuItem value={1}>E</MenuItem>
          </Select>
          <TextField
            id="outlined-cedula"
            label="Cédula de Identidad"
            variant="outlined"
            className={classes.campo}
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={handleChangeNumCedula}
          />
        </div>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            RIF:
          </Typography>
          <Typography variant="h5" className="m-2">
            <b>J</b>
          </Typography>
          <TextField
            id="outlined-rif"
            label={labelRif}
            variant="outlined"
            className={classes.campo}
            onChange={handleChangeRif}
            error={rifExiste}
          />
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
            </ListItem>
          </List>
        </div>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Contraseña:
          </Typography>
          <TextField
            id="outlined-contraseña"
            label="Contraseña"
            variant="outlined"
            type="password"
            className={classes.campo}
            onChange={handleChangeContraseña}
          />
        </div>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Verificar contraseña:
          </Typography>
          <TextField
            id="outlined-contraseña2"
            label={labelContraseña2}
            variant="outlined"
            type="password"
            className={classes.campo}
            onChange={handleChangeContraseña2}
            error={noIguales}
          />
        </div>
        <Boton
          variant="contained"
          className={classes.boton}
          color="primary"
          onClick={validar}
        >
          Registrarse
        </Boton>
        <Backdrop className={classes.backdrop} open={openBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Typography variant="h5" className="m-4">
          <b>Registrarse</b>
        </Typography>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Tipo de Persona:
          </Typography>
          <Select
            value={tipo}
            onChange={handleChangeTipo}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className={classes.tipo}
            variant="outlined"
          >
            <MenuItem value="">Natural</MenuItem>
            <MenuItem value={1}>Jurídica</MenuItem>
          </Select>
        </div>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            RIF:
          </Typography>
          <Typography variant="h5" className="m-2">
            <b>J</b>
          </Typography>
          <TextField
            id="outlined-rif"
            label="RIF"
            variant="outlined"
            className={classes.campo}
            onChange={handleChangeRif}
            error={rifExiste}
          />
        </div>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Denominación Comercial:
          </Typography>
          <TextField
            id="outlined-demCom"
            label="Denominación Comercial"
            variant="outlined"
            className={classes.campo}
            onChange={handleChangeDemCom}
          />
        </div>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Razón Social:
          </Typography>
          <TextField
            id="outlined-razSol"
            label="Razón Social"
            variant="outlined"
            className={classes.campo}
            onChange={handleChangeRazonSocial}
          />
        </div>
        <div class="m-4">
          <Typography variant="h6" className="m-2">
            Teléfonos
          </Typography>
          <Typography variant="subtitle1" className={classes.sub}>
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
              label="Teléfono actual"
              type="tel"
              onChange={handleChangeMovil}
            />
          </div>
          <Typography variant="subtitle1" className={classes.sub}>
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
              label="Teléfono actual"
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
            label="Correo electrónico"
            variant="outlined"
            type="email"
            className={classes.campo}
            onChange={handleChangeCorreo}
            error={correoExiste}
          />
        </div>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Página Web:
          </Typography>
          <TextField
            id="outlined-pagina"
            label="Página web"
            variant="outlined"
            type="url"
            className={classes.campo}
            onChange={handleChangePaginaWeb}
          />
        </div>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Capital Disponible:
          </Typography>
          <TextField
            id="outlined-capDis"
            label="Capital Disponible"
            variant="outlined"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            className={classes.campo}
            onChange={handleChangeCapitalDisponible}
          />
        </div>
        <div class="m-4">
          <Typography variant="h6" className="m-2">
            Persona de contacto
          </Typography>
          <div style={{ display: "flex" }} class="m-4">
            <Typography variant="subtitle1" className="m-2">
              Primer Nombre:
            </Typography>
            <TextField
              id="outlined-primNombre"
              label="Primer Nombre"
              variant="outlined"
              className={classes.campo}
              onChange={handleChangePrimNombre}
            />
          </div>
          <div style={{ display: "flex" }} class="m-4">
            <Typography variant="subtitle1" className="m-2">
              Primer Apellido:
            </Typography>
            <TextField
              id="outlined-primApellido"
              label="Primer Apellido"
              variant="outlined"
              className={classes.campo}
              onChange={handleChangePrimApellido}
            />
            <Typography variant="subtitle1" className="m-2">
              Segundo Apellido:
            </Typography>
            <TextField
              id="outlined-segApellido"
              label="Segundo Apellido"
              variant="outlined"
              className={classes.campo}
              onChange={handleChangeSegApellido}
            />
          </div>
          <div class="m-4">
            <Typography variant="subtitle1" className="m-2">
              Teléfonos
            </Typography>
            <Typography variant="subtitle2" className={classes.sub}>
              Móvil
            </Typography>
            <div style={{ display: "flex" }}>
              <Select
                value={prefijoMovPC}
                onChange={handleChangeMovPC}
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
                label="Teléfono actual"
                type="tel"
                onChange={handleChangeMovilPC}
              />
            </div>
            <Typography variant="subtitle2" className={classes.sub}>
              Habitación
            </Typography>
            <div style={{ display: "flex" }}>
              <Select
                value={prefijoHabPC}
                onChange={handleChangeHabPC}
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
                label="Teléfono actual"
                type="tel"
                onChange={handleChangeHabitacionPC}
              />
            </div>
          </div>
        </div>
        <Divider variant="middle" className="border border-primary m-4" />
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
          <Dialog
            open={openCredito}
            onClose={handleCloseCredito}
            aria-labelledby="alert-dialog-title"
          >
            <DialogTitle id="alert-dialog-title">
              Tarjeta de Crédito
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Ingrese datos de la tarjeta
              </DialogContentText>
              <TextField
                margin="dense"
                fullWidth
                autoFocus
                label="Número de tarjeta"
                type="number"
                variant="outlined"
                onChange={handleChangeNumCredito}
              />
              <TextField
                margin="dense"
                fullWidth
                autoFocus
                label="Nombre de la tarjeta"
                variant="outlined"
                onChange={handleChangeNombreCredito}
              />
              <TextField
                margin="dense"
                fullWidth
                autoFocus
                helperText="Fecha de vencimiento"
                type="month"
                variant="outlined"
                InputProps={{ inputProps: { min: fechaActual } }}
                onChange={handleChangeFechaCredito}
              />
            </DialogContent>
            <DialogActions>
              <Button color="primary">Agregar tarjeta</Button>
              <Button onClick={handleCloseCredito} color="primary" autoFocus>
                Volver
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openDebito}
            onClose={handleCloseDebito}
            aria-labelledby="alert-dialog-title"
          >
            <DialogTitle id="alert-dialog-title">Tarjeta de Débito</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Ingrese datos de la tarjeta
              </DialogContentText>
              <TextField
                margin="dense"
                fullWidth
                autoFocus
                label="Número de tarjeta"
                type="number"
                variant="outlined"
                onChange={handleChangeNumDebito}
              />
              <TextField
                margin="dense"
                fullWidth
                autoFocus
                label="Nombre de la tarjeta"
                variant="outlined"
                onChange={handleChangeNombreDebito}
              />
              <TextField
                margin="dense"
                fullWidth
                autoFocus
                helperText="Fecha de vencimiento"
                type="month"
                variant="outlined"
                InputProps={{ inputProps: { min: fechaActual } }}
                onChange={handleChangeFechaDebito}
              />
            </DialogContent>
            <DialogActions>
              <Button color="primary">Agregar tarjeta</Button>
              <Button onClick={handleCloseDebito} color="primary" autoFocus>
                Volver
              </Button>
            </DialogActions>
          </Dialog>
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
            </ListItem>
          </List>
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
        </div>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Contraseña:
          </Typography>
          <TextField
            id="outlined-contraseña"
            label="Contraseña"
            variant="outlined"
            type="password"
            className={classes.campo}
            onChange={handleChangeContraseña}
          />
        </div>
        <div style={{ display: "flex" }} class="m-4">
          <Typography variant="h6" className="m-2">
            Verificar contraseña:
          </Typography>
          <TextField
            id="outlined-contraseña2"
            label={labelContraseña2}
            variant="outlined"
            type="password"
            className={classes.campo}
            onChange={handleChangeContraseña2}
            error={noIguales}
          />
        </div>
        <Boton
          variant="contained"
          className={classes.boton}
          color="primary"
          onClick={validarJuridico}
        >
          Registrarse
        </Boton>
        <Backdrop className={classes.backdrop} open={openBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    );
  }
}
