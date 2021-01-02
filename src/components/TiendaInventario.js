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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
  search: {
    width: 350,
    margin: 30,
  },
  paper: {
    width: 550,
    margin: 30,
  },
  table: {
    width: 500,
    margin: "auto",
  },
}));

function createData(producto, descripcion, cantidad, precio) {
  return { producto, descripcion, cantidad, precio };
}

const rows = [
  createData("Producto 1", "Descripción 1", 5, 1),
  createData("Producto 2", "Descripción 2", 10, 2),
  createData("Producto 3", "Descripción 3", 15, 3),
  createData("Producto 4", "Descripción 4", 20, 4),
  createData("Producto 5", "Descripción 5", 25, 5),
];

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
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Producto</b>
                </TableCell>
                <TableCell align="right">
                  <b>Descripción</b>
                </TableCell>
                <TableCell align="right">
                  <b>Cantidad</b>
                </TableCell>
                <TableCell align="right">
                  <b>Precio</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} hover>
                  <TableCell component="th" scope="row">
                    {row.producto}
                  </TableCell>
                  <TableCell align="right">{row.descripcion}</TableCell>
                  <TableCell align="right">{row.cantidad}</TableCell>
                  <TableCell align="right">{row.precio}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </React.Fragment>
  );
}
