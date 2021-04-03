import * as React from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const initialState = {
  messages: [],
};
const client = new W3CWebSocket(`ws://localhost:8999`);
client.onopen = () => {
  console.log("WebSocket Client Connected");
};
const ConnectionContext = React.createContext<Context>({
  dispatch: () => {},
  state: initialState,
});
ConnectionContext.displayName = "ConnectionContext";

type Message = {
  text: string;
};

type State = {
  messages: Message[];
};
type Action = {
  payload?: any;
  type: string;
};

type Context = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

function useClientReducer(state: State, action: Action): State {
  switch (action.type) {
    case "message":
      let list = state.messages.concat(JSON.parse(action.payload));
      return { ...state, messages: list };
    case "send-message":
      client.send(JSON.stringify(action.payload));
      return state;
    default:
      return state;
  }
}

const connectionHandler = (dispatch: any) => {
  client.onmessage = (message) => {
    dispatch({ type: "message", payload: message.data });
  };
};

const ConnectionProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(useClientReducer, initialState);
  React.useEffect(() => connectionHandler(dispatch), []);

  return (
    <ConnectionContext.Provider
      value={{
        state: state,
        dispatch: dispatch,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

const useConnection = () => {
  const context = React.useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }
  return context;
};

export { useConnection, ConnectionProvider };
