import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  search: {
    width: 350,
    margin: 30,
  },
  boton: {
    height: 55,
    margin: 30,
  },
  paper: {
    width: 500,
    margin: 30,
  },
  text: {
    width: 250,
    margin: 15,
  },
  textCRIF: {
    width: 300,
    margin: 30,
    marginTop: 10,
  },
  botonGenerar: {
    height: 70,
    width: 90,
    margin: 30,
    marginTop: 5,
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

export default function ControlUsuario() {
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
        <b>Control de Usaurio</b>
      </Typography>
      <div style={{ display: "flex" }}>
        <Boton variant="contained" className={classes.boton} color="primary">
          Crear usuario
        </Boton>
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
          placeholder="Ingrese cédula"
        />
      </div>
      <Paper className={classes.paper} variant="outlined">
        <List>
          <ListItem>
            <Link>Cliente 1</Link>
          </ListItem>
          <ListItem>
            <Link>Cliente 2</Link>
          </ListItem>
          <ListItem>
            <Link>Cliente 3</Link>
          </ListItem>
          <ListItem>
            <Link>Cliente 4</Link>
          </ListItem>
          <ListItem>
            <Link>Cliente 5</Link>
          </ListItem>
        </List>
      </Paper>
      <Typography variant="h4" className="m-3">
        <b>Generar Carnet</b>
      </Typography>
      <div style={{ display: "flex" }}>
        <Typography variant="h5" className="m-4">
          Tienda:
        </Typography>
        <TextField variant="outlined" className={classes.text} />
      </div>
      <Typography variant="h5" className="m-4">
        Cédula de Identidad / RIF
      </Typography>
      <TextField
        variant="outlined"
        className={classes.textCRIF}
        label="Cédula / RIF"
      />
      <Boton
        variant="contained"
        className={classes.botonGenerar}
        color="primary"
      >
        Generar
      </Boton>
    </React.Fragment>
  );
}
