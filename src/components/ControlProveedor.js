import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import TablaProveedores from "./TablaProveedores";
import TablaJuridico from "./TablaJuridico";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  search: {
    width: 350,
    margin: 30,
  },
  paper: {
    width: 600,
    margin: 30,
    marginTop: 60,
  },
  boton: {
    margin: 10,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  paperJuridico: {
    width: 1300,
    margin: 30,
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

export default function ControlProveedor() {
  const history = useHistory();
  const classes = useStyles();

  const [proveedor, setProveedor] = React.useState({});
  const [rubro, setRubro] = React.useState("");
  const [juridico, setJuridico] = React.useState({});
  const [rubroJuridico, setRubroJuridico] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [disabledJuridico, setDisabledJuridico] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const [labelRubro, setLabelRubro] = React.useState("");
  const [color, setColor] = React.useState("");

  const irPerfil = () => {
    history.push("/perfil");
  };

  const updateProveedor = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "put",
      url: "https://proyectobases1.herokuapp.com/proveedor",
      data: {
        rif: proveedor.rif,
        rubro: rubro,
      },
    }).then((response) => {
      console.log(response);
    });
    setOpenBackdrop(false);
  };

  const agregarProveedor = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/proveedor",
      data: {
        rif: juridico.rif,
        rubro: rubroJuridico,
      },
    }).then((response) => {
      console.log(response);
    });
    setOpenBackdrop(false);
  };

  const deleteProveedor = async () => {
    setOpen(false);
    setOpenBackdrop(true);
    await axios({
      method: "delete",
      url: "https://proyectobases1.herokuapp.com/proveedor",
      data: {
        rif: proveedor.rif,
      },
    }).then((response) => {
      console.log(response);
    });
    setOpen(false);
    setOpenBackdrop(false);
  };

  const conseguirProveedor = (datosProveedor) => {
    setProveedor(datosProveedor);
  };

  const conseguirJuridico = (datosJuridico) => {
    setJuridico(datosJuridico);
  };

  const handleClickopen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeRubro = (event) => {
    setRubro(event.target.value);
  };

  const handleChangeRubroJuridico = (event) => {
    setRubroJuridico(event.target.value);
  };

  React.useEffect(() => {
    if (Object.entries(proveedor).length !== 0) {
      setLabelRubro(proveedor.rubro);
      setRubro(proveedor.rubro);
      setDisabled(false);
      setColor("error");
    } else {
      setLabelRubro("Seleccione un proveedor");
      setRubro(null);
      setDisabled(true);
      setColor("disabled");
    }
  }, [proveedor, juridico]);

  React.useEffect(() => {
    if (rubro === "") {
      setRubro(proveedor.rubro);
    }
  }, [rubro]);

  React.useEffect(() => {
    if (rubroJuridico === "") {
      setDisabledJuridico(true);
    } else {
      setDisabledJuridico(false);
    }
  }, [rubroJuridico]);

  console.log(proveedor.rif);

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irPerfil}>
        <Typography variant="h5">Responsabilidades</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Control de Proveedor</b>
      </Typography>
      <Paper className={classes.paper} variant="outlined">
        <Typography variant="h5" className="m-4">
          Proveedores
        </Typography>
        <TablaProveedores proveedorSelec={conseguirProveedor} />
      </Paper>
      <div className="m-4" style={{ display: "flex" }}>
        <TextField
          label={labelRubro}
          variant="outlined"
          className="m-2"
          onChange={handleChangeRubro}
        />
        <Boton
          variant="contained"
          className="m-3"
          color="primary"
          onClick={updateProveedor}
          disabled={disabled}
        >
          Modificar Proveedor
        </Boton>
        <IconButton
          className={classes.boton}
          onClick={handleClickopen}
          disabled={disabled}
        >
          <RemoveCircleIcon color={color} />
        </IconButton>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Eliminar rubro</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Seguro que desea eliminar el rubro del proveedor seleccionado?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={deleteProveedor}>
            Si
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Paper className={classes.paperJuridico} variant="outlined">
        <Typography variant="h5" className="m-4">
          Jurídicos
        </Typography>
        <TablaJuridico juridicoSelec={conseguirJuridico} />
      </Paper>
      <TextField
        label="Rubro del proveedor"
        variant="outlined"
        className="m-2"
        onChange={handleChangeRubroJuridico}
      />
      <Boton
        variant="contained"
        className="m-3"
        color="primary"
        onClick={agregarProveedor}
        disabled={disabledJuridico}
      >
        Agregar Proveedor
      </Boton>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
