import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  busqueda: {
    margin: 30,
    width: 400,
  },
  lista: {
    width: 600,
    margin: 20,
  },
  paper: {
    height: 450,
    maxHeight: 450,
    overflow: "auto",
    width: 650,
    margin: 10,
  },
  total: {
    margin: 30,
    marginLeft: 600,
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

export default function Cajero() {
  const history = useHistory();
  const classes = useStyles();

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

  const [busqueda, setBusqueda] = React.useState("");
  const [total, setTotal] = React.useState(0);

  const [todosProductos, setTodosProductos] = React.useState([]);
  const [productosFiltro, setProductosFiltro] = React.useState([]);
  const [productosAgregados, setProductosAgregados] = React.useState([]);
  const [productosCantidad, setProductosCantidad] = React.useState([]);
  const [diccionarioProductos, setDiccionarioProductos] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openPago, setOpenPago] = React.useState(false);

  const [rif, setRif] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [tipoPersona, setTipoPersona] = React.useState("");

  const [disabledRif, setDisabledRif] = React.useState(false);
  const [disabledRegistrar, setDisabledRegistrar] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [textoBoton, setTextoBoton] = React.useState("");

  const [openCredito, setOpenCredito] = React.useState(false);
  const [openDebito, setOpenDebito] = React.useState(false);
  const [openEfectivo, setOpenEfectivo] = React.useState(false);
  const [openCheque, setOpenCheque] = React.useState(false);
  const [openPuntos, setOpenPuntos] = React.useState(false);

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
  const [montoPagar, setMontoPagar] = React.useState(0);
  const [errorDolar, setErrorDolar] = React.useState(false);
  const [errorEuro, setErrorEuro] = React.useState(false);
  const [disabledEfectivo, setDisabledEfectivo] = React.useState(false);

  const [numConfirmacion, setNumConfirmacion] = React.useState("");
  const [nombreBanco, setNombreBanco] = React.useState("");
  const [montoCheque, setMontoCheque] = React.useState(0);

  const [cantidadPuntos, setCantidadPuntos] = React.useState(0);
  const [montoPuntos, setMontoPuntos] = React.useState(0);
  const [errorPunto, setErrorPunto] = React.useState(false);
  const [disabledPuntos, setDisabledPuntos] = React.useState(false);

  const [cambioDolar, setCambioDolar] = React.useState([]);
  const [valorDolar, setValorDolar] = React.useState(0);
  const [cambioEuro, setCambioEuro] = React.useState([]);
  const [valorEuro, setValorEuro] = React.useState(0);
  const [cambioPunto, setCambioPunto] = React.useState([]);
  const [valorPunto, setValorPunto] = React.useState(0);

  const [disabledBolivar, setDisabledBolivar] = React.useState(false);
  const [disabledDolar, setDisabledDolar] = React.useState(false);
  const [disabledEuro, setDisabledEuro] = React.useState(false);

  const [fechaActual, setFechaActual] = React.useState("");

  const [contDiccionario, setContadorDiccionario] = React.useState(0);
  const [diccionarioPago, setDiccionarioPago] = React.useState({});
  const [operacionId, setOperacionId] = React.useState(0);

  const handleChangeBusqueda = (event) => {
    setBusqueda(event.target.value);
  };

  const handleEliminar = (id) => {
    let aux = productosAgregados.filter((producto, value) => value !== id);
    setProductosAgregados(aux);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClosePago = () => {
    setOpen(false);
  };

  const handleChangeRif = (event) => {
    setRif(event.target.value);
  };
  const handleChangeTipo = (event) => {
    setTipoPersona(event.target.value);
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

  const handleChangeMontoCheque = (event) => {
    setMontoCheque(event.target.value);
  };

  const handleChangeCantidadPuntos = (event) => {
    setCantidadPuntos(event.target.value);
  };

  const handleChangeMontoPuntos = (event) => {
    setMontoPuntos(event.target.value);
  };

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

  const agregarProducto = (producto) => {
    setProductosAgregados((productos) => [...productos, producto]);
  };

  const irPerfil = () => {
    history.push("/perfil");
  };

  const fetchProductos = async () => {
    await axios({
      method: "get",
      url: "https://proyectobases1.herokuapp.com/producto",
    }).then((response) => {
      setTodosProductos(response.data);
    });
  };

  const fetchCambioDolar = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/cambiodivisa",
      data: {
        tipo: "dolar",
      },
    }).then((response) => {
      setCambioDolar(response.data);
    });
  };

  const fetchCambioEuro = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/cambiodivisa",
      data: {
        tipo: "euro",
      },
    }).then((response) => {
      setCambioEuro(response.data);
    });
  };

  const fetchCambioPunto = async () => {
    await axios({
      method: "get",
      url: "https://proyectobases1.herokuapp.com/cambiopunto",
    }).then((response) => {
      setCambioPunto(response.data);
    });
  };

  const fetchOperacion = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/cajero",
      data: {
        rif: rif,
        tipo: tipo,
      },
    }).then((response) => {
      setOperacionId(response.data);
    });
  };

  const registrarRif = async () => {
    setOpenBackdrop(true);
    setOpen(false);
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/orden",
      data: {
        producto: diccionarioProductos,
        rif: rif,
        fecha: fecha(),
        monto_total: total,
        tipo: tipo,
      },
    }).then((response) => {
      console.log(response);
    });
    setOpenBackdrop(false);
    setOpenPago(true);
  };

  const registrarPago = async () => {
    let diccionario = JSON.stringify(diccionarioPago);
    setOpenBackdrop(true);
    await axios({
      method: "put",
      url: "https://proyectobases1.herokuapp.com/orden",
      data: {
        operacion_id: operacionId.operacion_id,
        rif: rif,
        tipo: tipo,
        estatus: "Recibido",
        metodo: diccionario,
      },
    }).then((response) => {
      console.log(response.data);
    });
    setOpenBackdrop(false);
    setOpenPago(false);
    setProductosAgregados([]);
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

  const calcularCantidad = () => {
    let aux = productosAgregados;

    for (let index = 0; index < productosAgregados.length; index++) {
      let cont = 0;
      for (let j = 0; j < productosAgregados.length; j++) {
        if (productosAgregados[index].id === productosAgregados[j].id) {
          cont++;
        }
      }
      aux[index].cantidad = cont;
    }
    setProductosCantidad(aux);
  };

  const limpiarLista = () => {
    let aux = [...new Set(productosCantidad)];
    let lista = {};
    for (let index = 0; index < aux.length; index++) {
      lista[index] = {
        id: aux[index].id,
        cantidad: aux[index].cantidad,
      };
    }
    setDiccionarioProductos(JSON.stringify(lista));
  };

  const registrarCredito = () => {
    setOpenCredito(false);
    let aux = Number(montoPagar);
    aux += Number(montoCredito);
    setMontoPagar(aux);

    let cont = contDiccionario;
    let diccionario = diccionarioPago;
    let mes = fechaCredito.split("-")[1];
    let año = fechaCredito.split("-")[0];
    diccionario[cont] = {
      tipo_metodo: "tarjeta",
      numero_tarjeta: numCredito,
      mes_caducidad: mes,
      anho_caducidad: año,
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
    let mes = fechaDebito.split("-")[1];
    let año = fechaDebito.split("-")[0];
    diccionario[cont] = {
      tipo_metodo: "tarjeta",
      numero_tarjeta: numDebito,
      mes_caducidad: mes,
      anho_caducidad: año,
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

  const calcularMultiplo = (numero, multiplo) => {
    return multiplo % numero === 0;
  };

  React.useEffect(() => {
    fetchProductos();

    fetchCambioDolar();
    fetchCambioEuro();
    fetchCambioPunto();

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
    if (todosProductos[0]) {
      setProductosFiltro(todosProductos);
    }
  }, [todosProductos]);

  React.useEffect(() => {
    if (busqueda === "") {
      setProductosFiltro(todosProductos);
    } else {
      let aux = todosProductos.filter((producto, value) =>
        producto.nombre.toLowerCase().includes(busqueda)
      );
      setProductosFiltro(aux);
    }
  }, [busqueda]);

  React.useEffect(() => {
    let suma = 0;
    for (let index = 0; index < productosAgregados.length; index++) {
      suma += Number(productosAgregados[index].precio);
    }
    setTotal(suma);

    if (productosAgregados.length === 0) {
      setDisabledRegistrar(true);
    } else setDisabledRegistrar(false);

    calcularCantidad();
  }, [productosAgregados]);

  React.useEffect(() => {
    if (rif.length === 0) {
      setDisabledRif(true);
    } else setDisabledRif(false);
  }, [rif]);

  React.useEffect(() => {
    limpiarLista();
  }, [productosCantidad]);

  React.useEffect(() => {
    switch (tipoPersona) {
      case 1:
        setTipo("natural");
        break;
      case 2:
        setTipo("juridico");
        break;
      case 3:
        setTipo("empleado");
        break;
      default:
        break;
    }
  }, [tipoPersona]);

  React.useEffect(() => {
    if (cambioDolar[0]) {
      setValorDolar(Number(cambioDolar[0].valor));
    }
    if (cambioEuro[0]) {
      setValorEuro(Number(cambioEuro[0].valor));
    }
    if (cambioPunto[0]) {
      setValorPunto(Number(cambioPunto[0].reference_bolivares));
    }
  }, [cambioDolar, cambioEuro, cambioPunto]);

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
    if (calcularMultiplo(valorDolar, montoDolar) === true) {
      setErrorDolar(false);
      setDisabledEfectivo(false);
    } else {
      setErrorDolar(true);
      setDisabledEfectivo(true);
    }
  }, [montoDolar]);

  React.useEffect(() => {
    if (calcularMultiplo(valorEuro, montoEuro) === true) {
      setErrorEuro(false);
      setDisabledEfectivo(false);
    } else {
      setErrorEuro(true);
      setDisabledEfectivo(true);
    }
  }, [montoEuro]);

  React.useEffect(() => {
    if (calcularMultiplo(valorPunto, montoPuntos) === true) {
      setErrorPunto(false);
      setDisabledPuntos(false);
    } else {
      setErrorPunto(true);
      setDisabledPuntos(true);
    }
  }, [montoPuntos]);

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
    if (montoPagar !== Number(total)) {
      setDisabled(true);
      setTextoBoton("Se debe pagar el monto establecido");
    } else {
      setDisabled(false);
      setTextoBoton("Pagar");
    }
  }, [montoPagar]);

  React.useEffect(() => {
    if (openPago === true) {
      fetchOperacion();
    }
  }, [openPago]);

  console.log(diccionarioPago);
  console.log(rif);
  console.log(tipo);
  console.log(operacionId.operacion_id);

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irPerfil}>
        <Typography variant="h5">Responsabilidades</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Sistema de Cajero</b>
      </Typography>
      <div style={{ display: "flex" }}>
        <TextField
          variant="outlined"
          placeholder="Buscar productos..."
          type="search"
          className={classes.busqueda}
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleChangeBusqueda}
        />
        <Typography variant="h5" className={classes.total} align="right">
          Total: {total}.000 Bs.
        </Typography>
      </div>
      <div style={{ display: "flex" }}>
        <Paper variant="outlined" className={classes.paper}>
          <Typography variant="h6" className="m-4">
            <b>Productos</b>
          </Typography>
          <List className={classes.lista}>
            {productosFiltro.map((producto, value) => (
              <ListItem
                button
                divider
                onClick={agregarProducto.bind(null, producto)}
              >
                <ListItemText
                  primary={producto.nombre}
                  secondary={producto.categoria}
                />
                <Typography variant="caption">{producto.precio} Bs.</Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
        <Paper variant="outlined" className={classes.paper}>
          <Typography variant="h6" className="m-4">
            <b>Productos Agregados</b>
          </Typography>
          <List className={classes.lista}>
            {productosAgregados.map((producto, value) => (
              <ListItem divider>
                <ListItemText
                  primary={producto.nombre}
                  secondary={producto.categoria}
                />
                <Typography variant="caption">{producto.precio} Bs.</Typography>
                <IconButton onClick={handleEliminar.bind(null, value)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
      <Boton
        variant="contained"
        className="m-4"
        color="primary"
        onClick={handleClickOpen}
        disabled={disabledRegistrar}
      >
        Registrar Orden
      </Boton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Registrar Datos</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Datos del cliente
          </DialogContentText>
          <TextField
            margin="dense"
            fullWidth
            autoFocus
            label="Rif del cliente"
            type="number"
            variant="outlined"
            onChange={handleChangeRif}
          />
          <Select
            className="m-3"
            variant="outlined"
            value={tipoPersona}
            onChange={handleChangeTipo}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">Tipo de Persona</MenuItem>
            <MenuItem value={1}>Natural</MenuItem>
            <MenuItem value={2}>Jurídico</MenuItem>
            <MenuItem value={3}>Empleado</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={registrarRif} disabled={disabledRif}>
            Registrar Rif
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Volver
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openPago}
        onClose={handleClosePago}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Métodos de pago</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b>Monto a pagar: {total}.000 Bs.</b>
          </DialogContentText>
          <DialogContentText>
            Monto registrado: {montoPagar}.000 Bs.
          </DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={registrarPago} disabled={disabled}>
            {textoBoton}
          </Button>
        </DialogActions>
      </Dialog>
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
            error={errorDolar}
            helperText={"Referencia en Bs.: " + valorDolar}
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
            error={errorEuro}
            helperText={"Referencia en Bs.: " + valorEuro}
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
          <Button
            color="primary"
            onClick={registrarEfectivo}
            disabled={disabledEfectivo}
          >
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
            error={errorPunto}
            helperText={"Referencia en Bs.: " + valorPunto}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={registrarPuntos}
            disabled={disabledPuntos}
          >
            Registrar pago
          </Button>
          <Button onClick={handleClosePuntos} color="primary" autoFocus>
            Volver
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
