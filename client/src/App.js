import './App.css';
import { LinkTab, TabPanel } from "./components/Navbar";
import {
  CssBaseline,
} from '@material-ui/core';
import { Tree, Hubs, Devices } from "./features";
import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function App() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Tree View" href="/" {...a11yProps(0)} />
          <LinkTab label="Hubs" href="/hubs" {...a11yProps(1)} />
          <LinkTab label="Devices" href="/devices" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Tree/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Hubs/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Devices/>
      </TabPanel>
    </div>
  );
}

export default App;
