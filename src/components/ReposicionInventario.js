import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 700,
    margin: 30,
  },
  check: {
    color: "#008332",
    marginLeft: 350,
  },
  x: {
    marginLeft: 350,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function ReposicionInventario(props) {
  const classes = useStyles();
  const history = useHistory();

  const [ordenes, setOrdenes] = React.useState([]);
  const [ordenSelec, setOrdenSelec] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const handleClickOpen = (index) => {
    setOrdenSelec(ordenes[index]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const irPerfil = () => {
    history.push("/perfil");
  };

  const datosTiendas = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/ordenesreposicioninventario",
      data: {
        rif: props.datos[0].rif,
      },
    }).then((response) => {
      setOrdenes(response.data);
    });
  };

  const aprobar = async () => {
    setOpenBackdrop(true);
    setOpen(false);
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/reponerinventarioalmacen",
      data: {
        operacion_id: ordenSelec.operacion_id,
      },
    }).then((response) => {
      console.log(response);
    });
    setOpenBackdrop(false);
  };

  React.useEffect(() => {
    datosTiendas();
  }, []);

  console.log(ordenSelec);

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irPerfil}>
        <Typography variant="h5">Responsabilidades</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Reposición de Inventario</b>
      </Typography>
      <Paper className={classes.paper} variant="outlined">
        <List>
          {ordenes.map((orden, value) => (
            <ListItem key={value}>
              <Link className="m-4">Orden {value + 1}</Link>
              <Typography variant="caption" className="m-4">
                Monto: {orden.monto_total}
              </Typography>
              <IconButton onClick={handleClickOpen.bind(null, value)}>
                <CancelIcon color="error" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>¿Aprobar órden?</DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={aprobar}>
            Aprobar Orden
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
