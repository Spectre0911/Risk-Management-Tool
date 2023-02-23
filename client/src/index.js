import React from "react";

import ReactDOM from "react-dom/client";

import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import { allReducers } from "./reducers";
import { createStore } from "redux";

// REDUX
import { ProSidebarProvider } from "react-pro-sidebar";
const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

root.render(
  <Provider store={store}>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </Provider>
);
