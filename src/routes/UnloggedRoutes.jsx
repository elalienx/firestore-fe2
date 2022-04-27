// NPM package
import { Routes, Route } from "react-router-dom";

// Project files
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotLogged from "../pages/NotLogged";
import SignUp from "../pages/SignUp";

export default function UnloggedRoutes({ uidState }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<SignUp uidState={uidState} />} />
      <Route path="*" element={<NotLogged />} />
    </Routes>
  );
}
