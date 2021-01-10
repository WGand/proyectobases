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

  const [estado, setEstado] = React.useState(0);
  const [municipio, setMunicipio] = React.useState(0);
  const [parroquia, setParroquia] = React.useState(0);
  const [listaEstados, setListaEstados] = React.useState([]);
  const [estadoSelec, setEstadoSelec] = React.useState("");
  const [listaMunicipios, setListaMunicipios] = React.useState([]);
  const [municipioSelec, setMunicipioSelec] = React.useState("");
  const [listaParroquias, setListaParroquias] = React.useState([]);

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
        parroquia: props.datos[0].fk_lugar,
      },
    }).then((response) => {
      setUbicacion(response.data);
    });
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
    setLabelPrimNombre(props.datos[0].primer_nombre);
    setLabelSegNombre(props.datos[0].segundo_nombre);
    setLabelPrimApellido(props.datos[0].primer_apellido);
    setLabelSegApellido(props.datos[0].segundo_apellido);
    setLabelCorreo(props.datos[0].correo_electronico);
    setLabelCelular(props.datos[0].celular);
    setLabelTelefono(props.datos[0].telefono);
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
  }, []);

  React.useEffect(() => {
    if (!ubicacion[0] || !ubicacion[1] || !ubicacion[2]) {
      ubicacionActual();
    } else {
      setUbicacionEstado(ubicacion[2].value);
      setUbicacionMunicipio(ubicacion[1].value);
      setUbicacionParroquia(ubicacion[0].value);
    }
  }, [ubicacion]);

  console.log(props.datos);

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
        />
        <Typography variant="h6" className="m-2">
          Segundo Nombre:
        </Typography>
        <TextField
          id="outlined-segNombre"
          label={labelSegNombre}
          variant="outlined"
          className={classes.campo}
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
        />
        <Typography variant="h6" className="m-2">
          Segundo Apellido:
        </Typography>
        <TextField
          id="outlined-segApellido"
          label={labelSegApellido}
          variant="outlined"
          className={classes.campo}
        />
      </div>
      <div style={{ display: "flex" }} class="m-4">
        <Typography variant="h6" className="m-2">
          Cargos:
        </Typography>
        <TextField
          id="outlined-cargos"
          label="Cargos"
          variant="outlined"
          className={classes.campo}
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
      <Boton variant="contained" color="primary">
        Guardar cambios
      </Boton>
    </React.Fragment>
  );
}
