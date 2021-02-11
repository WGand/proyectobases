import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 30,
    width: 600,
  },
  campo: {
    width: 300,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Pasillo() {
  const history = useHistory();
  const classes = useStyles();

  const [datosInventario, setDatosInventario] = React.useState([]);
  const [producto, setProducto] = React.useState({});
  const [cantidad, setCantidad] = React.useState("");
  const [error, setError] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [label, setLabel] = React.useState("");

  const [tiendas, setTiendas] = React.useState([]);
  const [tienda, setTienda] = React.useState("");
  const [tiendaSelec, setTiendaSelec] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const handleChangeTienda = (event) => {
    setTienda(event.target.value);
  };

  const handleClickOpen = (index) => {
    setProducto(datosInventario[index]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeCantidad = (event) => {
    setCantidad(event.target.value);
  };

  const irPerfil = () => {
    history.push("/perfil");
  };

  const datosPasillo = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/reposicionInventarioPasillo",
      data: {
        tienda_id: tiendaSelec,
      },
    }).then((response) => {
      setDatosInventario(response.data);
    });
  };

  const datosTiendas = async () => {
    await axios({
      method: "get",
      url: "https://proyectobases1.herokuapp.com/inventario",
    }).then((response) => {
      setTiendas(response.data);
    });
  };

  const enviarModificacion = async () => {
    setOpenBackdrop(true);
    setOpen(false);
    let cambio = {
      0: {
        id: producto.id,
        cantidad: cantidad,
      },
    };
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/reponerInventarioPasillo",
      data: {
        tienda_id: tiendaSelec,
        inventario: JSON.stringify(cambio),
      },
    }).then((response) => {
      console.log(response);
    });
    setOpenBackdrop(false);
  };

  React.useEffect(() => {
    datosTiendas();
  }, []);

  React.useEffect(() => {
    if (tiendas[tienda]) {
      setTiendaSelec(tiendas[tienda].tienda_id);
    }
  }, [tienda]);

  React.useEffect(() => {
    datosPasillo();
  }, [tiendaSelec]);

  React.useEffect(() => {
    if (Number(cantidad) > Number(producto.almacen_cantidad)) {
      setDisabled(true);
      setError(true);
      setLabel("Cantidad no disponible en almacén");
    } else if (cantidad === "") {
      setLabel("Cantidad a agregar");
      setDisabled(true);
      setError(false);
    } else {
      setLabel("Cantidad disponible");
      setDisabled(false);
      setError(false);
    }
  }, [cantidad]);

  console.log(producto);

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irPerfil}>
        <Typography variant="h5">Responsabilidades</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Reposición de Pasillo</b>
      </Typography>
      <div class="m-4" style={{ display: "flex" }}>
        <Typography variant="h6" className="m-4">
          Tienda:
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
      </div>
      <Paper variant="outlined" className={classes.paper}>
        <Typography variant="subtitle1" className="m-3">
          Productos a Reponer
        </Typography>
        <List>
          {datosInventario.map((producto, value) => (
            <ListItem>
              <ListItemText
                primary={producto.producto}
                secondary={
                  "Cantidad en pasillo: " +
                  producto.pasillo_cantidad +
                  " | Cantidad en almacén: " +
                  producto.almacen_cantidad
                }
              />
              <IconButton onClick={handleClickOpen.bind(null, value)}>
                <AddIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{producto.producto}</DialogTitle>
        <DialogContent>
          <DialogContentText>Reponer producto en pasillo</DialogContentText>
          <TextField
            variant="outlined"
            margin="dense"
            type="number"
            label={label}
            error={error}
            onChange={handleChangeCantidad}
            helperText={"Cantidad en almacén: " + producto.almacen_cantidad}
            className={classes.campo}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            disabled={disabled}
            onClick={enviarModificacion}
          >
            Reponer
          </Button>
          <Button color="primary" onClick={handleClose}>
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
