import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.scss";

import { store } from "./app/store";
import { Provider } from "react-redux";

// APP
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
