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
import { makeStyles, withStyles } from "@material-ui/core/styles";
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

  const [state, setState] = React.useState({
    checkedNinguno: true,
    checkedEfectivo: false,
    checkedDebito: false,
    checkedCredito: false,
    checkedCheque: false,
  });

  const [openCredito, setOpenCredito] = React.useState(false);
  const [openDebito, setOpenDebito] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  // const [fechaActual, setFechaActual] = React.useState("");
  // const [numCredito, setNumCredito] = React.useState("");
  // const [numDebito, setNumDebito] = React.useState("");
  // const [fechaCredito, setFechaCredito] = React.useState("");
  // const [fechaDebito, setFechaDebito] = React.useState("");
  // const [nombreCredito, setNombreCredito] = React.useState("");
  // const [nombreDebito, setNombreDebito] = React.useState("");

  const [carrito, setCarrito] = React.useState([]);
  const [diccionarioCarrito, setDiccionarioCarrito] = React.useState({});

  const handleCheckboxes = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  // const handleCloseCredito = () => {
  //   setState({ ...state, ["checkedCredito"]: false });
  //   setOpenCredito(false);
  // };

  // const handleCloseDebito = () => {
  //   setState({ ...state, ["checkedDebito"]: false });
  //   setOpenDebito(false);
  // };

  // const handleChangeNumCredito = (event) => {
  //   setNumCredito(event.target.value);
  // };

  // const handleChangeNumDebito = (event) => {
  //   setNumDebito(event.target.value);
  // };

  // const handleChangeFechaCredito = (event) => {
  //   setFechaCredito(event.target.value);
  // };

  // const handleChangeFechaDebito = (event) => {
  //   setFechaDebito(event.target.value);
  // };

  // const handleChangeNombreCredito = (event) => {
  //   setNombreCredito(event.target.value);
  // };

  // const handleChangeNombreDebito = (event) => {
  //   setNombreDebito(event.target.value);
  // };

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

  const agregarOrden = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/orden",
      data: {
        producto: diccionarioCarrito,
        rif: props.datos[0].rif,
        fecha: fecha(),
        monto_total: props.total,
        tipo: props.tipo,
      },
    }).then((response) => {
      console.log(response);
    });
    setOpenBackdrop(false);
    localStorage.setItem("carrito", JSON.stringify([]));
  };

  const actualizarOrden = async () => {
    await axios({
      method: "put",
      url: "https://proyectobases1.herokuapp.com/orden",
      data: {
        producto: diccionarioCarrito,
        rif: props.datos[0].rif,
        fecha: fecha(),
        monto_total: props.total,
        tipo: props.tipo,
      },
    });
  };

  React.useEffect(() => {
    setCarrito(JSON.parse(localStorage.getItem("carrito")));
    // const hoy = new Date();
    // if (hoy.getMonth() + 1 >= 10) {
    //   const fecha = hoy.getFullYear() + "-" + (hoy.getMonth() + 1); mes actual para tarjeta
    //   setFechaActual(fecha);
    // } else {
    //   const fecha = hoy.getFullYear() + "-0" + (hoy.getMonth() + 1);
    //   setFechaActual(fecha);
    // }
  }, []);

  React.useEffect(() => {
    let aux = {};
    for (let index = 0; index < carrito.length; index++) {
      aux[index] = {
        id: carrito[index].id,
        cantidad: carrito[index].cantidad,
      };
    }
    setDiccionarioCarrito(JSON.stringify(aux));
  }, [carrito]);

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
      setState({
        ...state,
        ["checkedEfectivo"]: false,
        ["checkedCredito"]: false,
        ["checkedDebito"]: false,
        ["checkedCheque"]: false,
      });
    } else {
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

  // console.log("numero credito: " + numCredito);
  // console.log("numero debito: " + numDebito);
  // console.log("fecha credito " + fechaCredito);
  // console.log("fecha debito: " + fechaDebito);
  // console.log("nombre credito: " + nombreCredito);
  // console.log("nombre debito: " + nombreDebito);
  console.log(carrito);
  console.log("-----------------");
  console.log(props.total);
  console.log(props.tipo);
  console.log(props.datos[0].rif);
  console.log(diccionarioCarrito);
  console.log(fecha());

  return (
    <React.Fragment>
      <Typography variant="h3" className="m-4">
        <b>Factura</b>
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
        {/* <Dialog
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
        </Dialog> */}
        {/* <Dialog
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
        </Dialog> */}
      </div>
      <Boton
        variant="contained"
        className="m-4"
        color="primary"
        onClick={agregarOrden}
      >
        Registrar Orden
      </Boton>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
