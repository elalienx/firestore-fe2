// NPM package
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

// Project files
import { UIDProvider, useUID } from "./state/UIDContext";
import LoggedRoutes from "./routes/LoggedRoutes";
import UnloggedRoutes from "./routes/UnloggedRoutes";
import "./styles/style.css";

export default function App() {
  // Global state
  const { uid } = useUID();

  return (
    <UIDProvider>
      <div className="App">
        <BrowserRouter>
          {uid && <LoggedRoutes />}
          {!uid && <UnloggedRoutes />}
        </BrowserRouter>
      </div>
    </UIDProvider>
  );
}
