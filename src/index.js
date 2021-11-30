import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";

let 초기값 = null;
function reducer(state = 초기값, 액션) {
  if (액션.type === "세션저장") {
    let copy = [...state];
    copy.push(액션.payload);
    return copy;
  } else {
    return state;
  }
}
let store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
