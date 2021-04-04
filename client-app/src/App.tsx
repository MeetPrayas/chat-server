import React, { Suspense, useState, createContext } from "react";
import "./App.css";
import { ConnectionProvider } from "./context/connection-conext";
import AppRoutes from "./Routes";
import lightTheme from "./theme/LightTheme";
import darkTheme from "./theme/DarkTheme";
import { ThemeProvider } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  return (
    <Suspense
      fallback={
        <Backdrop open={true}>
          <CircularProgress />
        </Backdrop>
      }
    >
      <ThemeProvider theme={lightTheme}>
        <ConnectionProvider>
          <Paper>
            <AppRoutes />
          </Paper>
        </ConnectionProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
