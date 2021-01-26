import React from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import MoreIcon from "@material-ui/icons/MoreVert";
import { ShoppingCart } from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "100%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  selectSearch: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    color: "white",
  },
  dialog: {
    margin: "auto",
    width: 1200,
  },
  boton: {
    margin: 20,
    marginRight: 30,
    marginLeft: 60,
  },
  radio: {
    marginTop: 20,
    marginLeft: 50,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
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

const GreenRadio = withStyles({
  root: {
    color: "#00aae3",
    "&$checked": {
      color: "#00aae3",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [categoria, setCategoria] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [empleado, setEmpleado] = React.useState("natural");
  const [correo, setCorreo] = React.useState("");
  const [contraseña, setContraseña] = React.useState("");
  const [datos, setDatos] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const history = useHistory();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeRadio = (event) => {
    setEmpleado(event.target.value);
  };

  const handleChangeCorreo = (event) => {
    setCorreo(event.target.value);
  };

  const handleChangeContraseña = (event) => {
    setContraseña(event.target.value);
  };

  const irCarrito = () => {
    history.push("/carrito");
  };

  const irHome = () => {
    history.push("/");
  };

  const irPerfil = () => {
    history.push("/perfil");
  };

  const irRegistrar = () => {
    history.push("/registrar");
    setOpen(false);
  };

  const manejarInicio = () => {
    if (datos.length === 0) {
      handleClickOpen();
    } else {
      datosApp();
      tipoApp();
      irPerfil();
    }
  };

  const cerrarSesion = () => {
    setDatos([]);
    localStorage.removeItem("datos");
    setOpen(false);
    irHome();
  };

  const datosApp = () => {
    props.conseguirDatos(datos);
  };

  const tipoApp = () => {
    props.conseguirTipo(empleado);
  };

  const compararDatos = async () => {
    setOpenBackdrop(true);
    await axios({
      method: "post",
      url: "https://proyectobasesnode.azurewebsites.net/login",
      data: {
        correo: correo,
        contrasena: contraseña,
        tipo: empleado,
      },
    }).then((response) => {
      setDatos(response.data);
    });
    setOpenBackdrop(false);
  };

  React.useEffect(() => {
    if (!datos || JSON.parse(localStorage.getItem("datos")) === null) {
      setDatos([]);
      localStorage.setItem("datos", JSON.stringify([]));
      localStorage.setItem("datos", "natural");
    } else {
      setDatos(JSON.parse(localStorage.getItem("datos")));
      setEmpleado(localStorage.getItem("tipo"));
      datosApp();
      tipoApp();
      console.log("paso datos");
    }
  }, []);

  React.useEffect(() => {
    if (correo.length === 0 && contraseña.length === 0) {
      setError(false);
    } else {
      if (datos.length === 0) {
        setError(true);
      } else {
        datosApp();
        tipoApp();
        setError(false);
        handleClose();
        localStorage.setItem("datos", JSON.stringify(datos));
        localStorage.setItem("tipo", empleado);
      }
    }
  }, [datos]);

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  console.log(datos);
  console.log(JSON.parse(localStorage.getItem("datos")));
  console.log("tipo: " + localStorage.getItem("tipo"));
  console.log(correo);
  console.log(contraseña);
  console.log(empleado);

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={manejarInicio}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <Typography>Iniciar sesión</Typography>
      </MenuItem>
    </Menu>
  );

  const renderMobileMenuLogged = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton color="inherit">
          <Badge badgeContent={1} color="secondary">
            <NotificationsIcon fontSize="large" />
          </Badge>
        </IconButton>
        <Typography>Notificaciones</Typography>
      </MenuItem>
      <MenuItem onClick={manejarInicio}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <Typography>Perfil</Typography>
      </MenuItem>
      <MenuItem onClick={irCarrito}>
        <IconButton color="inherit">
          <ShoppingCart fontSize="large" />
        </IconButton>
        <Typography>Carrito</Typography>
      </MenuItem>
      <MenuItem onClick={handleClickOpen}>
        <IconButton color="inherit">
          <ExitToAppIcon fontSize="large" />
        </IconButton>
        <Typography>Cerrar sesión</Typography>
      </MenuItem>
    </Menu>
  );

  if (datos.length === 0) {
    return (
      <div className={classes.grow}>
        <AppBar position="static" style={{ background: "#00AAE3" }}>
          <Toolbar>
            <IconButton
              onClick={irHome}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <img
                src={process.env.PUBLIC_URL + "/ucabmart_logo.png"}
                width="70"
                height="70"
                alt=""
              />
            </IconButton>
            <Select
              value={categoria}
              onChange={handleChange}
              displayEmpty
              className={classes.selectSearch}
              inputProps={{ "aria-label": "Without label" }}
              variant="outlined"
            >
              <MenuItem value="">
                <em>Categorías</em>
              </MenuItem>
              <MenuItem value={1}>Frutas y Vegetales</MenuItem>
              <MenuItem value={2}>Víveres</MenuItem>
              <MenuItem value={3}>Reffrigerados y Congelados</MenuItem>
              <MenuItem value={4}>Cuidado Personal y Salud</MenuItem>
              <MenuItem value={5}>Limpieza</MenuItem>
              <MenuItem value={6}>Hogar y Temporada</MenuItem>
              <MenuItem value={7}>Mascotas</MenuItem>
              <MenuItem value={8}>Licores</MenuItem>
              <MenuItem value={9}>Vehículos</MenuItem>
              <MenuItem value={10}>Oficina y Tecnología</MenuItem>
            </Select>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Buscar..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                type="search"
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
                onClick={manejarInicio}
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                className={classes.dialog}
              >
                <DialogTitle id="form-dialog-title" align="center">
                  Iniciar Sesión
                </DialogTitle>
                <DialogContent>
                  <div style={{ display: "flex" }}>
                    <PersonIcon fontSize="large" className="m-2" />
                    <TextField
                      className={classes.dialog}
                      margin="dense"
                      fullWidth
                      autoFocus
                      id="name"
                      label="Correo Electrónico"
                      type="email"
                      variant="outlined"
                      onChange={handleChangeCorreo}
                      error={error}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <LockIcon fontSize="large" className="m-2" />
                    <TextField
                      className={classes.dialog}
                      margin="dense"
                      fullWidth
                      autoFocus
                      id="name"
                      label="Constraseña"
                      type="password"
                      variant="outlined"
                      onChange={handleChangeContraseña}
                      error={error}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <FormControl component="fieldset" className={classes.radio}>
                      <FormLabel component="legend">Tipo de usuario</FormLabel>
                      <RadioGroup
                        row
                        aria-label="tipo"
                        name="tipo1"
                        value={empleado}
                        onChange={handleChangeRadio}
                      >
                        <div style={{ display: "flex" }}>
                          <FormControlLabel
                            value="natural"
                            control={<GreenRadio />}
                            label="Natural"
                          />
                          <FormControlLabel
                            value="empleado"
                            control={<GreenRadio />}
                            label="Empleado"
                          />
                          <FormControlLabel
                            value="juridico"
                            control={<GreenRadio />}
                            label="Jurídico"
                          />
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <Boton
                      variant="contained"
                      className={classes.boton}
                      color="primary"
                      onClick={compararDatos}
                    >
                      Iniciar Sesión
                    </Boton>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={irRegistrar} color="primary" className="m-3">
                    Registrarse
                  </Button>
                  <Button onClick={handleClose} color="primary" className="m-3">
                    ¿Olvidó su Contraseña?
                  </Button>
                </DialogActions>
                <Backdrop className={classes.backdrop} open={openBackdrop}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Dialog>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </div>
    );
  } else {
    return (
      <div className={classes.grow}>
        <AppBar position="static" style={{ background: "#00AAE3" }}>
          <Toolbar>
            <IconButton
              onClick={irHome}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <img
                src={process.env.PUBLIC_URL + "/ucabmart_logo.png"}
                width="70"
                height="70"
                alt=""
              />
            </IconButton>
            <Select
              value={categoria}
              onChange={handleChange}
              displayEmpty
              className={classes.selectSearch}
              inputProps={{ "aria-label": "Without label" }}
              variant="outlined"
            >
              <MenuItem value="">
                <em>Categorías</em>
              </MenuItem>
              <MenuItem value={1}>Frutas y Vegetales</MenuItem>
              <MenuItem value={2}>Víveres</MenuItem>
              <MenuItem value={3}>Reffrigerados y Congelados</MenuItem>
              <MenuItem value={4}>Cuidado Personal y Salud</MenuItem>
              <MenuItem value={5}>Limpieza</MenuItem>
              <MenuItem value={6}>Hogar y Temporada</MenuItem>
              <MenuItem value={7}>Mascotas</MenuItem>
              <MenuItem value={8}>Licores</MenuItem>
              <MenuItem value={9}>Vehículos</MenuItem>
              <MenuItem value={10}>Oficina y Tecnología</MenuItem>
            </Select>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Buscar..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                type="search"
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Badge badgeContent={1} color="secondary">
                  <NotificationsIcon fontSize="large" />
                </Badge>
              </IconButton>

              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
                onClick={manejarInicio}
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              <IconButton color="inherit" onClick={irCarrito}>
                <ShoppingCart fontSize="large" />
              </IconButton>
              <IconButton color="inherit" onClick={handleClickOpen}>
                <ExitToAppIcon fontSize="large" />
              </IconButton>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
              >
                <DialogTitle id="alert-dialog-title">Cerrar sesión</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    ¿Seguro que desea cerrar sesión?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={cerrarSesion} color="primary">
                    Si
                  </Button>
                  <Button onClick={handleClose} color="primary" autoFocus>
                    No
                  </Button>
                </DialogActions>
                <Backdrop className={classes.backdrop} open={openBackdrop}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Dialog>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenuLogged}
      </div>
    );
  }
}
