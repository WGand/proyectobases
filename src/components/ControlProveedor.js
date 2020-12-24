import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const useStyles = makeStyles((theme) => ({
  search: {
    width: 350,
    margin: 30,
  },
  paper: {
    width: 500,
    margin: 30,
  },
  paperSelec: {
    width: 800,
    margin: 30,
  },
  plus: {
    color: "#008332",
  },
  boton: {
    marginLeft: 80,
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

export default function ControlProveedor() {
  const history = useHistory();
  const classes = useStyles();

  const irPerfil = () => {
    history.push("/perfil");
  };

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irPerfil}>
        <Typography variant="h5">Responsabilidades</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Control de Proveedor</b>
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
        placeholder="Ingrese RIF"
      />
      <Paper className={classes.paper} variant="outlined">
        <List>
          <ListItem>
            <Button>
              <Typography> Proveedor 1 / Rubros</Typography>
            </Button>
          </ListItem>
          <ListItem>
            <Button>
              <Typography> Proveedor 2 / Rubros</Typography>
            </Button>
          </ListItem>
          <ListItem>
            <Button>
              <Typography> Proveedor 3 / Rubros</Typography>
            </Button>
          </ListItem>
          <ListItem>
            <Button>
              <Typography> Proveedor 4 / Rubros</Typography>
            </Button>
          </ListItem>
        </List>
      </Paper>
      <Paper
        className={classes.paperSelec}
        variant="outlined"
        style={{ display: "flex" }}
      >
        RIF / Nombre del Proveedor / Rubros **EMPLEADO SELECCIONADO** / UCABMART
        <IconButton className={classes.boton}>
          <AddCircleIcon className={classes.plus} />
        </IconButton>
        <IconButton>
          <RemoveCircleIcon color="error" />
        </IconButton>
      </Paper>
      <Boton variant="contained" className="m-4" color="primary">
        Modificar Proveedor
      </Boton>
    </React.Fragment>
  );
}
