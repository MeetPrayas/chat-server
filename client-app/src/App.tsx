import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ConnectionProvider } from "./context/connection-conext";
import MessageBox from "./views/message-box";
function App() {
  return (
    <ConnectionProvider>
      <MessageBox />
    </ConnectionProvider>
  );
}

export default App;
