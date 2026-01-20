import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        full_name: "",
        role: "staff",               // 기본값 staff
        brand_id: "",
        default_popup_store_id: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: form.email,
            password: form.password,
            full_name: form.full_name,
            role: form.role,
            brand_id: form.brand_id ? Number(form.brand_id) : null,
            default_popup_store_id: form.default_popup_store_id ? Number(form.default_popup_store_id) : null,
        };

        console.log("회원가입 데이터:", payload);

        alert("회원가입 완료");
        navigate("/login"); // 가입 후 로그인 페이지로 이동
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
                    width: "350px",
                    padding: "30px",
                    borderRadius: "10px",
                }}
            >
                <h2 style={{ textAlign: "center" }}>회원가입</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="이메일"
                        value={form.email}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        value={form.password}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                        required
                    />
                    <input
                        name="full_name"
                        type="text"
                        placeholder="이름"
                        value={form.full_name}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                        required
                    />
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                        required
                    >
                        <option value="staff">직원</option>
                        <option value="manager">매니저</option>
                        <option value="super_admin">슈퍼관리자</option>
                    </select>
                    <input
                        name="brand_id"
                        type="number"
                        placeholder="브랜드 ID (선택)"
                        value={form.brand_id}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                    />
                    <input
                        name="default_popup_store_id"
                        type="number"
                        placeholder="기본 팝업스토어 ID (선택)"
                        value={form.default_popup_store_id}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                    />
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button type="submit" style={{ flex: 1 }}>
                            회원가입
                        </button>
                        <button
                            type="button"
                            style={{ flex: 1 }}
                            onClick={() => navigate("/login")}
                        >
                            이전으로
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
