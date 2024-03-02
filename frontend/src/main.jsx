import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Workoutcontextprovider } from "./context/Workoutcontext.jsx";
import { Authcontextprovider } from "./context/Authcontext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Authcontextprovider>
      <Workoutcontextprovider>
        <App />
      </Workoutcontextprovider>
    </Authcontextprovider>
  </React.StrictMode>
);
