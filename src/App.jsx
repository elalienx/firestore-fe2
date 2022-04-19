// NPM package
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Project files
import Category from "./pages/Category";
import Drivers from "./pages/Drivers";
import SubCategory from "./pages/SubCategory";
import Home from "./pages/Home";
import "./styles/style.css";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="category/:categoryId" element={<Category />} />
          <Route path="category/:categoryId/:subId" element={<SubCategory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
