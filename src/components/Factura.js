import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
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
  helper: {
    marginLeft: 20,
    marginTop: 30,
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

export default function Factura(props) {
  const classes = useStyles();

  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [carrito, setCarrito] = React.useState([]);
  const [diccionarioCarrito, setDiccionarioCarrito] = React.useState({});
  const [tiendas, setTiendas] = React.useState([]);
  const [tienda, setTienda] = React.useState("");
  const [tiendaSelec, setTiendaSelec] = React.useState(0);
  const [inventario, setInventario] = React.useState([]);

  const [disabled, setDisabled] = React.useState(false);
  const [labelTienda, setLabelTienda] = React.useState("");

  const handleChangeTienda = (event) => {
    setTienda(event.target.value);
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

  const agregarOrden = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/orden",
      data: {
        producto: diccionarioCarrito,
        tienda_id: tiendaSelec,
        tipo_compra: "en linea",
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

  const datosTiendas = async () => {
    await axios({
      method: "get",
      url: "https://proyectobases1.herokuapp.com/inventario",
    }).then((response) => {
      setTiendas(response.data);
    });
  };

  const inventarioTiendas = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/inventario",
      data: {
        tienda_id: tiendaSelec,
        tipo: "en linea",
      },
    }).then((response) => {
      setInventario(response.data);
    });
  };

  React.useEffect(() => {
    setCarrito(JSON.parse(localStorage.getItem("carrito")));
    datosTiendas();
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
    if (tiendas[tienda]) {
      setTiendaSelec(tiendas[tienda].tienda_id);
    }
  }, [tienda]);

  React.useEffect(() => {
    inventarioTiendas();
  }, [tiendaSelec]);

  React.useEffect(() => {
    let cont = 0;
    carrito.forEach((producto, index) => {
      for (let j = 0; j < inventario.length; j++) {
        if (producto.id === inventario[j].producto_id) {
          if (producto.cantidad > inventario[j].cantidad_almacen) {
            cont++;
          }
        }
      }
    });
    if (cont !== 0) {
      setDisabled(true);
      setLabelTienda("Inventario insuficiente");
    } else {
      setDisabled(false);
      setLabelTienda("Inventario disponible");
    }
  }, [inventario]);

  console.log(carrito);
  console.log("-----------------");
  console.log(props.total);
  console.log(props.tipo);
  console.log(props.datos[0].rif);
  console.log(diccionarioCarrito);
  console.log(fecha());
  console.log(inventario);
  console.log(tiendaSelec);

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
      <div class="m-4" style={{ display: "flex" }}>
        <Typography variant="h6" className="m-4">
          Tienda donde se procesará la órden:
        </Typography>
        <Select
          value={tienda}
          onChange={handleChangeTienda}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          variant="outlined"
        >
          {tiendas.map((tienda, value) => (
            <MenuItem value={value}>{tienda.nombre}</MenuItem>
          ))}
        </Select>
        <FormHelperText className={classes.helper}>
          {labelTienda}
        </FormHelperText>
      </div>
      <Boton
        variant="contained"
        className="m-4"
        color="primary"
        onClick={agregarOrden}
        disabled={disabled}
      >
        Registrar Orden
      </Boton>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
