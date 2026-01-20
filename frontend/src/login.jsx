import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      const user = res.data; // JSON 로그인
      console.log("로그인 성공:", user);

      sessionStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
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
          {/* 이메일 */}
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

          {/* 비밀번호 */}
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

          {/* 버튼 영역 */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" style={{ flex: 1, padding: "10px" }}>
              로그인
            </button>

            <button
              type="button"
              style={{ flex: 1, padding: "10px" }}
              onClick={() => navigate("/signup")}
            >
              회원가입
            </button>
          </div>
          {/* 비밀번호 찾기 링크 */}
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
