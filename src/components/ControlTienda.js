import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

export default function ControlTienda() {
  const history = useHistory();
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  const irPerfil = () => {
    history.push("/perfil");
  };

  const irTiendaRegistrar = () => {
    history.push("/perfil/controltienda/registrar");
  };

  const irTiendaModificar = () => {
    history.push("/perfil/controltienda/modificar");
  };

  const irTiendaInventario = () => {
    history.push("/perfil/controltienda/inventario");
  };

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irPerfil}>
        <Typography variant="h5">Responsabilidades</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Control de Tienda</b>
      </Typography>
      <Grid container className={classes.root} spacing={5}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irTiendaModificar}
            >
              Modificar o Eliminar Tiendas
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irTiendaRegistrar}
            >
              Registrar Tienda
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irTiendaInventario}
            >
              Ver Inventario de Tienda
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
