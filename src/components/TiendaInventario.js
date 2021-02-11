import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TablaTiendas from "./TablaTiendas";
import TablaProductos from "./TablaProductos";

const useStyles = makeStyles((theme) => ({
  search: {
    width: 350,
    margin: 30,
  },
  paper: {
    width: 500,
    margin: 30,
    marginTop: 60,
  },
  table: {
    width: 500,
    margin: "auto",
  },
  paperProd: {
    width: 1000,
    margin: 30,
    marginTop: 60,
    marginBottom: 100,
  },
}));

export default function TiendaInventario() {
  const history = useHistory();
  const classes = useStyles();

  const [datosTienda, setDatosTienda] = React.useState({});

  const getDatosTabla = (datosTabla) => {
    setDatosTienda(datosTabla);
  };

  const irControlTienda = () => {
    history.push("/perfil/controltienda");
  };

  console.log(datosTienda);

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irControlTienda}>
        <Typography variant="h5">Control de Tienda</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Control de Tienda: Inventario</b>
      </Typography>
      <Paper className={classes.paper} variant="outlined">
        <TablaTiendas tiendaSelec={getDatosTabla} />
      </Paper>
      <div style={{ display: "flex" }}>
        <Typography variant="h6" className="m-4">
          Tienda seleccionada:
        </Typography>
        <TextField
          variant="outlined"
          label={datosTienda.nombre}
          className="m-3"
          disabled
        />
      </div>
      <Paper className={classes.paperProd} variant="outlined">
        <TablaProductos tiendaId={datosTienda.tienda_id} />
      </Paper>
    </React.Fragment>
  );
}
