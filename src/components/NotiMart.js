import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { event } from "jquery";

const useStyles = makeStyles((theme) => ({
  search: {
    width: 350,
    margin: 10,
    marginLeft: 20,
  },
  root: {
    flexGrow: 1,
  },
  boton: {
    width: 140,
    height: 120,
    margin: 20,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
    width: 200,
  },
  desc: {
    marginLeft: 10,
    marginRight: 800,
    marginTop: 10,
    width: 100,
    height: 60,
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

export default function NotiMart() {
  const history = useHistory();
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);
  const [descuento, setDescuento] = React.useState("");

  const irPerfil = () => {
    history.push("/perfil");
  };

  const handleChangeDescuento = (event) => {
    setDescuento(event.target.value);
  };

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irPerfil}>
        <Typography variant="h5">Responsabilidades</Typography>
      </Button>
      <div style={{ display: "flex" }}>
        <Typography variant="h4" className="m-3">
          <b>NotiMart</b>
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
          placeholder="Buscar producto"
        />
      </div>
      <Typography variant="h5" className="m-4">
        Seleccionar Productos:
      </Typography>
      <Grid container className={classes.root} spacing={5}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Button variant="outlined" className={classes.boton}>
              Producto 1
            </Button>
            <Button variant="outlined" className={classes.boton}>
              Producto 2
            </Button>
            <Button variant="outlined" className={classes.boton}>
              Producto 3
            </Button>
            <Button variant="outlined" className={classes.boton}>
              Producto 4
            </Button>
            <Button variant="outlined" className={classes.boton}>
              Producto 5
            </Button>
            <Button variant="outlined" className={classes.boton}>
              Producto 6
            </Button>
          </Grid>
        </Grid>
      </Grid>
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
      <div style={{ display: "flex" }}>
        <Typography variant="h6" className="m-4">
          {" "}
          Descuento:
        </Typography>
        <Select
          value={descuento}
          onChange={handleChangeDescuento}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className={classes.desc}
          variant="outlined"
        >
          <MenuItem value="">5%</MenuItem>
          <MenuItem value={1}>10%</MenuItem>
          <MenuItem value={2}>20%</MenuItem>
          <MenuItem value={3}>50%</MenuItem>
        </Select>
        <Boton variant="contained" className="m-4" color="primary">
          Generar
        </Boton>
      </div>
    </React.Fragment>
  );
}
