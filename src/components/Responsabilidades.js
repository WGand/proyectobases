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

export default function Responsabilidades(props) {
  const history = useHistory();

  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  const [disabledNotimart, setDisabledNotimart] = React.useState(true);
  const [disabledReportes, setDisabledReportes] = React.useState(true);
  const [disabledControlUsuario, setDisabledControlUsuario] = React.useState(
    true
  );
  const [
    disabledReposicionInventario,
    setDisabledReposicionInventario,
  ] = React.useState(true);
  const [disabledProcesarPedidos, setDisabledProcesarPedidos] = React.useState(
    true
  );
  const [
    disabledControlProveedor,
    setDisabledControlProveedor,
  ] = React.useState(true);
  const [disabledControlEmpleado, setDisabledControlEmpleado] = React.useState(
    true
  );
  const [disabledControlTienda, setDisabledControlTienda] = React.useState(
    true
  );
  const [
    disabledControlProductos,
    setDisabledControlProductos,
  ] = React.useState(true);
  const [disabledCajero, setDisabledCajero] = React.useState(true);
  const [disabledPasillo, setDisabledPasillo] = React.useState(true);

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

  const irPasillo = () => {
    history.push("/perfil/pasillo");
  };

  React.useEffect(() => {
    props.cargos.forEach((cargo, value) => {
      switch (cargo.fk_cargo) {
        case 1:
          setDisabledPasillo(false);
          break;
        case 2:
          setDisabledCajero(false);
          break;
        case 3:
          setDisabledNotimart(false);
          break;
        case 4:
          setDisabledReportes(false);
          setDisabledReposicionInventario(false);
          break;
        case 5:
          setDisabledReportes(false);
          setDisabledControlEmpleado(false);
          break;
        case 8:
          setDisabledControlUsuario(false);
          setDisabledProcesarPedidos(false);
          setDisabledControlProveedor(false);
          setDisabledControlTienda(false);
          break;

        default:
          break;
      }
    });
  }, []);

  console.log(props.cargos);

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
              disabled={disabledNotimart}
            >
              NotiMart
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irReportes}
              disabled={disabledReportes}
            >
              Reportes
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irControlUsuario}
              disabled={disabledControlUsuario}
            >
              Control de Usuario
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irReposicion}
              disabled={disabledReposicionInventario}
            >
              Reposición de Inventario
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irProcesarPedidos}
              disabled={disabledProcesarPedidos}
            >
              Procesar Pedidos
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irControlProveedor}
              disabled={disabledControlProveedor}
            >
              Control de Proveedor
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irControlEmpleado}
              disabled={disabledControlEmpleado}
            >
              Control de Empleado
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irControlTienda}
              disabled={disabledControlTienda}
            >
              Control de Tienda
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irControlProducto}
              disabled={disabledControlProductos}
            >
              Control de Productos
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irCajero}
              disabled={disabledCajero}
            >
              Sistema de Cajero
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irPasillo}
              disabled={disabledPasillo}
            >
              Reposición de Pasillo
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
