// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import FindPass from "./pages/FindPass.jsx";
import MyPage from "./pages/MyPage.jsx";

import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx"; // 로그인 필요 컴포넌트 보호용

// ProtectedRoute 대체: PrivateRoute를 통일
// 이렇게도 가능
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 로그인 필요 없는 페이지 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/findpass" element={<FindPass />} />
          <Route path="/mypage" element={<MyPage />} />

          {/* 로그인 해야만 접근 가능 */}
          {/* <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          /> */}

          {/* 루트 경로 / → 로그인 여부 따라 리다이렉트 */}
          {/* <Route
            path="/"
            element={<Navigate to="/mypage" replace />}
          /> */}

          {/* 잘못된 경로 처리 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
