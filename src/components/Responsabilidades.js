import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(3),
  },
  boton: {
    width: 140,
    height: 120,
    margin: 20,
  },
}));

export default function Responsabilidades() {
  const history = useHistory();

  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  const irReposicion = () => {
    history.push("/perfil/reposicion");
  };

  const irProcesarPedidos = () => {
    history.push("/perfil/procesarpedidos");
  };

  const irReportes = () => {
    history.push("/perfil/reportes");
  };

  const irControlEmpleado = () => {
    history.push("/perfil/controlempleado");
  };

  const irControlUsuario = () => {
    history.push("/perfil/controlusuario");
  };

  const irControlProveedor = () => {
    history.push("/perfil/controlproveedor");
  };

  const irControlTienda = () => {
    history.push("/perfil/controltienda");
  };

  const irNotimart = () => {
    history.push("/perfil/notimart");
  };

  const irControlProducto = () => {
    history.push("/perfil/controlproducto");
  };

  const irCajero = () => {
    history.push("/perfil/cajero");
  };

  return (
    <React.Fragment>
      <Typography variant="h5">Responsabilidades</Typography>
      <Grid container className={classes.root} spacing={5}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irNotimart}
            >
              NotiMart
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irReportes}
            >
              Reportes
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irControlUsuario}
            >
              Control de Usuario
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irReposicion}
            >
              Reposición de Inventario
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irProcesarPedidos}
            >
              Procesar Pedidos
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irControlProveedor}
            >
              Control de Proveedor
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irControlEmpleado}
            >
              Control de Empleado
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irControlTienda}
            >
              Control de Tienda
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irControlProducto}
            >
              Control de Productos
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irCajero}
            >
              Sistema de Cajero
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
