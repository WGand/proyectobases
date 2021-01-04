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

const useStyles = makeStyles((theme) => ({
  campo: {
    width: 300,
    maxWidth: 300,
    marginLeft: 10,
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

export default function PerfilDatos() {
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
  const [estado, setEstado] = React.useState("");
  const [municipio, setMunicipio] = React.useState("");
  const [parroquia, setParroquia] = React.useState("");

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
          label="Primer Nombre"
          variant="outlined"
          className={classes.campo}
        />
        <Typography variant="h6" className="m-2">
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
        <Typography variant="h6" className="m-2">
          Primer Apellido:
        </Typography>
        <TextField
          id="outlined-primApellido"
          label="Primer Apellido"
          variant="outlined"
          className={classes.campo}
        />
        <Typography variant="h6" className="m-2">
          Segundo Apellido:
        </Typography>
        <TextField
          id="outlined-segApellido"
          label="Segundo Apellido"
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
            label="Teléfono actual"
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
              <MenuItem value="">Amazonas</MenuItem>{" "}
              <MenuItem value={1}>Anzoátegui</MenuItem>
              <MenuItem value={2}>Apure</MenuItem>
              <MenuItem value={3}>Aragua</MenuItem>
              <MenuItem value={3}>Barinas</MenuItem>
              <MenuItem value={3}>Bolívar</MenuItem>
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
              <MenuItem value="">Municipio 1</MenuItem>{" "}
              <MenuItem value={1}>Municipio 2</MenuItem>
              <MenuItem value={2}>Municipio 3</MenuItem>
              <MenuItem value={3}>Municipio 4</MenuItem>
              <MenuItem value={3}>Municipio 5</MenuItem>
              <MenuItem value={3}>Municipio 6</MenuItem>
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
              <MenuItem value="">Parroquia 1</MenuItem>{" "}
              <MenuItem value={1}>Parroquia 2</MenuItem>
              <MenuItem value={2}>Parroquia 3</MenuItem>
              <MenuItem value={3}>Parroquia 4</MenuItem>
              <MenuItem value={3}>Parroquia 5</MenuItem>
              <MenuItem value={3}>Parroquia 6</MenuItem>
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
    </React.Fragment>
  );
}
