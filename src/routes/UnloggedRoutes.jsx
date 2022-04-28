// NPM package
import { Routes, Route } from "react-router-dom";

// Project files
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotLogged from "../pages/NotLogged";
import RecoverPassword from "../pages/RecoverPassword";
import SignUp from "../pages/SignUp";

export default function UnloggedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="recover-password" element={<RecoverPassword />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="*" element={<NotLogged />} />
    </Routes>
  );
}
