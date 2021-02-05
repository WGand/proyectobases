import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  radio: {
    marginTop: 20,
    marginLeft: 50,
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

export default function Factura(props) {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = React.useState({
    checkedNinguno: true,
    checkedEfectivo: false,
    checkedDebito: false,
    checkedCredito: false,
    checkedCheque: false,
    checkedPuntos: false,
  });

  const [stateMoneda, setStateMoneda] = React.useState({
    checkedBolivar: true,
    checkedDolar: false,
    checkedEuro: false,
  });

  const [openCredito, setOpenCredito] = React.useState(false);
  const [openDebito, setOpenDebito] = React.useState(false);
  const [openEfectivo, setOpenEfectivo] = React.useState(false);
  const [openCheque, setOpenCheque] = React.useState(false);
  const [openPuntos, setOpenPuntos] = React.useState(false);

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [fechaActual, setFechaActual] = React.useState("");
  const [fechaActualDia, setFechaActualDia] = React.useState("");

  const [numCredito, setNumCredito] = React.useState("");
  const [numDebito, setNumDebito] = React.useState("");
  const [fechaCredito, setFechaCredito] = React.useState("");
  const [fechaDebito, setFechaDebito] = React.useState("");
  const [nombreCredito, setNombreCredito] = React.useState("");
  const [nombreDebito, setNombreDebito] = React.useState("");
  const [montoCredito, setMontoCredito] = React.useState(0);
  const [montoDebito, setMontoDebito] = React.useState(0);

  const [montoBolivar, setMontoBolivar] = React.useState(0);
  const [montoDolar, setMontoDolar] = React.useState(0);
  const [montoEuro, setMontoEuro] = React.useState(0);

  const [numConfirmacion, setNumConfirmacion] = React.useState("");
  const [nombreBanco, setNombreBanco] = React.useState("");
  const [fechaCheque, setFechaCheque] = React.useState("");
  const [montoCheque, setMontoCheque] = React.useState(0);

  const [cantidadPuntos, setCantidadPuntos] = React.useState(0);
  const [montoPuntos, setMontoPuntos] = React.useState(0);

  const [productos, setProductos] = React.useState([]);

  const [montoPagar, setMontoPagar] = React.useState(0);

  const [disabled, setDisabled] = React.useState(false);
  const [textoBoton, setTextoBoton] = React.useState("");
  const [disabledBolivar, setDisabledBolivar] = React.useState(false);
  const [disabledDolar, setDisabledDolar] = React.useState(false);
  const [disabledEuro, setDisabledEuro] = React.useState(false);

  const [diccionarioPago, setDiccionarioPago] = React.useState({});
  const [contDiccionario, setContadorDiccionario] = React.useState(0);

  const handleCheckboxes = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    switch (event.target.name) {
      case "checkedCredito":
        if (event.target.checked === true) {
          setOpenCredito(true);
        }
        break;
      case "checkedDebito":
        if (event.target.checked === true) {
          setOpenDebito(true);
        }
        break;
      case "checkedEfectivo":
        if (event.target.checked === true) {
          setOpenEfectivo(true);
        }
        break;
      case "checkedCheque":
        if (event.target.checked === true) {
          setOpenCheque(true);
        }
        break;
      case "checkedPuntos":
        if (event.target.checked === true) {
          setOpenPuntos(true);
        }
        break;

      default:
        break;
    }
  };

  const handleCheckBoxesMoneda = (event) => {
    setStateMoneda({
      ...stateMoneda,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCloseCredito = () => {
    setState({ ...state, ["checkedCredito"]: false });
    setOpenCredito(false);
  };

  const handleCloseDebito = () => {
    setState({ ...state, ["checkedDebito"]: false });
    setOpenDebito(false);
  };

  const handleCloseEfectivo = () => {
    setState({ ...state, ["checkedEfectivo"]: false });
    setOpenEfectivo(false);
  };

  const handleCloseCheque = () => {
    setState({ ...state, ["checkedCheque"]: false });
    setOpenCheque(false);
  };

  const handleClosePuntos = () => {
    setState({ ...state, ["checkedPuntos"]: false });
    setOpenPuntos(false);
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

  const handleChangeMontoCredito = (event) => {
    setMontoCredito(event.target.value);
  };

  const handleChangeMontoDebito = (event) => {
    setMontoDebito(event.target.value);
  };

  const handleChangeMontoBolivar = (event) => {
    setMontoBolivar(event.target.value);
  };

  const handleChangeMontoDolar = (event) => {
    setMontoDolar(event.target.value);
  };

  const handleChangeMontoEuro = (event) => {
    setMontoEuro(event.target.value);
  };

  const handleChangeNumConfirmacion = (event) => {
    setNumConfirmacion(event.target.value);
  };

  const handleChangeNombreBanco = (event) => {
    setNombreBanco(event.target.value);
  };

  const handleChangeFechaCheque = (event) => {
    setFechaCheque(event.target.value);
  };

  const handleChangeMontoCheque = (event) => {
    setMontoCheque(event.target.value);
  };

  const handleChangeCantidadPuntos = (event) => {
    setCantidadPuntos(event.target.value);
  };

  const handleChangeMontoPuntos = (event) => {
    setMontoPuntos(event.target.value);
  };

  const irPerfil = () => {
    history.push("/perfil");
  };

  const fetchProducto = async (id) => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/productoparticular",
      data: {
        producto_id: id,
      },
    }).then((response) => {
      setProductos((productos) => [...productos, response.data]);
    });
  };

  const fecha = () => {
    const fecha = new Date();
    const año = fecha.getFullYear();
    let mes = 0;
    let dia = 0;
    let hora = 0;
    let minuto = 0;
    let segundo = 0;

    if (fecha.getMonth() < 10) mes = "0" + (fecha.getMonth() + 1);
    else mes = fecha.getMonth() + 1;
    if (fecha.getDate() < 10) dia = "0" + fecha.getDate();
    else dia = fecha.getDate();
    if (fecha.getHours() < 10) hora = "0" + fecha.getHours();
    else hora = fecha.getHours();
    if (fecha.getMinutes() < 10) minuto = "0" + fecha.getMinutes();
    else minuto = fecha.getMinutes();
    if (fecha.getSeconds() < 10) segundo = "0" + fecha.getSeconds();
    else segundo = fecha.getSeconds();

    const horaFecha =
      mes + "-" + dia + "-" + año + ":" + hora + ":" + minuto + ":" + segundo;

    return horaFecha;
  };

  const registrarCredito = () => {
    setOpenCredito(false);
    let aux = Number(montoPagar);
    aux += Number(montoCredito);
    setMontoPagar(aux);

    let cont = contDiccionario;
    let diccionario = diccionarioPago;
    diccionario[cont] = {
      tipo_metodo: "tarjeta",
      numero_tarjeta: numCredito,
      fecha_caducidad: fechaCredito,
      tipo: "credito",
      nombre_tarjeta: nombreCredito,
    };
    cont++;
    setContadorDiccionario(cont);
    setDiccionarioPago(diccionario);
  };

  const registrarDebito = () => {
    setOpenDebito(false);
    let aux = Number(montoPagar);
    aux += Number(montoDebito);
    setMontoPagar(aux);

    let cont = contDiccionario;
    let diccionario = diccionarioPago;
    diccionario[cont] = {
      tipo_metodo: "tarjeta",
      numero_tarjeta: numDebito,
      fecha_caducidad: fechaDebito,
      tipo: "debito",
      nombre_tarjeta: nombreDebito,
    };
    cont++;
    setContadorDiccionario(cont);
    setDiccionarioPago(diccionario);
  };

  const registrarEfectivo = () => {
    setOpenEfectivo(false);
    let bolivar = Number(montoBolivar);
    let dolar = Number(montoDolar);
    let euro = Number(montoEuro);
    let aux = Number(montoPagar);
    aux += bolivar + dolar + euro;
    setMontoPagar(aux);

    let cont = contDiccionario;
    let diccionario = diccionarioPago;
    if (bolivar !== 0) {
      diccionario[cont] = {
        tipo_metodo: "moneda",
        tipo: "bolivar",
        cambio: montoBolivar,
      };
      cont++;
    }
    if (dolar !== 0) {
      diccionario[cont] = {
        tipo_metodo: "moneda",
        tipo: "dolar",
        cambio: montoDolar,
      };
      cont++;
    }
    if (euro !== 0) {
      diccionario[cont] = {
        tipo_metodo: "moneda",
        tipo: "euro",
        cambio: montoEuro,
      };
      cont++;
    }
    setContadorDiccionario(cont);
    setDiccionarioPago(diccionario);
  };

  const registrarCheque = () => {
    setOpenCheque(false);
    let aux = Number(montoPagar);
    aux += Number(montoCheque);
    setMontoPagar(aux);

    let cont = contDiccionario;
    let diccionario = diccionarioPago;
    diccionario[cont] = {
      tipo_metodo: "cheque",
      numero_confirmacion: numConfirmacion,
      nombre_banco: nombreBanco,
      fecha: fechaCheque,
    };
    cont++;
    setContadorDiccionario(cont);
    setDiccionarioPago(diccionario);
  };

  const registrarPuntos = () => {
    setOpenPuntos(false);
    let aux = Number(montoPagar);
    aux += Number(montoPuntos);
    setMontoPagar(aux);

    let cont = contDiccionario;
    let diccionario = diccionarioPago;
    diccionario[cont] = {
      tipo_metodo: "canje",
      cantidad: cantidadPuntos,
      cambio: montoPuntos,
    };
    cont++;
    setContadorDiccionario(cont);
    setDiccionarioPago(diccionario);
  };

  React.useEffect(() => {
    const hoy = new Date();

    if (hoy.getMonth() + 1 >= 10) {
      const fecha = hoy.getFullYear() + "-" + (hoy.getMonth() + 1);
      setFechaActual(fecha);
      if (hoy.getDate() >= 10) {
        const dia =
          hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
        setFechaActualDia(dia);
      } else {
        const dia =
          hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-0" + hoy.getDate();
        setFechaActualDia(dia);
      }
    } else {
      const fecha = hoy.getFullYear() + "-0" + (hoy.getMonth() + 1);
      setFechaActual(fecha);
      if (hoy.getDate() >= 10) {
        const dia =
          hoy.getFullYear() + "-0" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
        setFechaActualDia(dia);
      } else {
        const dia =
          hoy.getFullYear() +
          "-0" +
          (hoy.getMonth() + 1) +
          "-0" +
          hoy.getDate();
        setFechaActualDia(dia);
      }
    }

    for (let index = 0; index < props.productos.length; index++) {
      fetchProducto(props.productos[index].fk_producto);
    }
  }, []);

  React.useEffect(() => {
    if (state.checkedNinguno === true) {
      setState({
        ...state,
        ["checkedEfectivo"]: false,
        ["checkedCredito"]: false,
        ["checkedDebito"]: false,
        ["checkedCheque"]: false,
        ["checkedPuntos"]: false,
      });
      setMontoPagar(0);
    }
  }, [state.checkedNinguno]);

  React.useEffect(() => {
    if (
      state.checkedEfectivo === true ||
      state.checkedCredito === true ||
      state.checkedDebito === true ||
      state.checkedCheque === true ||
      state.checkedPuntos === true
    ) {
      setState({ ...state, ["checkedNinguno"]: false });
    }
  }, [
    state.checkedEfectivo,
    state.checkedCredito,
    state.checkedDebito,
    state.checkedCheque,
    state.checkedPuntos,
  ]);

  React.useEffect(() => {
    if (stateMoneda.checkedBolivar === true) {
      setDisabledBolivar(false);
    } else {
      setDisabledBolivar(true);
    }

    if (stateMoneda.checkedDolar === true) {
      setDisabledDolar(false);
    } else {
      setDisabledDolar(true);
    }

    if (stateMoneda.checkedEuro === true) {
      setDisabledEuro(false);
    } else {
      setDisabledEuro(true);
    }
  }, [
    stateMoneda.checkedBolivar,
    stateMoneda.checkedDolar,
    stateMoneda.checkedEuro,
  ]);

  React.useEffect(() => {
    if (montoPagar !== Number(props.orden.monto_total)) {
      setDisabled(true);
      setTextoBoton("Se debe pagar el monto establecido");
    } else {
      setDisabled(false);
      setTextoBoton("Pagar");
    }
  }, [montoPagar]);

  // console.log("numero credito: " + numCredito);
  // console.log("numero debito: " + numDebito);
  // console.log("fecha credito " + fechaCredito);
  // console.log("fecha debito: " + fechaDebito);
  // console.log("nombre credito: " + nombreCredito);
  // console.log("nombre debito: " + nombreDebito);
  console.log("-----------------");
  //console.log(fecha());
  console.log(props.orden.monto_total);
  console.log(montoPagar);
  // console.log(props.productos);
  // console.log(productos);
  console.log(JSON.stringify(diccionarioPago));

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irPerfil}>
        <Typography variant="h5">Perfil</Typography>
      </Button>
      <Typography variant="h3" className="m-4">
        <b>Órden</b>
      </Typography>
      <Typography variant="h5" className="m-4">
        Productos en la Órden
      </Typography>
      <List className={classes.lista}>
        {productos.map((producto, value) => (
          <ListItem divider>
            <ListItemText
              primary={producto.nombre}
              secondary={"Cantidad: " + props.productos[value].cantidad}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" className={classes.monto}>
        <b>Monto total: {props.orden.monto_total} Bs.</b>
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
        <FormControlLabel
          className="m-2"
          control={
            <GreenCheckbox
              checked={state.checkedPuntos}
              onChange={handleCheckboxes}
              name="checkedPuntos"
            />
          }
          label="Puntos"
        />
        <Typography variant="subtitle1" className="m-2">
          Monto registrado: {montoPagar}.000 Bs.
        </Typography>
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
            <TextField
              margin="dense"
              fullWidth
              autoFocus
              label="Monto a pagar"
              type="number"
              variant="outlined"
              onChange={handleChangeMontoCredito}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={registrarCredito}>
              Agregar tarjeta
            </Button>
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
            <TextField
              margin="dense"
              fullWidth
              autoFocus
              label="Monto a pagar"
              type="number"
              variant="outlined"
              onChange={handleChangeMontoDebito}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={registrarDebito}>
              Agregar tarjeta
            </Button>
            <Button onClick={handleCloseDebito} color="primary" autoFocus>
              Volver
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openEfectivo}
          onClose={handleCloseEfectivo}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">Efectivo</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Información de pago
            </DialogContentText>
            <TextField
              margin="dense"
              fullWidth
              autoFocus
              label="Monto en Bs."
              type="number"
              variant="outlined"
              onChange={handleChangeMontoBolivar}
              disabled={disabledBolivar}
            />
            <TextField
              margin="dense"
              fullWidth
              autoFocus
              label="Monto en $"
              type="number"
              variant="outlined"
              onChange={handleChangeMontoDolar}
              disabled={disabledDolar}
            />
            <TextField
              margin="dense"
              fullWidth
              autoFocus
              label="Monto en €"
              type="number"
              variant="outlined"
              onChange={handleChangeMontoEuro}
              disabled={disabledEuro}
            />
            <FormControlLabel
              className="m-2"
              control={
                <GreenCheckbox
                  checked={stateMoneda.checkedEuro}
                  onChange={handleCheckBoxesMoneda}
                  name="checkedEuro"
                />
              }
              label="€"
            />
            <FormControlLabel
              className="m-2"
              control={
                <GreenCheckbox
                  checked={stateMoneda.checkedDolar}
                  onChange={handleCheckBoxesMoneda}
                  name="checkedDolar"
                />
              }
              label="$"
            />
            <FormControlLabel
              className="m-2"
              control={
                <GreenCheckbox
                  checked={stateMoneda.checkedBolivar}
                  onChange={handleCheckBoxesMoneda}
                  name="checkedBolivar"
                />
              }
              label="Bs."
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={registrarEfectivo}>
              Registrar pago
            </Button>
            <Button onClick={handleCloseEfectivo} color="primary" autoFocus>
              Volver
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openCheque}
          onClose={handleCloseCheque}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">Cheque</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Información de cheque
            </DialogContentText>
            <TextField
              margin="dense"
              fullWidth
              autoFocus
              label="Número de confirmación"
              type="number"
              variant="outlined"
              onChange={handleChangeNumConfirmacion}
            />
            <TextField
              margin="dense"
              fullWidth
              autoFocus
              label="Nombre de Banco"
              variant="outlined"
              onChange={handleChangeNombreBanco}
            />
            <TextField
              margin="dense"
              fullWidth
              autoFocus
              helperText="Fecha"
              type="date"
              InputProps={{ inputProps: { min: fechaActualDia } }}
              variant="outlined"
              onChange={handleChangeFechaCheque}
            />
            <TextField
              margin="dense"
              fullWidth
              autoFocus
              label="Monto"
              type="number"
              variant="outlined"
              onChange={handleChangeMontoCheque}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={registrarCheque}>
              Registrar pago
            </Button>
            <Button onClick={handleCloseCheque} color="primary" autoFocus>
              Volver
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openPuntos}
          onClose={handleClosePuntos}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">Puntos</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Pago por puntos
            </DialogContentText>
            <TextField
              margin="dense"
              fullWidth
              autoFocus
              label="Cantidad de puntos"
              type="number"
              variant="outlined"
              onChange={handleChangeCantidadPuntos}
            />
            <TextField
              margin="dense"
              fullWidth
              autoFocus
              label="Monto"
              type="number"
              variant="outlined"
              onChange={handleChangeMontoPuntos}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={registrarPuntos}>
              Registrar pago
            </Button>
            <Button onClick={handleClosePuntos} color="primary" autoFocus>
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
        {textoBoton}
      </Boton>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
