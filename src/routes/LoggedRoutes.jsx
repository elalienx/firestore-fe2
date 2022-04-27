// NPM package
import { Routes, Route } from "react-router-dom";

// Project files
import Category from "../pages/Category";
import Dashboard from "../pages/Dashboard";
import Drivers from "../pages/Drivers";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RecoverPassword from "../pages/RecoverPassword";
import SignUp from "../pages/SignUp";
import SubCategory from "../pages/SubCategory";

export default function LoggedRoutes({ uidState }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="category/:categoryId" element={<Category />} />
      <Route path="category/:categoryId/:subId" element={<SubCategory />} />
      <Route path="dashboard" element={<Dashboard uidState={uidState} />} />
      <Route path="drivers" element={<Drivers />} />
      <Route path="login" element={<Login uidState={uidState} />} />
      <Route path="recover-password" element={<RecoverPassword />} />
      <Route path="sign-up" element={<SignUp uidState={uidState} />} />
    </Routes>
  );
}
