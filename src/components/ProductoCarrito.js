import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  trash: {
    margin: 50,
  },
}));

export default function ProductoCarrito(props) {
  const [cantidad, setCantidad] = React.useState("");
  const classes = useStyles();

  const handleChange = (event) => {
    setCantidad(event.target.value);
  };

  const deleteSignal = () => {
    props.borrar(props.nombre);
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
      <IconButton className={classes.trash} onClick={deleteSignal}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}
