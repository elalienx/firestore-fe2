// NPM package
import { Routes, Route } from "react-router-dom";

// Project files
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import NotLogged from "../pages/NotLogged";

export default function UnloggedRoutes({ uidState }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign-up" element={<SignUp uidState={uidState} />} />
      <Route path="*" element={<NotLogged />} />
    </Routes>
  );
}
