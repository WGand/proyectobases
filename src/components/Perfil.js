import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PerfilDatos from "./PerfilDatos";
import PerfilOrdenes from "./PerfilOrdenes";
import Responsabilidades from "./Responsabilidades";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background,
    display: "flex",
    height: "auto",
  },
  tabs: {
    borderRight: `2px solid ${theme.palette.divider}`,
    width: 250,
  },
}));

export default function Perfil(props) {
  document.title = "Perfil";

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h3" className="m-4">
        <b>Cuenta</b>
      </Typography>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
          TabIndicatorProps={{ style: { background: "#00AAE3" } }}
        >
          <Tab label="Datos" {...a11yProps(0)} />
          <Tab label="Órdenes" {...a11yProps(1)} />
          <Tab label="Contraseña" {...a11yProps(2)} />
          <Tab label="Responsabilidades" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <PerfilDatos datos={props.datos} tipo={props.tipo} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PerfilOrdenes />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Responsabilidades />
        </TabPanel>
      </div>
    </React.Fragment>
  );
}
