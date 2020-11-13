import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

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
}));

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return (
    <React.Fragment>
      <h1 class="m-4">Destacados</h1>
      <Grid container className={classes.root} spacing={5}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => (
              <Grid key={value} item>
                <Paper className={classes.paper} class="border rounded">
                  <img
                    src="https://http2.mlstatic.com/televisor-aiwa-32-led-hd-hdmi-isdbt-D_NQ_NP_766490-MLV43440988575_092020-W.webp"
                    class="tamañoLista"
                    alt=""
                  />
                  Producto {value}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="middle" class="border border-primary" />
    </React.Fragment>
  );
}
