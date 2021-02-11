import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import axios from "axios";
import TablaHorario from "./TablaHorario";

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
  paper: {
    width: 550,
    margin: 30,
    marginTop: 60,
  },
  lista: {
    width: 400,
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

export default function CrearEmpleado() {
  const classes = useStyles();
  const history = useHistory();

  const [prefijoHab, setPrefijoHab] = React.useState("");
  const [prefijoMov, setPrefijoMov] = React.useState("");
  const [preMovil, setPreMovil] = React.useState(0);
  const [preHabitacion, setPreHabitacion] = React.useState(0);
  const [movil, setMovil] = React.useState(0);
  const [habitacion, setHabitacion] = React.useState(0);

  const [estado, setEstado] = React.useState(0);
  const [municipio, setMunicipio] = React.useState(0);
  const [parroquia, setParroquia] = React.useState(0);

  const [cedula, setCedula] = React.useState("");
  const [tipoCedula, setTipoCedula] = React.useState("");

  const [listaEstados, setListaEstados] = React.useState([]);
  const [estadoSelec, setEstadoSelec] = React.useState("");
  const [listaMunicipios, setListaMunicipios] = React.useState([]);
  const [municipioSelec, setMunicipioSelec] = React.useState("");
  const [listaParroquias, setListaParroquias] = React.useState([]);
  const [parroquiaSelec, setParroquiaSelec] = React.useState("");

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

  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [horario, setHorario] = React.useState([]);

  const [tienda, setTienda] = React.useState("");
  const [tiendas, setTiendas] = React.useState([]);
  const [tiendaSelec, setTiendaSelec] = React.useState(0);

  const [listaCargos, setListaCargos] = React.useState([
    { nombre: "Gerente General de promociones", id: 3 },
    { nombre: "Cajero", id: 2 },
    { nombre: "Jefe de Compras", id: 4 },
    { nombre: "Jefe de Pasillo", id: 1 },
    { nombre: "Jefe de Tienda", id: 5 },
    { nombre: "Administrador", id: 8 },
  ]);

  const [cargosAgregados, setCargosAgregados] = React.useState([]);
  const [diccionarioCargos, setDiccionarioCargos] = React.useState({});

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

  const handleChangeCedula = (event) => {
    setCedula(event.target.value);
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

  const handleChangeHabitacion = (event) => {
    setHabitacion(event.target.value);
  };

  const handleClickAgregar = (index) => {
    setCargosAgregados((cargosAgregados) => [
      ...cargosAgregados,
      listaCargos[index],
    ]);
    let aux = listaCargos.filter((cargo, value) => value !== index);
    setListaCargos(aux);
  };

  const handleClickEliminar = (index) => {
    setListaCargos((listaCargos) => [...listaCargos, cargosAgregados[index]]);
    let aux = cargosAgregados.filter((cargo, value) => value !== index);
    setCargosAgregados(aux);
  };

  const handleChangeTienda = (event) => {
    setTienda(event.target.value);
  };

  const irControlEmpleado = () => {
    history.push("/perfil/controlempleado");
  };

  const enviarDatos = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/empleado",
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
        parroquia: parroquiaSelec,
        municipio: municipioSelec,
        estado: estadoSelec,
        telefono: habitacion,
        prefijo_telefono: preHabitacion,
        celular: movil,
        prefijo_celular: preMovil,
        horario: horario,
        tienda_id: tiendaSelec,
      },
    }).then((response) => {
      console.log(response);
    });
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/cargo",
      data: {
        rif: rif,
        cargo: diccionarioCargos,
      },
    }).then((response) => {
      console.log(response);
    });
    setOpenBackdrop(false);
  };

  const compararCorreo = async () => {
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

  const compararRif = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/rif",
      data: {
        rif: rif,
        tipo: "EMPLEADO",
      },
    }).then((response) => {
      setRifRespuesta(response.data);
    });
  };

  const datosTiendas = async () => {
    await axios({
      method: "get",
      url: "https://proyectobases1.herokuapp.com/inventario",
    }).then((response) => {
      setTiendas(response.data);
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

  const horarioTabla = (horario) => {
    setHorario(horario);
  };

  React.useEffect(() => {
    fetchEstados();
    datosTiendas();
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
    let aux = {};
    cargosAgregados.forEach((cargo, value) => {
      aux[value] = { id: cargo.id };
    });
    setDiccionarioCargos(JSON.stringify(aux));
  }, [cargosAgregados]);

  React.useEffect(() => {
    if (tiendas[tienda]) {
      setTiendaSelec(tiendas[tienda].tienda_id);
    }
  }, [tienda]);

  console.log("-------------------------");
  console.log("primer nombre: " + primNombre);
  console.log("segundo nombre: " + segNombre);
  console.log("primer apellido: " + primApellido);
  console.log("segundo apellido: " + segApellido);
  console.log("contraseña: " + contraseña);
  console.log("tipo cedula: " + tipoCedula);
  console.log("cedula: " + numCedula);
  console.log("rif: " + rif);
  console.log("correo: " + correo);
  console.log("prefijo celular: " + preMovil);
  console.log("celular: " + movil);
  console.log("prefijo telefono: " + preHabitacion);
  console.log("telefono: " + habitacion);
  console.log("parroquia: " + parroquiaSelec);
  console.log("municipio: " + municipioSelec);
  console.log("estado: " + estadoSelec);
  console.log(horario);
  console.log("--------------------------");
  console.log(cargosAgregados);
  console.log(diccionarioCargos);
  console.log(tiendaSelec);

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irControlEmpleado}>
        <Typography variant="h5">Responsabilidades</Typography>
      </Button>
      <Typography variant="h5" className="m-4">
        <b>Crear empleado</b>
      </Typography>
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
          Cargos
        </Typography>
        <div style={{ display: "flex" }} class="m-4">
          <Paper variant="outlined" className="m-3">
            <List className={classes.lista}>
              {listaCargos.map((cargo, value) => (
                <ListItem>
                  <ListItemText primary={cargo.nombre} />
                  <IconButton>
                    <AddIcon onClick={handleClickAgregar.bind(null, value)} />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Paper>
          <Paper variant="outlined" className="m-3">
            <List className={classes.lista}>
              {cargosAgregados.map((cargo, value) => (
                <ListItem>
                  <ListItemText primary={cargo.nombre} />
                  <IconButton>
                    <DeleteIcon
                      onClick={handleClickEliminar.bind(null, value)}
                    />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>
      </div>
      <div class="m-4" style={{ display: "flex" }}>
        <Typography variant="h6" className="m-4">
          Tienda:
        </Typography>
        <Select
          value={tienda}
          onChange={handleChangeTienda}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          variant="outlined"
        >
          {tiendas.map((tienda, value) => (
            <MenuItem value={value}>{tienda.nombre}</MenuItem>
          ))}
        </Select>
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
        Crear usuario
      </Boton>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
