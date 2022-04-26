// NPM package
import { Routes, Route } from "react-router-dom";

// Project files
import Category from "../pages/Category";
import Dashboard from "../pages/Dashboard";
import Drivers from "../pages/Drivers";
import Home from "../pages/Home";
import SubCategory from "../pages/SubCategory";
import SignUp from "../pages/SignUp";

export default function LoggedRoutes({ uidState }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="drivers" element={<Drivers />} />
      <Route path="category/:categoryId" element={<Category />} />
      <Route path="category/:categoryId/:subId" element={<SubCategory />} />
      <Route path="sign-up" element={<SignUp uidState={uidState} />} />
    </Routes>
  );
}
