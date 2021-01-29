import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  trash: {
    margin: 50,
  },
}));

export default function ProductoCarrito(props) {
  const [cantidad, setCantidad] = React.useState("");
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCantidad(event.target.value);
  };

  const deleteSignal = () => {
    setOpen(false);
    props.borrar(props.nombre);
  };

  const manejarBorrar = () => {
    setOpen(true);
  };

  return (
    <ListItem divider>
      <img
        src="https://http2.mlstatic.com/televisor-aiwa-32-led-hd-hdmi-isdbt-D_NQ_NP_766490-MLV43440988575_092020-W.webp"
        class="tamañoCarrito"
        alt=""
      />
      <ListItemText primary={props.nombre} secondary={props.precio} />
      <Select
        variant="outlined"
        value={cantidad}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">1</MenuItem>
        <MenuItem value={1}>2</MenuItem>
        <MenuItem value={2}>3</MenuItem>
        <MenuItem value={3}>4</MenuItem>
        <MenuItem value={4}>5</MenuItem>
        <MenuItem value={5}>6</MenuItem>
        <MenuItem value={6}>7</MenuItem>
        <MenuItem value={7}>8</MenuItem>
        <MenuItem value={8}>9</MenuItem>
        <MenuItem value={9}>10</MenuItem>
      </Select>
      <IconButton className={classes.trash} onClick={manejarBorrar}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.dialog}
      >
        <DialogTitle id="form-dialog-title" align="center">
          Eliminar Producto de Carrito
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea eliminar "{props.nombre}" del Carrito?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteSignal} color="primary" className="m-3">
            Si
          </Button>
          <Button onClick={handleClose} color="primary" className="m-3">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
}
