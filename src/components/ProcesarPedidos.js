import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 500,
    margin: 30,
  },
  check: {
    color: "#008332",
    marginLeft: 350,
  },
  x: {
    marginLeft: 350,
  },
}));

export default function ProcesarPedidos() {
  const classes = useStyles();
  const history = useHistory();

  const irPerfil = () => {
    history.push("/perfil");
  };

  return (
    <React.Fragment>
      <Button className="m-3" onClick={irPerfil}>
        <Typography variant="h5">Responsabilidades</Typography>
      </Button>
      <Typography variant="h4" className="m-3">
        <b>Procesar Pedidos</b>
      </Typography>
      <Paper className={classes.paper} variant="outlined">
        <List>
          <ListItem>
            <Link> Pedido 1</Link>
            <CheckCircleIcon className={classes.check} />
          </ListItem>
          <ListItem>
            <Link> Pedido 2</Link>
            <CancelIcon className={classes.x} color="error" />
          </ListItem>
          <ListItem>
            <Link> Pedido 3</Link>
            <CheckCircleIcon className={classes.check} />
          </ListItem>
        </List>
      </Paper>
    </React.Fragment>
  );
}
