import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import FindPass from "./FindPass.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/findpass" element={<FindPass />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);