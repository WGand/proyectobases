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

export default function ControlProducto() {
  const history = useHistory();
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  const irPerfil = () => {
    history.push("/perfil");
  };

  const irProductoRegistrar = () => {
    history.push("/perfil/controlproducto/registrar");
  };

  const irProductoModificar = () => {
    history.push("/perfil/controlproducto/modificar");
  };

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irPerfil}>
        <Typography variant="h5">Responsabilidades</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Control de Productos</b>
      </Typography>
      <Grid container className={classes.root} spacing={5}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irProductoModificar}
            >
              Modificar o Eliminar Productos
            </Button>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={irProductoRegistrar}
            >
              Registrar Producto
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
