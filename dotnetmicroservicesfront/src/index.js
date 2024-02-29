import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { loadProfileState, loadState, saveProfileState, saveState } from "./localStorage";
const persistedState = loadState();
const profileState = loadProfileState();
const store = createStore(rootReducer, persistedState);
const store2 = createStore(rootReducer, profileState);


store.subscribe(() => {
  saveState(store);
  saveProfileState(store2);
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
