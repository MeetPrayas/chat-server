import React from "react";
import { Typography } from "@material-ui/core";
//material components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    height: 48,
  },
  flexGrow: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  image: {
    width: "85px",
    height: "50px",
  },
}));
function Topbar({ handleSidebar }) {
  const classes = useStyles();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Anonymous Chat</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Topbar;
