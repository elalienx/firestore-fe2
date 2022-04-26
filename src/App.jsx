// NPM package
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

// Project files
import LoggedRoutes from "./routes/LoggedRoutes";
import UnloggedRoutes from "./routes/UnloggedRoutes";
import "./styles/style.css";

export default function App() {
  const [uid, setUID] = useState(null);

  console.log("App.jsx uid", uid);

  return (
    <div className="App">
      <BrowserRouter>
        {uid && <LoggedRoutes uidState={[uid, setUID]} />}
        {!uid && <UnloggedRoutes uidState={[uid, setUID]} />}
      </BrowserRouter>
    </div>
  );
}
