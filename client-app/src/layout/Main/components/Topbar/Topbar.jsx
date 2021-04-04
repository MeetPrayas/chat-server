import React from "react"
import { makeStyles } from "@material-ui/styles"

//material components
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
// import Badge from "@material-ui/core/Badge"
import IconButton from "@material-ui/core/IconButton"

//material icons imports
import InputIcon from "@material-ui/icons/Input"
import MenuIcon from "@material-ui/icons/Menu"
import { Typography } from "@material-ui/core"
// import NotificationsIcon from "@material-ui/icons/NotificationsOutlined"

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
}))
function Topbar({ handleSidebar }) {
  const classes = useStyles()

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={handleSidebar}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" component="h5" style={{color:"white"}}>
          External Factor
        </Typography>

        <div className={classes.flexGrow} />
        <IconButton
          className={classes.button}
          color="inherit"
          onClick={() => {
            console.log("csign out")
          }}
        >
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
