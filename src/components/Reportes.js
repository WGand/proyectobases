import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";

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

export default function Reportes() {
  const history = useHistory();
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  const irPerfil = () => {
    history.push("/perfil");
  };

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irPerfil}>
        <Typography variant="h5">Responsabilidades</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Reportes</b>
      </Typography>
      <Grid container className={classes.root} spacing={5}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Button
              variant="outlined"
              className={classes.boton}
              onClick={(event) => {
                event.preventDefault();
                window.open(
                  "https://proyectobases1.herokuapp.com/empleadohoras"
                );
              }}
              href="https://proyectobases1.herokuapp.com/empleadohoras"
            >
              Horas trabajadas
            </Button>
            <Button variant="outlined" className={classes.boton}>
              Productos más Vendidos
            </Button>
            <Button variant="outlined" className={classes.boton}>
              Productos menos vendidos
            </Button>
            <Button variant="outlined" className={classes.boton}>
              Ganancias
            </Button>
            <Button variant="outlined" className={classes.boton}>
              Empleados tardíos
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
