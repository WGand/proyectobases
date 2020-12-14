import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

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

const useStylesCard = makeStyles({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 300,
    maxHeight: 300,
    width: 400,
    maxWidth: 400,
  },
});

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
      backgroundColor: "0063cc#",
      borderColor: "0063cc#",
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

export default function ListaDestacados() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const classesCard = useStylesCard();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <React.Fragment>
      <Typography variant="h2" className="m-5 container">
        Destacados
      </Typography>
      <Grid container className={classes.root} spacing={5}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => (
              <Grid key={value} item>
                <Button variant="outlined" onClick={handleClick}>
                  <img
                    src="https://http2.mlstatic.com/televisor-aiwa-32-led-hd-hdmi-isdbt-D_NQ_NP_766490-MLV43440988575_092020-W.webp"
                    class="tamañoLista"
                    alt=""
                  />
                  Producto {value}
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  elevation="1"
                >
                  <Card className={classesCard.root}>
                    <CardMedia
                      className={classesCard.media}
                      image="https://http2.mlstatic.com/televisor-aiwa-32-led-hd-hdmi-isdbt-D_NQ_NP_766490-MLV43440988575_092020-W.webp"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography variant="h4" component="h1">
                        Producto
                      </Typography>
                      <Typography gutterBottom variant="h6">
                        500$
                      </Typography>
                      <Typography
                        paragraph
                        variant="body1"
                        color="textSecondary"
                        component="p"
                      >
                        Descripción del producto
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <Boton
                        variant="contained"
                        color="primary"
                        disableRipple
                        className="m-3"
                      >
                        Agregar
                      </Boton>
                    </CardActions>
                  </Card>
                </Popover>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="middle" class="border border-primary" />
    </React.Fragment>
  );
}
