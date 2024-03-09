import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import Store from "./redux/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <HashRouter>
        <Provider store={Store}>
            <App />
        </Provider>
    </HashRouter>
);
