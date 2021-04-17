import * as React from "react"
import { useConnection } from "../../context/connection-conext"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import Send from "./components/send"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  sender: {
    textDecoration: "underline",
    fontSize: "9pt",
    fontWeight: "bold",
    // display: "inline-block",
  },
  messageLeft: {
    fontSize: "10pt",
    display: "inline-block",
    maxWidth: "80%",
  },
  messageRight: {
    fontSize: "10pt",
    textAlign: "right",
    paddingLeft: "20%",
  },
  container: {
    margin: "0 auto",
    maxWidth: "80%",
    height: "470px",
    overflow: "auto",
    padding: "10px 25px 0 25px",
  },
  box: {},
})

//props
//hooks
//render props

interface Props {}

const AlwaysScrollToBottom = () => {
  const elementRef = React.useRef<any>()
  React.useEffect(() => elementRef.current.scrollIntoView())
  return <div ref={elementRef} />
}

const ChatBox: React.FC<Props> = () => {
  const { state, dispatch } = useConnection()
  const [text, setText] = React.useState<string>("")
  const classes = useStyles()

  const onSend = (type: string) => {
    if (text.trim()) {
      dispatch({ type: type, payload: { name: "prayas", note: text.trim() } })
      setText("")
    }
  }
  const handleChange = (e: any) => {
    setText(e.target.value)
  }

  return (
    <React.Fragment>
      <Paper className={classes.container}>
        {state.messages.map((message: any) => {
          return (
            // <Box>
            message.name !== "you" ? (
              <>
                <Typography variant="h6" className={classes.sender}>
                  {message.name}
                </Typography>
                <Typography variant="body1" className={classes.messageLeft}>
                  {message.message}
                </Typography>
              </>
            ) : (
              <Typography
                className={classes.messageRight}
                style={{ textAlign: "right" }}
                variant="body1"
              >
                {message.message}
              </Typography>
            )
            // </Box>
          )
        })}
        <AlwaysScrollToBottom />
      </Paper>
      <Send text={text} handleChange={handleChange} onSend={onSend} />
    </React.Fragment>
  )
}

export default ChatBox
