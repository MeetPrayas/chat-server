import React, { Suspense } from "react";
import "./App.css";
import AppProvider from "./context/";
import AppRoutes from "./Routes";
import lightTheme from "./theme/LightTheme";
// import darkTheme from "./theme/DarkTheme";
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
        <AppProvider>
          <Paper>
            <AppRoutes />
          </Paper>
        </AppProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
