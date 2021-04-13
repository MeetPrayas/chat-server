import * as React from "react";
import { useConnection } from "../../context/connection-conext";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

//props
//hooks
//render props
interface Message {
  name: string;
  message: string;
}
interface Props {}

const ChatBox: React.FC<Props> = () => {
  const { state, dispatch } = useConnection();
  const [text, setText] = React.useState<string>("");
  const onClickhandle = (type: string) => {
    if (text.trim()) {
      dispatch({ type: type, payload: { name: "prayas", note: text.trim() } });
      setText("");
    }
  };
  const handleChange = (e: any) => {
    setText(e.target.value);
  };

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
        <Box my={2}>
          {state.messages.map((message: any) => {
            return (
              <p>
                {message.name} : {message.message}
              </p>
            );
          })}
        </Box>
      </Container>
      <div>
        <input
          value={text}
          type="text"
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") onClickhandle("send-message");
          }}
        />

        <button onClick={() => onClickhandle("send-message")}>click me</button>
      </div>
    </React.Fragment>
  );
};

export default ChatBox;
