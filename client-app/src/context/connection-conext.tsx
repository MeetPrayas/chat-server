import * as React from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const initialState = {
  messages: [],
  setUp: {
    name: "",
    type: "",
    roomId: "",
  },
};
var client: W3CWebSocket;
const ConnectionContext = React.createContext<Context>({
  dispatch: () => {},
  state: initialState,
});
ConnectionContext.displayName = "ConnectionContext";

type Message = {
  text: string;
};
type setUp = {
  name: string;
  type: string;
  roomId: string;
};

type State = {
  messages: Message[];
  setUp: setUp;
};
type Action = {
  payload?: any;
  type: string;
};

type Context = {
  state: State;
  dispatch: React.Dispatch<Action>;
};
type connection = {
  dispatch: React.Dispatch<Action>;
  name: string;
  roomId: string;
  type: string;
};

const connectionHandler = ({ dispatch, name, roomId, type }: connection) => {
  if (client) client.close();
  client = new W3CWebSocket(
    `ws://localhost:8000?name=${name}&type=${type}&roomId=${roomId}`
  );
  client.onopen = (): void => {
    console.log("WebSocket Client Connected");
  };
  client.onmessage = (message) => {
    dispatch({ type: "message", payload: message.data });
  };
};

function useClientReducer(state: State, action: Action): State {
  switch (action.type) {
    case "set-up":
      return { ...state, setUp: { ...action.payload } };
    case "connect":
      connectionHandler(action.payload);
      action.payload.navigateTO("/chat-box");
      return state;
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

const ConnectionProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(useClientReducer, initialState);

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
