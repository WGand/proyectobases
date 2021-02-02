import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dir: {
    marginLeft: 150,
  },
  lista: {
    margin: 30,
    width: 400,
  },
  monto: {
    margin: 20,
    marginLeft: 200,
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

const GreenCheckbox = withStyles({
  root: {
    color: "#00AAE3",
    "&$checked": {
      color: "#00AAE3",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function ProcederPago(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    checkedNinguno: true,
    checkedEfectivo: false,
    checkedDebito: false,
    checkedCredito: false,
    checkedCheque: false,
  });

  const [openCredito, setOpenCredito] = React.useState(false);
  const [openDebito, setOpenDebito] = React.useState(false);
  const [fechaActual, setFechaActual] = React.useState("");
  const [numCredito, setNumCredito] = React.useState("");
  const [numDebito, setNumDebito] = React.useState("");
  const [fechaCredito, setFechaCredito] = React.useState("");
  const [fechaDebito, setFechaDebito] = React.useState("");
  const [nombreCredito, setNombreCredito] = React.useState("");
  const [nombreDebito, setNombreDebito] = React.useState("");

  const [carrito, setCarrito] = React.useState([]);

  const [disabled, setDisabled] = React.useState(false);

  const handleCheckboxes = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleCloseCredito = () => {
    setState({ ...state, ["checkedCredito"]: false });
    setOpenCredito(false);
  };

  const handleCloseDebito = () => {
    setState({ ...state, ["checkedDebito"]: false });
    setOpenDebito(false);
  };

  const handleChangeNumCredito = (event) => {
    setNumCredito(event.target.value);
  };

  const handleChangeNumDebito = (event) => {
    setNumDebito(event.target.value);
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

  React.useEffect(() => {
    setCarrito(JSON.parse(localStorage.getItem("carrito")));
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
    if (state.checkedCredito === true) {
      setOpenCredito(true);
    }
  }, [state.checkedCredito]);

  React.useEffect(() => {
    if (state.checkedDebito === true) {
      setOpenDebito(true);
    }
  }, [state.checkedDebito]);

  React.useEffect(() => {
    if (state.checkedNinguno === true) {
      setDisabled(true);
      setState({
        ...state,
        ["checkedEfectivo"]: false,
        ["checkedCredito"]: false,
        ["checkedDebito"]: false,
        ["checkedCheque"]: false,
      });
    } else {
      setDisabled(false);
    }
  }, [state.checkedNinguno]);

  React.useEffect(() => {
    if (
      state.checkedEfectivo === true ||
      state.checkedCredito === true ||
      state.checkedDebito === true ||
      state.checkedCheque === true
    ) {
      setState({ ...state, ["checkedNinguno"]: false });
    }
  }, [
    state.checkedEfectivo,
    state.checkedCredito,
    state.checkedDebito,
    state.checkedCheque,
  ]);

  console.log("numero credito: " + numCredito);
  console.log("numero debito: " + numDebito);
  console.log("fecha credito " + fechaCredito);
  console.log("fecha debito: " + fechaDebito);
  console.log("nombre credito: " + nombreCredito);
  console.log("nombre debito: " + nombreDebito);
  console.log(carrito);
  console.log("-----------------");
  console.log(props.total);

  return (
    <React.Fragment>
      <Typography variant="h3" className="m-4">
        <b>Pago</b>
      </Typography>
      <Typography variant="h5" className="m-4">
        Productos en la Órden
      </Typography>
      <List className={classes.lista}>
        {carrito.map((producto, value) => (
          <ListItem divider>
            <ListItemText
              primary={producto.nombre}
              secondary={"Cantidad: " + producto.cantidad}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" className={classes.monto}>
        <b>Monto: {props.total}.000 Bs.</b>
      </Typography>
      <div class="m-4">
        <Typography variant="h6" className="m-2">
          Medios de pago:
        </Typography>
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
        <Dialog
          open={openCredito}
          onClose={handleCloseCredito}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">Tarjeta de Crédito</DialogTitle>
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
      <Boton
        variant="contained"
        className="m-4"
        color="primary"
        disabled={disabled}
      >
        Comprar
      </Boton>
    </React.Fragment>
  );
}
