import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import  store  from "./store";
import { Provider } from "react-redux";
// import { fetchProduct } from "./component/reducer/CallProductAPIReducer";

// store.dispatch(fetchProduct);
ReactDOM.render(
  <Provider store={store}>
     <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>,
  document.getElementById("root")
);

reportWebVitals();
