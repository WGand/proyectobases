import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";

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
            <Button variant="outlined" className={classes.boton}>
              Control de Nómina
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
      <Boton variant="contained" className="m-4" color="primary">
        Descargar Reporte
      </Boton>
    </React.Fragment>
  );
}
