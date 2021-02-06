import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
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
    width: 600,
  },
  paperOrden: {
    width: 500,
    margin: theme.spacing(3),
  },
}));

export default function PerfilOrdenes(props) {
  const classes = useStyles();
  const history = useHistory();

  const [datosOrdenes, setDatosOrdenes] = React.useState({});
  const [ordenes, setOrdenes] = React.useState([]);
  const [ordenesFiltro, setOrdenesFiltro] = React.useState([]);
  const [ordenesFiltroFecha, setOrdenesFiltroFecha] = React.useState([]);

  const [fecha, setFecha] = React.useState("");

  const handleClick = (event) => {
    enviarDatos(
      datosOrdenes["operaciones"][event.target.lastChild.data - 1],
      datosOrdenes["productos"][event.target.lastChild.data - 1],
      datosOrdenes["ordenes"][event.target.lastChild.data - 1][0].fk_estatus
    );
    irOrden();
  };

  const handleChangeFecha = (event) => {
    setFecha(event.target.value);
  };
  const irOrden = () => {
    history.push("/perfil/orden");
  };

  const enviarDatos = (datosOrden, productos, estatus) => {
    props.conseguirDatosOrden(datosOrden, productos, estatus);
  };

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

  const estatus = (estatusId) => {
    switch (estatusId) {
      case 1:
        return "Pendiente";
        break;
      case 3:
        return "Recibido";
        break;
      case 4:
        return "Pagado";
        break;

      default:
        break;
    }
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

  React.useEffect(() => {
    let aux = ordenes.filter(
      (orden, value) =>
        orden[0].fk_estatus === 1 ||
        orden[0].fk_estatus === 3 ||
        orden[0].fk_estatus === 4
    );
    setOrdenesFiltro(aux);
    setOrdenesFiltroFecha(aux);
  }, [ordenes]);

  React.useEffect(() => {
    if (fecha === "") {
      setOrdenesFiltroFecha(ordenesFiltro);
    } else {
      let aux = ordenesFiltro.filter((orden, value) => {
        let fechaOrden = orden[0].fecha.split("T")[0];
        return fechaOrden === fecha;
      });
      setOrdenesFiltroFecha(aux);
    }
  }, [fecha]);

  console.log(ordenes);
  console.log(datosOrdenes);
  //console.log(fecha);

  return (
    <React.Fragment>
      <Typography variant="h5">
        <b>Órdenes</b>
      </Typography>
      <Paper variant="outlined" className={classes.paper}>
        <Typography variant="h6" align="center" className="m-4">
          <b>Órdenes</b>
        </Typography>
        <form className={classes.container} noValidate>
          <TextField
            variant="outlined"
            id="date"
            label="Fecha"
            type="date"
            defaultValue=""
            className={classes.textField}
            onChange={handleChangeFecha}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <Paper variant="outlined" className={classes.paperOrden}>
          <List>
            {ordenesFiltroFecha.map((orden, value) => (
              <ListItem>
                <Link key={value} onClick={handleClick}>
                  Órden {value + 1}
                </Link>
                <Typography variant="caption" className="m-3">
                  {" "}
                  {orden[0].fecha}
                </Typography>
                <Typography variant="caption" className="m-3" color="primary">
                  {" "}
                  {estatus(orden[0].fk_estatus)}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Paper>
    </React.Fragment>
  );
}
