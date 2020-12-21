import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(1),
    width: 220,
  },
}));

export default function DateAndTimePickers() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h3" className="m-4">
        <b>Carrito de Compras</b>
      </Typography>
      <form className={classes.container} noValidate>
        <TextField
          id="datetime-local"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      <Divider variant="middle" class="border border-primary m-4" />
    </React.Fragment>
  );
}
