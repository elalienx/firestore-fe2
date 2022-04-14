// NPM package
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Project files
import Drivers from "./pages/Drivers";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="drivers/" element={<Drivers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
