import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import App from "./components/app";
import store from "./store/store";

const theme = createMuiTheme({
  palette: {
    primary: { "500": "#176f8a" },
    secondary: { main: "#fff" }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
