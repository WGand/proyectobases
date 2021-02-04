import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: 200,
  },
  paper: {
    width: 500,
  },
  paperOrden: {
    width: 200,
    margin: theme.spacing(3),
  },
}));

export default function PerfilOrdenes(props) {
  const classes = useStyles();

  const [datosOrdenes, setDatosOrdenes] = React.useState({});
  const [ordenes, setOrdenes] = React.useState([]);

  const getOrdenes = async () => {
    await axios({
      method: "post",
      url: "https://proyectobases1.herokuapp.com/todasordenes",
      data: {
        rif: props.datos[0].rif,
        tipo: props.tipo,
      },
    }).then((response) => {
      setDatosOrdenes(response.data);
    });
  };

  React.useEffect(() => {
    getOrdenes();
  }, []);

  React.useEffect(() => {
    if (!datosOrdenes["ordenes"]) {
      getOrdenes();
    } else {
      setOrdenes(datosOrdenes["ordenes"]);
    }
  }, [datosOrdenes]);

  console.log(ordenes);
  console.log(datosOrdenes);

  return (
    <React.Fragment>
      <Typography variant="h5">
        <b>Órdenes</b>
      </Typography>
      <Paper variant="outlined" className={classes.paper}>
        <Typography variant="h6" align="center" className="m-4">
          <b>Historial de Órdenes</b>
        </Typography>
        <form className={classes.container} noValidate>
          <TextField
            variant="outlined"
            id="date"
            label="Fecha"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <Typography variant="subtitle1" className="m-3">
          {" "}
          Órdenes{" "}
        </Typography>
        <Paper variant="outlined" className={classes.paperOrden}>
          <List>
            {ordenes.map((orden, value) => (
              <ListItem>
                <Link>Orden {value + 1}</Link>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Paper>
    </React.Fragment>
  );
}
