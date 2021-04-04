import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: "5% 15% 0 15%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      "& > *": {
        margin: theme.spacing(2),
        width: "80%",
      },
    },
    p: {
      textAlign: "center",
      margin: 0,
    },
  })
);

interface Props {}

const Home: React.FC<Props> = () => {
  const [state, setState] = React.useState(false);
  const [error, setError] = React.useState({
    checkCondition: false,
    name: false,
    roomid: false,
  });
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Anonymous Chat</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ul>
              This is a platform to communicate with other person. Everyone
              participating in the application is encoraged to abide by the
              following instructions:
              <li>Donot use offensive word</li>
            </ul>
            <label>
              <Checkbox
                checked={state}
                onChange={() => {
                  setState(!state);
                }}
                name="checkedB"
                color="primary"
              />
              Accept the rules
            </label>
          </Grid>
          <Grid item xs={6} spacing={2}>
            <div className={classes.container}>
              <TextField id="name" label="Enter your Name" />
              <Button color="primary" variant="contained">
                Join Global chat
              </Button>
              <p className={classes.p}>OR</p>
              <Button color="primary" variant="contained">
                Host room
              </Button>
              <p className={classes.p}>OR</p>
              <TextField id="room_id" label="Enter Room Id to join" />
              <Button color="primary" variant="contained">
                Join Room
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Home;
