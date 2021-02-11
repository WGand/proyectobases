import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  search: {
    width: 350,
    margin: 10,
    marginLeft: 20,
  },
  root: {
    flexGrow: 1,
  },
  boton: {
    width: 140,
    height: 120,
    margin: 20,
  },
  textField: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
    width: 200,
  },
  desc: {
    marginLeft: 10,
    marginRight: 50,
    marginTop: 10,
    width: 100,
    height: 60,
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

export default function NotiMart() {
  const history = useHistory();
  const classes = useStyles();

  const [spacing, setSpacing] = React.useState(2);

  const [descuento, setDescuento] = React.useState("");
  const [numDescuento, setNumDescuento] = React.useState(0);

  const [todosProductos, setTodosProductos] = React.useState([]);
  const [productosFiltro, setProductosFiltro] = React.useState([]);
  const [productoSelec, setProductoSelec] = React.useState({});
  const [filtro, setFiltro] = React.useState("");

  const [disabled, setDisabled] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const irPerfil = () => {
    history.push("/perfil");
  };

  const handleChangeDescuento = (event) => {
    setDescuento(event.target.value);
  };

  const handleChangeFiltro = (event) => {
    setFiltro(event.target.value);
  };

  const handleClick = (index) => {
    setProductoSelec(productosFiltro[index]);
  };

  const fetchProductos = async () => {
    await axios({
      method: "get",
      url: "https://proyectobases1.herokuapp.com/producto",
    }).then((response) => {
      setTodosProductos(response.data);
      setProductosFiltro(response.data);
    });
  };

  const enviarDescuento = async () => {
    setOpenBackdrop(true);
    let diccionario = {
      0: {
        id: productoSelec.id,
      },
    };
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/descuento",
      data: {
        producto: JSON.stringify(diccionario),
        descuento: numDescuento,
      },
    }).then((response) => {
      console.log(response);
    });
    setOpenBackdrop(false);
  };

  React.useEffect(() => {
    fetchProductos();
  }, []);

  React.useEffect(() => {
    switch (descuento) {
      case "":
        setNumDescuento(5);
        break;
      case 1:
        setNumDescuento(10);
        break;
      case 2:
        setNumDescuento(20);
        break;
      case 3:
        setNumDescuento(50);
        break;

      default:
        break;
    }
  }, [descuento]);

  React.useEffect(() => {
    if (filtro === "") {
      setProductosFiltro(todosProductos);
    } else {
      let aux = todosProductos.filter((producto, value) =>
        producto.nombre.toLowerCase().includes(filtro)
      );
      setProductosFiltro(aux);
    }
  }, [filtro]);

  React.useEffect(() => {
    if (Object.keys(productoSelec).length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [productoSelec]);

  console.log(productoSelec);

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irPerfil}>
        <Typography variant="h5">Responsabilidades</Typography>
      </Button>
      <div style={{ display: "flex" }}>
        <Typography variant="h4" className="m-3">
          <b>NotiMart</b>
        </Typography>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          className={classes.search}
          variant="outlined"
          type="search"
          placeholder="Buscar producto..."
          onChange={handleChangeFiltro}
        />
      </div>
      <Typography variant="h5" className="m-4">
        Seleccionar Productos:
      </Typography>
      <Grid container className={classes.root} spacing={5}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {productosFiltro.map((producto, value) => (
              <Grid key={value} item>
                <Button
                  variant="outlined"
                  className={classes.boton}
                  onClick={handleClick.bind(null, value)}
                >
                  {producto.nombre}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h5" className="m-4">
        <b>Producto Seleccionado: {productoSelec.nombre}</b>
      </Typography>
      <div style={{ display: "flex" }}>
        <Typography variant="h6" className="m-4">
          {" "}
          Descuento:
        </Typography>
        <Select
          value={descuento}
          onChange={handleChangeDescuento}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className={classes.desc}
          variant="outlined"
        >
          <MenuItem value="">5%</MenuItem>
          <MenuItem value={1}>10%</MenuItem>
          <MenuItem value={2}>20%</MenuItem>
          <MenuItem value={3}>50%</MenuItem>
        </Select>
        <Boton
          variant="contained"
          className="m-4"
          color="primary"
          disabled={disabled}
          onClick={enviarDescuento}
        >
          Generar Descuento
        </Boton>
      </div>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
