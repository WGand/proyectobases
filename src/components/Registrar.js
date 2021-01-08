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
    checkedEfectivo: true,
    checkedDebito: true,
    checkedCredito: true,
    checkedCheque: true,
  });

  const classes = useStyles();

  const [prefijoHab, setPrefijoHab] = React.useState("");
  const [prefijoMov, setPrefijoMov] = React.useState("");
  const [preMovil, setPreMovil] = React.useState(0);
  const [movil, setMovil] = React.useState(0);

  const [estado, setEstado] = React.useState(0);
  const [municipio, setMunicipio] = React.useState(0);
  const [parroquia, setParroquia] = React.useState(0);
  const [estadoF, setEstadoF] = React.useState(0);
  const [municipioF, setMunicipioF] = React.useState(0);
  const [parroquiaF, setParroquiaF] = React.useState(0);

  const [tipo, setTipo] = React.useState("");
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

  const [contraseña, setContraseña] = React.useState("");
  const [contraseña2, setContraseña2] = React.useState("");
  const [noIguales, setNoIguales] = React.useState(false);
  const [labelContraseña2, setLabelContraseña2] = React.useState("");

  const [primNombre, setPrimNombre] = React.useState("");
  const [segNombre, setSegNombre] = React.useState("");
  const [primApellido, setPrimApellido] = React.useState("");
  const [segApellido, setSegApellido] = React.useState("");
  const [numCedula, setNumCedula] = React.useState(0);
  const [rif, setRif] = React.useState(0);
  const [correo, setCorreo] = React.useState("");

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

  const enviarDatos = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/usuarioNatural",
      data: {
        rif: rif,
        correo: correo,
        cedula: numCedula,
        primer_nombre: primNombre,
        segundo_nombre: segNombre,
        primer_apellido: primApellido,
        segundo_apellido: segApellido,
        contrasena: contraseña,
        tipo_cedula: tipoCedula,
        telefono: preMovil + movil,
        lugar: parroquiaSelec,
      },
    }).then((response) => {
      console.log(response);
    });
  };

  const validar = () => {
    if (
      rif.length !== 0 &&
      correo.length !== 0 &&
      numCedula.length !== 0 &&
      primNombre.length !== 0 &&
      primApellido.length !== 0 &&
      contraseña.length !== 0
    ) {
      console.log("datos completos");
      if (contraseña === contraseña2) {
        console.log("contraseñas iguales");
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
      setParroquiaSelec(listaParroquias[parroquia].fk_lugar);
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

  console.log("primer nombre: " + primNombre);
  console.log("segundo nombre: " + segNombre);
  console.log("primer apellido: " + primApellido);
  console.log("segundo apellido: " + segApellido);
  console.log("correo: " + correo);
  console.log("tipo cedula: " + tipoCedula);
  console.log("cedula: " + numCedula);
  console.log("rif: " + rif);
  console.log("contraseña: " + contraseña);
  console.log("parroquia fk: " + parroquiaSelec);
  console.log("telefono: " + preMovil + movil);

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
            label="RIF"
            variant="outlined"
            className={classes.campo}
            onChange={handleChangeRif}
          />
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
                /* Los datos de LUGAR se recibirán de la DB, por ahora hardcoded */
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
          <TextField
            id="outlined-direccion"
            label="Dirección específica"
            variant="outlined"
            multiline
            rows="3"
            className={classes.dirEsp}
          />
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
            />
            <Typography variant="subtitle1" className="m-2">
              Segundo Nombre:
            </Typography>
            <TextField
              id="outlined-segNombre"
              label="Segundo Nombre"
              variant="outlined"
              className={classes.campo}
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
            />
            <Typography variant="subtitle1" className="m-2">
              Segundo Apellido:
            </Typography>
            <TextField
              id="outlined-segApellido"
              label="Segundo Apellido"
              variant="outlined"
              className={classes.campo}
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
              />
            </div>
            <Typography variant="subtitle2" className={classes.sub}>
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
        </div>
        <div class="m-4">
          <Typography variant="h6" className="m-2">
            Dirección Fiscal:
          </Typography>
          <List>
            <ListItem>
              <Select
                /* Los datos de LUGAR se recibirán de la DB, por ahora hardcoded */
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
                /* Los datos de LUGAR se recibirán de la DB, por ahora hardcoded */
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
        <Boton variant="contained" className={classes.boton} color="primary">
          Registrarse
        </Boton>
      </React.Fragment>
    );
  }
}
