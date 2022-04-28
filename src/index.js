// NPM packages
import React from "react";
import ReactDOM from "react-dom/client";

// Project files
import App from "./App";
import { UIDProvider } from "./state/UIDContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UIDProvider>
    <App />
  </UIDProvider>
);
