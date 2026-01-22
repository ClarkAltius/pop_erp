// src/pages/FindPass.jsx
import React, { useState } from "react";
import axios from "axios";

const FindPass = () => {
  const [page, setPage] = useState("check"); // "check" or "edit"
  const [inputs, setInputs] = useState({ name: "", email: "", phone: "" });
  const [editInputs, setEditInputs] = useState({ newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const PASSWORD_REGEX = /^[A-Z][A-Za-z0-9!@#$%^&*]{7,}$/;

  // 사용자 정보 입력 변경
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
    setMessage("");
  };

  // 새 비밀번호 입력 변경
  const handleEditChange = (e) => {
    setEditInputs({ ...editInputs, [e.target.id]: e.target.value });
    setSaveMessage("");
  };

  // 사용자 정보 확인 후 비밀번호 재설정 페이지로 이동
  const handleCheck = async () => {
    const { name, email, phone } = inputs;
    if (!name.trim() || !email?.trim() || !phone?.trim()) {
      setMessage("모든 항목을 입력해주세요.");
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append("name", name);
      params.append("email", email);
      params.append("phone", phone);

      await axios.post(
        "http://localhost:9980/user/reset-password",
        params.toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" }, withCredentials: true }
      );
      setPage("edit");
    } catch (error) {
      setMessage(error.response?.data || "다시 한번 확인해 주세요");
    }
  };

  // 새 비밀번호 저장
  const handleSave = async () => {
    const { name, email, phone } = inputs;
    const { newPassword, confirmPassword } = editInputs;

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setSaveMessage("모든 항목을 입력해주세요.");
      return;
    }

    if (!newPassword.trim() || !confirmPassword?.trim()) {
      setSaveMessage("새 비밀번호를 입력해주세요.");
      return;
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      setSaveMessage("비밀번호를 확인해주세요");
      return;
    }

    if (newPassword !== confirmPassword) {
      setSaveMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    const params = new URLSearchParams();
    params.append("name", name);
    params.append("email", email);
    params.append("phone", phone);
    params.append("newPassword", newPassword);

    try {
      const response = await axios.post(
        "http://localhost:9980/user/reset-password",
        params.toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" }, withCredentials: true }
      );
      setSaveMessage(response.data);
      setEditInputs({ newPassword: "", confirmPassword: "" });
    } catch (error) {
      setSaveMessage(error.response?.data || "서버 오류");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "40px 30px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        {page === "check" && (
          <>
            <h2 style={{ textAlign: "center", marginBottom: "30px" }}>비밀번호 찾기</h2>

            {/* 이름 */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <span style={{ width: "80px", fontWeight: "bold", flexShrink: 0 }}>이름</span>
              <input
                id="name"
                type="text"
                placeholder="이름"
                value={inputs.name}
                onChange={handleChange}
                style={{ flex: 1, padding: "8px" }}
              />
            </div>

            {/* 이메일 */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <span style={{ width: "80px", fontWeight: "bold", flexShrink: 0 }}>이메일</span>
              <input
                id="email"
                type="email"
                placeholder="이메일"
                value={inputs.email}
                onChange={handleChange}
                style={{ flex: 1, padding: "8px" }}
              />
            </div>

            {/* 전화번호 */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <span style={{ width: "80px", fontWeight: "bold", flexShrink: 0 }}>전화번호</span>
              <input
                id="phone"
                type="text"
                placeholder="전화번호"
                value={inputs.phone}
                onChange={handleChange}
                style={{ flex: 1, padding: "8px" }}
              />
            </div>
            <small style={{ display: "block", marginBottom: "10px", marginLeft: "80px" }}>
              ※ 전화번호에 " - "을 넣어 입력해 주세요.
            </small>

            {message && <div style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>{message}</div>}

            <button onClick={handleCheck} style={{ width: "100%", padding: "10px" }}>
              다음
            </button>
          </>
        )}

        {page === "edit" && (
          <>
            <h2 style={{ textAlign: "center", marginBottom: "30px" }}>비밀번호 재설정</h2>

            {/* 새 비밀번호 */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <span style={{ width: "80px", fontWeight: "bold", flexShrink: 0 }}>새 비밀번호</span>
              <input
                id="newPassword"
                type="password"
                value={editInputs.newPassword}
                onChange={handleEditChange}
                style={{ flex: 1, padding: "8px" }}
              />
            </div>

            {/* 비밀번호 확인 */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <span style={{ width: "80px", fontWeight: "bold", flexShrink: 0 }}>비밀번호 확인</span>
              <input
                id="confirmPassword"
                type="password"
                value={editInputs.confirmPassword}
                onChange={handleEditChange}
                style={{ flex: 1, padding: "8px" }}
              />
            </div>
            <small style={{ display: "block", marginBottom: "10px" }}>
              ※ 비밀번호는 첫 글자가 대문자이고, 8자 이상이어야 합니다.
            </small>

            {saveMessage && (
              <div
                style={{
                  color: saveMessage.includes("성공") ? "green" : "red",
                  fontSize: "12px",
                  marginBottom: "10px",
                }}
              >
                {saveMessage}
              </div>
            )}

            <button onClick={handleSave} style={{ width: "100%", padding: "10px" }}>
              저장
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FindPass;
