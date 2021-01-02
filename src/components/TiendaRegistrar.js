import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ubi: {
    marginLeft: 30,
    width: 200,
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

  const [estado, setEstado] = React.useState("");
  const [municipio, setMunicipio] = React.useState("");
  const [parroquia, setParroquia] = React.useState("");

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
          <MenuItem value="">Amazonas</MenuItem>{" "}
          <MenuItem value={1}>Anzoátegui</MenuItem>
          <MenuItem value={2}>Apure</MenuItem>
          <MenuItem value={3}>Aragua</MenuItem>
          <MenuItem value={3}>Barinas</MenuItem>
          <MenuItem value={3}>Bolívar</MenuItem>
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
          <MenuItem value="">Municipio 1</MenuItem>{" "}
          <MenuItem value={1}>Municipio 2</MenuItem>
          <MenuItem value={2}>Municipio 3</MenuItem>
          <MenuItem value={3}>Municipio 4</MenuItem>
          <MenuItem value={3}>Municipio 5</MenuItem>
          <MenuItem value={3}>Municipio 6</MenuItem>
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
          <MenuItem value="">Parroquia 1</MenuItem>{" "}
          <MenuItem value={1}>Parroquia 2</MenuItem>
          <MenuItem value={2}>Parroquia 3</MenuItem>
          <MenuItem value={3}>Parroquia 4</MenuItem>
          <MenuItem value={3}>Parroquia 5</MenuItem>
          <MenuItem value={3}>Parroquia 6</MenuItem>
        </Select>
      </div>
      <Boton variant="contained" className="m-4" color="primary">
        Registrar Tienda
      </Boton>
    </React.Fragment>
  );
}
