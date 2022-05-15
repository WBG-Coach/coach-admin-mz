import { ThemeProvider } from "styled-components";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { theme } from "./theme";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
