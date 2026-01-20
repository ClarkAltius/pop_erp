import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PASSWORD_REGEX = /^[A-Z][A-Za-z0-9!@#$%^&*]{7,}$/;
const PHONE_REGEX = /^(\d{2,3}-\d{3,4}-\d{4})$/;

export default function Signup() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        full_name: "",
        address: "",
        phone: "",
        role: "",
        brand_id: "",
        default_popup_store_id: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        full_name: "",
        address: "",
        phone: "",
        general: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === "email") {
            setErrors((prev) => ({
                ...prev,
                email: value.includes("@") ? "" : "올바른 이메일 형식이 아닙니다.",
            }));
        }

        if (name === "password") {
            setErrors((prev) => ({
                ...prev,
                password: PASSWORD_REGEX.test(value)
                    ? ""
                    : "비밀번호는 첫 글자가 대문자이고 8자 이상이어야 합니다.",
            }));

            if (form.confirmPassword && value !== form.confirmPassword) {
                setErrors((prev) => ({
                    ...prev,
                    confirmPassword: "비밀번호가 일치하지 않습니다.",
                }));
            } else {
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
            }
        }

        if (name === "confirmPassword") {
            setErrors((prev) => ({
                ...prev,
                confirmPassword:
                    value === form.password ? "" : "비밀번호가 일치하지 않습니다.",
            }));
        }

        if (name === "full_name") {
            setErrors((prev) => ({
                ...prev,
                full_name: value.trim() ? "" : "이름은 필수 입력입니다.",
            }));
        }

        if (name === "address") {
            setErrors((prev) => ({
                ...prev,
                address: value.trim() ? "" : "주소는 필수 입력입니다.",
            }));
        }

        if (name === "phone") {
            setErrors((prev) => ({
                ...prev,
                phone: PHONE_REGEX.test(value)
                    ? ""
                    : "전화번호 형식이 올바르지 않습니다. (000-0000-0000)",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!PHONE_REGEX.test(form.phone)) {
            setErrors((prev) => ({
                ...prev,
                phone: "전화번호 형식이 올바르지 않습니다. (000-0000-0000)",
            }));
            return;
        }

        if (
            errors.email ||
            errors.password ||
            errors.confirmPassword ||
            errors.full_name ||
            errors.address ||
            errors.phone
        ) {
            return;
        }

        const payload = {
            email: form.email,
            password: form.password,
            full_name: form.full_name,
            address: form.address,
            phone: form.phone,
            role: form.role,
            brand_id: form.brand_id ? Number(form.brand_id) : null,
            default_popup_store_id: form.default_popup_store_id
                ? Number(form.default_popup_store_id) : null,
        };

        try {
            await axios.post("http://localhost:8080/api/signup", payload);
            alert("회원가입 완료");
            navigate("/login");
        } catch (error) {
            console.error(error);
            setErrors((prev) => ({
                ...prev,
                general: "회원가입에 실패했습니다. 다시 시도해주세요.",
            }));
        }
    };

    const rowStyle = {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "12px",
    };

    const labelStyle = {
        width: "120px",
        fontWeight: "bold",
    };

    const inputStyle = {
        flex: 1,
        padding: "8px",
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", height: "100vh", alignItems: "center" }}>
            <div style={{ width: "420px", padding: "30px" }}>
                <h2 style={{ textAlign: "center" }}>회원가입</h2>

                {errors.general && (
                    <p style={{ color: "red", textAlign: "center" }}>
                        {errors.general}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={rowStyle}>
                        <label style={labelStyle}>이메일</label>
                        <input name="email" placeholder="이메일을 입력해 주세요." value={form.email} onChange={handleChange} style={inputStyle} />
                    </div>
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

                    <div style={rowStyle}>
                        <label style={labelStyle}>비밀번호</label>
                        <input type="password" name="password" placeholder="비밀 번호를 입력해 주세요." value={form.password} onChange={handleChange} style={inputStyle} />
                    </div>
                    {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

                    <div style={rowStyle}>
                        <label style={labelStyle}>비밀번호 확인</label>
                        <input type="password" name="confirmPassword" placeholder="비밀 번호를 다시 입력해 주세요." value={form.confirmPassword} onChange={handleChange} style={inputStyle} />
                    </div>
                    {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}

                    <div style={rowStyle}>
                        <label style={labelStyle}>이름</label>
                        <input name="full_name" placeholder="이름을 입력해 주세요." value={form.full_name} onChange={handleChange} style={inputStyle} />
                    </div>

                    <div style={rowStyle}>
                        <label style={labelStyle}>주소</label>
                        <input name="address" placeholder="주소를 입력해 주세요." value={form.address} onChange={handleChange} style={inputStyle} />
                    </div>

                    <div style={rowStyle}>
                        <label style={labelStyle}>전화번호</label>
                        <input
                            name="phone"
                            placeholder='전화번호에 "-"을 넣어 입력해 주세요.'
                            value={form.phone}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>
                    {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

                    <div style={rowStyle}>
                        <label style={labelStyle}>권한</label>
                        <select name="role" value={form.role} onChange={handleChange} style={inputStyle}>
                            <option value="" disabled>선택</option>
                            <option value="super_admin">슈퍼관리자</option>
                            <option value="manager">매니저</option>
                            <option value="staff">직원</option>
                        </select>
                    </div>

                    <div style={rowStyle}>
                        <label style={labelStyle}>브랜드 ID</label>
                        <input
                            type="number"
                            name="brand_id"
                            placeholder="(선택사항)"
                            value={form.brand_id}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>

                    <div style={rowStyle}>
                        <label style={labelStyle}>기본 스토어 ID</label>
                        <input
                            type="number"
                            name="default_popup_store_id"
                            placeholder="(선택사항)"
                            value={form.default_popup_store_id}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                        <button type="submit" style={{ flex: 1 }}>회원가입</button>
                        <button type="button" style={{ flex: 1 }} onClick={() => navigate("/login")}>
                            이전으로
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
