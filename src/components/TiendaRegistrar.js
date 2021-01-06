import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  ubi: {
    marginLeft: 30,
    width: 250,
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

export default function TiendaRegistrar() {
  const history = useHistory();
  const classes = useStyles();

  const [estado, setEstado] = React.useState(0);
  const [municipio, setMunicipio] = React.useState(0);
  const [parroquia, setParroquia] = React.useState(0);
  const [listaEstados, setListaEstados] = React.useState([]);
  const [estadoSelec, setEstadoSelec] = React.useState("");
  const [listaMunicipios, setListaMunicipios] = React.useState([]);
  const [municipioSelec, setMunicipioSelec] = React.useState("");
  const [listaParroquias, setListaParroquias] = React.useState([]);

  const irControlTienda = () => {
    history.push("/perfil/controltienda");
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

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irControlTienda}>
        <Typography variant="h5">Control de Tienda</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Control de Tienda: Registrar</b>
      </Typography>
      <Typography variant="h5" className="m-3">
        Ubicación
      </Typography>
      <div style={{ display: "flex" }} class="m-4">
        <Typography variant="h6" className="m-2">
          Estado:
        </Typography>
        <Select
          /* Los datos de LUGAR se recibirán de la DB, por ahora hardcoded */
          value={estado}
          onChange={handleChangeEstado}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          variant="outlined"
          className={classes.ubi}
        >
          {listaEstados.map((estado, value) => (
            <MenuItem value={value}>{estado.nombre}</MenuItem>
          ))}
        </Select>
      </div>
      <div style={{ display: "flex" }} class="m-4">
        <Typography variant="h6" className="m-2">
          Municipio:
        </Typography>
        <Select
          value={municipio}
          onChange={handleChangeMunicipio}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className={classes.ubi}
          variant="outlined"
        >
          {listaMunicipios.map((municipio, value) => (
            <MenuItem value={value}>{municipio.nombre}</MenuItem>
          ))}
        </Select>
      </div>
      <div style={{ display: "flex" }} class="m-4">
        <Typography variant="h6" className="m-2">
          Parroquia:
        </Typography>
        <Select
          value={parroquia}
          onChange={handleChangeParroquia}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className={classes.ubi}
          variant="outlined"
        >
          {listaParroquias.map((parroquia, value) => (
            <MenuItem value={value}>{parroquia.nombre}</MenuItem>
          ))}
        </Select>
      </div>
      <Boton variant="contained" className="m-4" color="primary">
        Registrar Tienda
      </Boton>
    </React.Fragment>
  );
}
