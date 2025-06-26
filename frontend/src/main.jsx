import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import HouseContext from "./context/HouseContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HouseContext>
        <App />
      </HouseContext>
    </BrowserRouter>
  </StrictMode>
);
