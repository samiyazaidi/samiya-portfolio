
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/App";
import "./index.css";

// Prevent browser scroll restoration.
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

// Start at the absolute top on page load.
window.scrollTo({
  top: 0,
  left: 0,
  behavior: "auto",
});

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
