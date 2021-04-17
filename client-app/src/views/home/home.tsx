import * as React from "react"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Checkbox from "@material-ui/core/Checkbox"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import { useConnection } from "../../context/connection-conext"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: "5 15% 0 15%",
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
  }),
)

interface Props {}
const initialError = {
  checkCondition: {
    status: false,
    message: "",
  },
  name: {
    status: false,
    message: "",
  },
  roomId: {
    status: false,
    message: "",
  },
  accept: {
    status: false,
    message: "",
  },
}

const Home: React.FC<Props> = () => {
  const [accept, setAccept] = React.useState(false)
  const [state, setState] = React.useState({
    name: "",
    roomId: "",
  })
  const { dispatch } = useConnection()
  const [error, setError] = React.useState(initialError)
  const classes = useStyles()
  let navigate = useNavigate()

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    })
  }

  let navigateTO = (path: string) => {
    navigate(path)
  }
  const handleClick = (type: string) => {
    if (accept) {
      if (["joinGlobalChat", "hostRoom"].includes(type)) {
        if (!state.name) {
          setError({
            ...initialError,
            name: {
              status: true,
              message: "Please Enter your Name",
            },
          })
        } else {
          setError({
            ...initialError,
          })
          dispatch({
            type: "set-up",
            payload: {
              name: state.name,
              type: type,
              roomId: "",
            },
          })
          dispatch({
            type: "connect",
            payload: {
              dispatch: dispatch,
              name: state.name,
              type: type,
              roomId: "",
              navigateTO: navigateTO,
            },
          })
        }
      } else if (type === "joinRoom") {
        if (!state.name) {
          setError({
            ...initialError,
            name: {
              status: true,
              message: "Please Enter your Name",
            },
          })
        } else if (state.roomId.length !== 12) {
          setError({
            ...initialError,
            roomId: {
              status: true,
              message: "Please Enter a Valid RoomID",
            },
          })
        } else {
          setError({
            ...initialError,
          })
          dispatch({
            type: "connect",
            payload: {
              dispatch: dispatch,
              name: state.name,
              type: type,
              roomId: state.roomId,
              navigateTO: navigateTO,
            },
          })
        }
      }
    } else {
      setError({
        ...initialError,
        accept: {
          status: true,
          message: "Please accept to proceed.",
        },
      })
    }
  }
  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ul>
              This is a platform to communicate with other person. Everyone participating in the
              application is encoraged to abide by the following instructions:
              <li>Donot use offensive word</li>
            </ul>
            <FormControl required error={error.accept.status} component="fieldset">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accept}
                    onChange={() => {
                      setAccept(!accept)
                    }}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Accept the tearms"
              />
              <FormHelperText>{error.accept.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6} spacing={2}>
            <div className={classes.container}>
              <TextField
                id="name"
                label="Enter your Name"
                onChange={handleChange}
                error={error.name.status}
                helperText={error.name.message}
              />
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  handleClick("joinGlobalChat")
                }}
              >
                Join Global chat
              </Button>
              <p className={classes.p}>OR</p>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  handleClick("hostRoom")
                }}
              >
                Host room
              </Button>
              <p className={classes.p}>OR</p>
              <TextField
                id="roomId"
                label="Enter Room Id to join"
                onChange={handleChange}
                error={error.roomId.status}
                helperText={error.roomId.message}
              />
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  handleClick("joinRoom")
                }}
              >
                Join Room
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default Home
