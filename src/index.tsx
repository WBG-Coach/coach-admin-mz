import App from "./app";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
      <ToastContainer position="bottom-right" />
    </ThemeProvider>
  </Provider>
);

reportWebVitals();
