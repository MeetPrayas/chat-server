import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Outlet } from "react-router-dom";
import { Topbar } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 56,
    },
  },
  content: {
    height: "100%",
    padding: 10,
  },
}));

const Main = (props) => {
  const classes = useStyles();
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleSidebar = () => {
    setOpenSidebar((old) => (old ? false : true));
  };

  return (
    <div className={classes.root}>
      <Topbar handleSidebar={handleSidebar} />
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
