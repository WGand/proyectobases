import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  campo: {
    width: 500,
    maxWidth: 500,
    marginLeft: 100,
  },
  campoImagen: {
    width: 700,
    maxWidth: 700,
    marginLeft: 100,
  },
  prov: {
    marginLeft: 50,
    marginRight: 40,
    width: 300,
  },
  precio: {
    marginLeft: 20,
    width: 70,
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

export default function ModificacionProducto(props) {
  const history = useHistory();
  const classes = useStyles();

  const [categoria, setCategoria] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [imagen, setImagen] = React.useState("");
  const [precio, setPrecio] = React.useState(0);

  const [labelNombre, setLabelNombre] = React.useState("");
  const [labelImagen, setLabelImagen] = React.useState("");
  const [labelPrecio, setLabelPrecio] = React.useState("");

  const [categoriaSelec, setCategoriaSelec] = React.useState("");

  const [disabled, setDisabled] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const irControlProducto = () => {
    history.push("/perfil/controlproducto/modificar");
  };

  const modificarProducto = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "put",
      url: "https://proyectobases1.herokuapp.com/producto",
      data: {
        producto_id: props.producto.id,
        imagen: imagen,
        nombre: nombre,
        precio: precio,
        ucabmart: null,
        categoria: categoriaSelec,
      },
    }).then((response) => {
      console.log(response.data);
    });
    setOpenBackdrop(false);
  };

  const handleChangeCategoria = (event) => {
    setCategoria(event.target.value);
  };

  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleChangeImagen = (event) => {
    setImagen(event.target.value);
  };

  const handleChangePrecio = (event) => {
    setPrecio(event.target.value);
  };

  React.useEffect(() => {
    setLabelNombre(props.producto.nombre);
    setNombre(props.producto.nombre);
    setLabelImagen(props.producto.imagen);
    setImagen(props.producto.imagen);
    setLabelPrecio(props.producto.precio);
    setPrecio(props.producto.precio);
    switch (props.producto.categoria) {
      case "FRUTAS Y VEGETALES":
        setCategoria("");
        break;
      case "VIVERES":
        setCategoria(1);
        break;
      case "REFRIGERADOS Y CONGELADOS":
        setCategoria(2);
        break;
      case "CUIDADO PERSONAL Y SALUD":
        setCategoria(3);
        break;
      case "LIMPIEZA":
        setCategoria(4);
        break;
      case "HOGAR Y TEMPORADA":
        setCategoria(5);
        break;
      case "MASCOTAS":
        setCategoria(6);
        break;
      case "LICORES":
        setCategoria(7);
        break;
      case "VEHICULOS":
        setCategoria(8);
        break;
      case "OFICINA Y TECNOLOGIA":
        setCategoria(9);
        break;

      default:
        break;
    }
  }, []);

  React.useEffect(() => {
    switch (categoria) {
      case "":
        setCategoriaSelec("FRUTAS Y VEGETALES");
        break;
      case 1:
        setCategoriaSelec("VIVERES");
        break;
      case 2:
        setCategoriaSelec("REFRIGERADOS Y CONGELADOS");
        break;
      case 3:
        setCategoriaSelec("CUIDADO PERSONAL Y SALUD");
        break;
      case 4:
        setCategoriaSelec("LIMPIEZA");
        break;
      case 5:
        setCategoriaSelec("HOGAR Y TEMPORADA");
        break;
      case 6:
        setCategoriaSelec("MASCOTAS");
        break;
      case 7:
        setCategoriaSelec("LICORES");
        break;
      case 8:
        setCategoriaSelec("VEHICULOS");
        break;
      case 9:
        setCategoriaSelec("OFICINA Y TECNOLOGIA");
        break;

      default:
        break;
    }
  }, [categoria]);

  React.useEffect(() => {
    if (nombre === "" || precio === "" || imagen === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  });

  React.useEffect(() => {
    if (nombre === "") {
      setNombre(labelNombre);
    }
  }, [nombre]);

  React.useEffect(() => {
    if (imagen === "") {
      setImagen(labelImagen);
    }
  }, [imagen]);

  React.useEffect(() => {
    if (precio === "") {
      setPrecio(labelPrecio);
    }
  }, [precio]);

  console.log(props.producto.id);
  console.log(nombre);
  console.log(imagen);
  console.log(precio);
  console.log(categoriaSelec);

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irControlProducto}>
        <Typography variant="h5">
          Control de Producto: Modificar o Eliminar
        </Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Modificar Producto</b>
      </Typography>
      <div style={{ display: "flex" }} className="m-4">
        <Typography variant="h6" className="m-2">
          Nombre:
        </Typography>
        <TextField
          id="outlined-nombre"
          label={labelNombre}
          variant="outlined"
          className={classes.campo}
          onChange={handleChangeNombre}
        />
      </div>
      <div style={{ display: "flex" }} className="m-4">
        <Typography variant="h6" className="m-2">
          Imágen:
        </Typography>
        <TextField
          id="outlined-desc"
          label={labelImagen}
          variant="outlined"
          className={classes.campoImagen}
          type="url"
          onChange={handleChangeImagen}
        />
      </div>
      <div style={{ display: "flex" }} className="m-4">
        <Typography variant="h6" className="m-2">
          Categoría:
        </Typography>
        <Select
          value={categoria}
          onChange={handleChangeCategoria}
          displayEmpty
          className={classes.prov}
          inputProps={{ "aria-label": "Without label" }}
          variant="outlined"
        >
          <MenuItem value={""}>Frutas y Vegetales</MenuItem>
          <MenuItem value={1}>Víveres</MenuItem>
          <MenuItem value={2}>Refrigerados y Congelados</MenuItem>
          <MenuItem value={3}>Cuidado Personal y Salud</MenuItem>
          <MenuItem value={4}>Limpieza</MenuItem>
          <MenuItem value={5}>Hogar y Temporada</MenuItem>
          <MenuItem value={6}>Mascotas</MenuItem>
          <MenuItem value={7}>Licores</MenuItem>
          <MenuItem value={8}>Vehículos</MenuItem>
          <MenuItem value={9}>Oficina y Tecnología</MenuItem>
        </Select>
      </div>
      <div style={{ display: "flex" }} className="m-4">
        <Typography variant="h6" className="m-2">
          Precio:
        </Typography>
        <TextField
          id="outlined-precio"
          label={labelPrecio}
          variant="outlined"
          type="number"
          className={classes.campo}
          onChange={handleChangePrecio}
        />
      </div>
      <Boton
        variant="contained"
        className="m-4"
        color="primary"
        disabled={disabled}
        onClick={modificarProducto}
      >
        Modificar Producto
      </Boton>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
