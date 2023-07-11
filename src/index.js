import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FirebaseContext } from "./store/FirebaseContext";
import { firebase } from "./Firebase/config";
import Context from "./store/FirebaseContext";
import Post from "./store/postContext";

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase }}>
    <Post>
      <Context>
        <App/>
      </Context>
    </Post>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
