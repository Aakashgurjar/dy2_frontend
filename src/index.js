import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// import { UserProvider } from "./context/UserProvider";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";


const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
  <BrowserRouter>
   
      <App />
      <Toaster />
   
  </BrowserRouter>
  </React.StrictMode>
);

// export {UserContext}