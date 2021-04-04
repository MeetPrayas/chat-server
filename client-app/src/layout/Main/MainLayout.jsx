import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Outlet } from "react-router-dom";
import { Sidebar, Topbar, Footer } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64,
    },
  },
  content: {
    minHeight: "85%",
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
      {/* <Sidebar onClose={handleSidebar} open={openSidebar} /> */}
      <main className={classes.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
