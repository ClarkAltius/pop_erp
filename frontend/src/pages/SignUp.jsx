// src/pages/SignUp.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js"; // axios 통일

const PASSWORD_REGEX = /^[A-Z][A-Za-z0-9!@#$%^&*]{7,}$/;
const PHONE_REGEX = /^(\d{2,3}-\d{3,4}-\d{4})$/;

export default function SignUp() {
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
        role: "",
        general: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        switch (name) {
            case "email":
                setErrors((prev) => ({
                    ...prev,
                    email: value
                        ? value.includes("@")
                            ? ""
                            : "올바른 이메일 형식이 아닙니다."
                        : "이메일은 필수 입력입니다.",
                }));
                break;

            case "password":
                setErrors((prev) => ({
                    ...prev,
                    password: value
                        ? PASSWORD_REGEX.test(value)
                            ? ""
                            : "비밀번호는 첫 글자가 대문자이고 8자 이상이어야 합니다."
                        : "비밀번호는 필수 입력입니다.",
                    confirmPassword:
                        value && !form.confirmPassword
                            ? "비밀번호를 한번 더 입력해 주세요."
                            : prev.confirmPassword,
                }));
                break;

            case "confirmPassword":
                setErrors((prev) => ({
                    ...prev,
                    confirmPassword: value
                        ? value === form.password
                            ? ""
                            : "비밀번호가 일치하지 않습니다."
                        : "",
                }));
                break;

            case "full_name":
                setErrors((prev) => ({
                    ...prev,
                    full_name: value.trim() ? "" : "이름은 필수 입력입니다.",
                }));
                break;

            case "address":
                setErrors((prev) => ({
                    ...prev,
                    address: value.trim() ? "" : "주소는 필수 입력입니다.",
                }));
                break;

            case "phone":
                setErrors((prev) => ({
                    ...prev,
                    phone: value
                        ? PHONE_REGEX.test(value)
                            ? ""
                            : "전화번호 형식이 올바르지 않습니다. (000-0000-0000)"
                        : "전화번호는 필수 입력입니다.",
                }));
                break;

            case "role":
                setErrors((prev) => ({
                    ...prev,
                    role: value ? "" : "권한을 선택해주세요.",
                }));
                break;

            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 필수 입력 체크
        const newErrors = {
            email: form.email ? "" : "이메일은 필수 입력입니다.",
            password: form.password ? "" : "비밀번호는 필수 입력입니다.",
            confirmPassword:
                form.password && !form.confirmPassword
                    ? "비밀번호를 한번 더 입력해 주세요."
                    : form.confirmPassword && form.password !== form.confirmPassword
                        ? "비밀번호가 일치하지 않습니다."
                        : "",
            full_name: form.full_name ? "" : "이름은 필수 입력입니다.",
            address: form.address ? "" : "주소는 필수 입력입니다.",
            phone: form.phone
                ? PHONE_REGEX.test(form.phone)
                    ? ""
                    : "전화번호 형식이 올바르지 않습니다. (000-0000-0000)"
                : "전화번호는 필수 입력입니다.",
            role: form.role ? "" : "권한을 선택해주세요.",
        };

        setErrors(newErrors);

        // 오류가 하나라도 있으면 제출 중단
        if (Object.values(newErrors).some((msg) => msg)) return;

        const payload = {
            email: form.email,
            password: form.password,
            full_name: form.full_name,
            address: form.address,
            phone: form.phone,
            role: form.role || "staff",
            brand_id: form.brand_id ? Number(form.brand_id) : null,
            default_popup_store_id: form.default_popup_store_id
                ? Number(form.default_popup_store_id)
                : null,
        };

        try {
            await api.post("/signup", payload);
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

    const rowStyle = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" };
    const labelStyle = { width: "120px", fontWeight: "bold" };
    const inputStyle = { flex: 1, padding: "8px" };
    const errorStyle = { color: "red", fontSize: "12px", margin: "2px 0 8px 120px" }; // 120px으로 input 시작점 맞춤

    return (
        <div style={{ display: "flex", justifyContent: "center", height: "100vh", alignItems: "center" }}>
            <div style={{ width: "420px", padding: "30px" }}>
                <h2 style={{ textAlign: "center" }}>회원가입</h2>

                {errors.general && <p style={{ ...errorStyle, marginLeft: 0 }}>{errors.general}</p>}

                <form onSubmit={handleSubmit}>
                    {/* 이메일 */}
                    <div style={rowStyle}>
                        <label style={labelStyle}>이메일</label>
                        <input name="email" placeholder="이메일을 입력해 주세요." value={form.email} onChange={handleChange} style={inputStyle} />
                    </div>
                    {errors.email && <p style={errorStyle}>{errors.email}</p>}

                    {/* 비밀번호 */}
                    <div style={rowStyle}>
                        <label style={labelStyle}>비밀번호</label>
                        <input type="password" name="password" placeholder="비밀 번호를 입력해 주세요." value={form.password} onChange={handleChange} style={inputStyle} />
                    </div>
                    {errors.password && <p style={errorStyle}>{errors.password}</p>}

                    {/* 비밀번호 확인 */}
                    <div style={rowStyle}>
                        <label style={labelStyle}>비밀번호 확인</label>
                        <input type="password" name="confirmPassword" placeholder="비밀 번호를 다시 입력해 주세요." value={form.confirmPassword} onChange={handleChange} style={inputStyle} />
                    </div>
                    {errors.confirmPassword && <p style={errorStyle}>{errors.confirmPassword}</p>}

                    {/* 이름 */}
                    <div style={rowStyle}>
                        <label style={labelStyle}>이름</label>
                        <input name="full_name" placeholder="이름을 입력해 주세요." value={form.full_name} onChange={handleChange} style={inputStyle} />
                    </div>
                    {errors.full_name && <p style={errorStyle}>{errors.full_name}</p>}

                    {/* 주소 */}
                    <div style={rowStyle}>
                        <label style={labelStyle}>주소</label>
                        <input name="address" placeholder="주소를 입력해 주세요." value={form.address} onChange={handleChange} style={inputStyle} />
                    </div>
                    {errors.address && <p style={errorStyle}>{errors.address}</p>}

                    {/* 전화번호 */}
                    <div style={rowStyle}>
                        <label style={labelStyle}>전화번호</label>
                        <input name="phone" placeholder='전화번호에 "-"을 넣어 입력해 주세요.' value={form.phone} onChange={handleChange} style={inputStyle} />
                    </div>
                    {errors.phone && <p style={errorStyle}>{errors.phone}</p>}

                    {/* 권한 */}
                    <div style={rowStyle}>
                        <label style={labelStyle}>권한</label>
                        <select name="role" value={form.role} onChange={handleChange} style={inputStyle}>
                            <option value="" disabled>선택</option>
                            <option value="super_admin">슈퍼관리자</option>
                            <option value="manager">매니저</option>
                            <option value="staff">직원</option>
                        </select>
                    </div>
                    {errors.role && <p style={errorStyle}>{errors.role}</p>}

                    {/* 브랜드 ID */}
                    <div style={rowStyle}>
                        <label style={labelStyle}>브랜드 ID</label>
                        <input type="number" name="brand_id" placeholder="(선택사항)" value={form.brand_id} onChange={handleChange} style={inputStyle} />
                    </div>

                    {/* 기본 스토어 ID */}
                    <div style={rowStyle}>
                        <label style={labelStyle}>기본 스토어 ID</label>
                        <input type="number" name="default_popup_store_id" placeholder="(선택사항)" value={form.default_popup_store_id} onChange={handleChange} style={inputStyle} />
                    </div>

                    {/* 버튼 */}
                    <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                        <button type="submit" style={{ flex: 1 }}>회원가입</button>
                        <button type="button" style={{ flex: 1 }} onClick={() => navigate("/login")}>이전으로</button>
                    </div>
                </form>
            </div>
        </div>
    );
}