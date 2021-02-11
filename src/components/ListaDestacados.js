import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  grid: {
    width: 280,
    height: 200,
  },
  rootCard: {
    maxWidth: 400,
  },
  media: {
    height: 300,
    maxHeight: 300,
    width: 400,
    maxWidth: 400,
  },
  boton: {
    margin: 20,
    marginRight: 30,
    marginLeft: 15,
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

export default function ListaDestacados(props) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [lista, setLista] = React.useState([]);
  const [productoSelec, setProductoSelec] = React.useState({});

  const [datos, setDatos] = React.useState([]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const handleClick = (event) => {
    let aux = lista.filter(
      (producto) =>
        producto.nombre.toUpperCase() === event.currentTarget.innerText
    );
    setProductoSelec(aux);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSnackbar = () => {
    productoHome();
    setOpenSnackbar(true);
    handleClose();
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const productoHome = () => {
    let aux = JSON.parse(localStorage.getItem("carrito"));
    aux.push(productoSelec[0]);
    localStorage.setItem("carrito", JSON.stringify(aux));
  };

  React.useEffect(() => {
    setLista(props.productos);
  });

  React.useEffect(() => {
    setDatos(props.datos);
  });

  React.useEffect(() => {
    if (datos.length !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [datos]);

  // console.log("lista: ");
  console.log(lista);
  console.log(productoSelec);
  //console.log(datos);

  if (productoSelec[0]) {
    return (
      <React.Fragment>
        <Typography variant="h3" className="m-5">
          <b>Destacados</b>
        </Typography>
        <Grid container className={classes.root} spacing={5}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
              {lista.map((producto, value) => (
                <Grid key={value} item>
                  <Button
                    variant="outlined"
                    onClick={handleClick}
                    className={classes.grid}
                    id={value}
                  >
                    <img src={producto.imagen} class="tamañoLista" alt="" />
                    {producto.nombre}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Card className={classes.rootCard}>
            <CardMedia
              className={classes.media}
              image={productoSelec[0].imagen}
              title="Imagen"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className="m-2"
              >
                {productoSelec[0].nombre}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className="m-2"
              >
                {productoSelec[0].precio} Bs.
              </Typography>
            </CardContent>
            <CardActions>
              <Boton
                variant="contained"
                className={classes.boton}
                color="primary"
                onClick={handleClickSnackbar}
                disabled={disabled}
              >
                Agregar a Carrito
              </Boton>
            </CardActions>
          </Card>
        </Popover>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Producto agregado al carrito"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackbar}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Typography variant="h3" className="m-5">
          <b>Destacados</b>
        </Typography>
        <Grid container className={classes.root} spacing={5}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
              {lista.map((producto, value) => (
                <Grid key={value} item>
                  <Button
                    variant="outlined"
                    onClick={handleClick}
                    className={classes.grid}
                    id={value}
                  >
                    <img src={producto.imagen} class="tamañoLista" alt="" />
                    <Typography className="m-2">{producto.nombre}</Typography>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
