import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  search: {
    width: 350,
    margin: 30,
  },
  paper: {
    width: 500,
    margin: 30,
  },
}));

export default function TiendaInventario() {
  const history = useHistory();
  const classes = useStyles();

  const irControlTienda = () => {
    history.push("/perfil/controltienda");
  };

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irControlTienda}>
        <Typography variant="h5">Control de Tienda</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Control de Tienda: Inventario</b>
      </Typography>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        className={classes.search}
        variant="outlined"
        placeholder="Ingrese locación o código de tienda"
      />
      <Paper className={classes.paper} variant="outlined">
        <List>
          <ListItem>
            <Button>
              <Typography> Tienda 1 / Ubicación</Typography>
            </Button>
          </ListItem>
          <ListItem>
            <Button>
              <Typography> Tienda 2 / Ubicación</Typography>
            </Button>
          </ListItem>
          <ListItem>
            <Button>
              <Typography> Tienda 3 / Ubicación</Typography>
            </Button>
          </ListItem>
          <ListItem>
            <Button>
              <Typography> Tienda 4 / Ubicación</Typography>
            </Button>
          </ListItem>
        </List>
      </Paper>
      <div style={{ display: "flex" }}>
        <Typography variant="h6" className="m-4">
          {" "}
          Tienda seleccionada:
        </Typography>
        <TextField variant="outlined" label="Tienda" className="m-3" disabled />
      </div>
      <Paper className={classes.paper} variant="outlined">
        <List>
          <ListItem>
            <Button>
              <Typography>
                {" "}
                Producto 1 / Descripción / Cantidad / Precio
              </Typography>
            </Button>
          </ListItem>
          <ListItem>
            <Button>
              <Typography>
                {" "}
                Producto 2 / Descripción / Cantidad / Precio
              </Typography>
            </Button>
          </ListItem>
          <ListItem>
            <Button>
              <Typography>
                {" "}
                Producto 3 / Descripción / Cantidad / Precio
              </Typography>
            </Button>
          </ListItem>
          <ListItem>
            <Button>
              <Typography>
                {" "}
                Producto 4 / Descripción / Cantidad / Precio
              </Typography>
            </Button>
          </ListItem>
        </List>
      </Paper>
    </React.Fragment>
  );
}
