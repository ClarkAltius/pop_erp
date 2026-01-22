// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // AuthContext에 로그인 로직 위임
      const result = await login(email, password);

      if (!result.success) {
        alert(result.message || "로그인 실패");
        return;
      }

      // 로그인 성공 후 마이페이지 이동
      navigate("/mypage");
    } catch (err) {
      console.error(err);
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>로그인</h2>

        <form onSubmit={handleLogin}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              gap: "10px",
            }}
          >
            <span style={{ width: "80px", fontWeight: "bold" }}>이메일</span>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ flex: 1, padding: "8px" }}
              required
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "25px",
              gap: "10px",
            }}
          >
            <span style={{ width: "80px", fontWeight: "bold" }}>비밀번호</span>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ flex: 1, padding: "8px" }}
              required
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              style={{ flex: 1, padding: "10px" }}
              disabled={loading}
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>

            <button
              type="button"
              style={{ flex: 1, padding: "10px" }}
              onClick={() => navigate("/signup")}
            >
              회원가입
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link to="/findpass" className="text-muted small">
              비밀번호를 잊으셨나요?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
