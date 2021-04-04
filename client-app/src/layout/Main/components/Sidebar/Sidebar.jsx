import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Drawer } from "@material-ui/core"
import { SidebarNav } from "./components"
//Material Icons
import DashboardIcon from "@material-ui/icons/Dashboard"
import ScheduleIcon from "@material-ui/icons/Schedule"
import SettingsIcon from "@material-ui/icons/Settings"
import AssessmentIcon from "@material-ui/icons/Assessment"

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    marginTop: 48,
    height: "calc(100% - 48px)",
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}))

const Sidebar = (props) => {
  const { open, onClose } = props

  const classes = useStyles()

  const pages = [
    {
      title: "Dashboard",
      href: "/",
      icon: <DashboardIcon />,
    },
    {
      title: "Scheduler",
      href: "/scheduler",
      icon: <ScheduleIcon />,
    },
    {
      title: "Logs",
      href: "/logs",
      icon: <AssessmentIcon />,
    },
    {
      title: "Configure",
      href: "/configure",
      icon: <SettingsIcon />,
    },
    {
      title: "Data",
      href: "/data",
      icon: <AssessmentIcon />,
    },
  ]

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
    >
      <div className={classes.root}>
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  )
}
Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
}
export default Sidebar
