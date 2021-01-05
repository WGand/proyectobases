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
  const [estado, setEstado] = React.useState("");
  const [municipio, setMunicipio] = React.useState("");
  const [parroquia, setParroquia] = React.useState("");
  const [estadoF, setEstadoF] = React.useState("");
  const [municipioF, setMunicipioF] = React.useState("");
  const [parroquiaF, setParroquiaF] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [cedula, setCedula] = React.useState("");

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
        <Boton variant="contained" className={classes.boton} color="primary">
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
        <Divider variant="middle" class="border border-primary m-4" />
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
                value={municipioF}
                onChange={handleChangeMunicipioF}
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
                value={parroquiaF}
                onChange={handleChangeParroquiaF}
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
        <Boton variant="contained" className={classes.boton} color="primary">
          Registrarse
        </Boton>
      </React.Fragment>
    );
  }
}