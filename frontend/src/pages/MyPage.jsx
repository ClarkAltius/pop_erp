import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PASSWORD_REGEX = /^[A-Z][A-Za-z0-9!@#$%^&*]{7,}$/;
const PHONE_REGEX = /^(\d{2,3}-\d{3,4}-\d{4})$/;

export default function MyPage() {
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
        password: "",
        confirmPassword: "",
        full_name: "",
        address: "",
        phone: "",
        general: "",
    });

    const navigate = useNavigate();

    // 🔐 로그인 여부 확인 (백엔드 붙이면 주석 해제)
    const checkLogin = async () => {
        try {
            // await axios.get("http://localhost:8080/api/auth/me");
            return true;
        } catch (err) {
            return false;
        }
    };

    useEffect(() => {
        async function initMyPage() {

            // 🔒 로그인 체크 (현재는 비활성화)
            /*
            const isLoggedIn = await checkLogin();
            if (!isLoggedIn) {
                navigate("/login");
                return;
            }
            */

            // 👤 유저 정보 조회
            try {
                const res = await axios.get("http://localhost:8080/api/user");
                setForm({ ...res.data, password: "", confirmPassword: "" });
            } catch (err) {
                console.error(err);
                alert("유저 정보를 불러오지 못했습니다.");
            }
        }

        initMyPage();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === "password") {
            setErrors(prev => ({
                ...prev,
                password: value && !PASSWORD_REGEX.test(value)
                    ? "비밀번호는 첫 글자가 대문자이고 8자 이상이어야 합니다."
                    : ""
            }));

            if (form.confirmPassword && value !== form.confirmPassword) {
                setErrors(prev => ({ ...prev, confirmPassword: "비밀번호가 일치하지 않습니다." }));
            } else {
                setErrors(prev => ({ ...prev, confirmPassword: "" }));
            }
        }

        if (name === "confirmPassword") {
            setErrors(prev => ({
                ...prev,
                confirmPassword: value !== form.password ? "비밀번호가 일치하지 않습니다." : ""
            }));
        }

        if (name === "full_name") {
            setErrors(prev => ({
                ...prev,
                full_name: value.trim() ? "" : "이름은 필수 입력입니다."
            }));
        }

        if (name === "address") {
            setErrors(prev => ({
                ...prev,
                address: value.trim() ? "" : "주소는 필수 입력입니다."
            }));
        }

        if (name === "phone") {
            setErrors(prev => ({
                ...prev,
                phone: PHONE_REGEX.test(value)
                    ? ""
                    : "전화번호 형식이 올바르지 않습니다. (000-0000-0000)"
            }));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (form.password && !PASSWORD_REGEX.test(form.password)) return;
        if (!PHONE_REGEX.test(form.phone)) {
            setErrors(prev => ({
                ...prev,
                phone: "전화번호 형식이 올바르지 않습니다. (000-0000-0000)"
            }));
            return;
        }

        if (
            errors.password ||
            errors.confirmPassword ||
            errors.full_name ||
            errors.address ||
            errors.phone
        ) return;

        try {
            await axios.put("http://localhost:8080/api/user", {
                email: form.email,
                full_name: form.full_name,
                address: form.address,
                phone: form.phone,
                password: form.password || undefined,
            });
            alert("회원 정보가 수정되었습니다.");
            setForm(prev => ({ ...prev, password: "", confirmPassword: "" }));
        } catch (err) {
            console.error(err);
            setErrors(prev => ({ ...prev, general: "회원 정보 수정 실패" }));
        }
    };

    const handleLogout = () => {
        // await axios.post("http://localhost:8080/api/logout");
        navigate("/login");
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "정말로 회원 탈퇴를 하시겠습니까?\n탈퇴 후에는 복구할 수 없습니다."
        );
        if (!confirmed) return;

        try {
            await axios.delete("http://localhost:8080/api/user", {
                data: { email: form.email }
            });
            alert("회원 탈퇴가 완료되었습니다.");
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("회원 탈퇴에 실패했습니다.");
        }
    };

    const labelWidth = "120px";
    const inputPadding = "8px";
    const rowGap = "20px";

    const rowStyle = { display: "flex", alignItems: "center", gap: "10px" };
    const fieldStyle = { marginBottom: rowGap };
    const labelStyle = { width: labelWidth, fontWeight: "bold" };
    const inputStyle = { flex: 1, padding: inputPadding };
    const errorStyle = {
        color: "red",
        fontSize: "12px",
        marginTop: "0",
        marginBottom: "0",
        marginLeft: `calc(${labelWidth} + 10px + ${inputPadding})`
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", height: "100vh", alignItems: "center" }}>
            <div style={{ width: "420px", padding: "30px" }}>
                <h2 style={{ textAlign: "center" }}>마이페이지</h2>

                {errors.general && (
                    <p style={{ ...errorStyle, textAlign: "center" }}>{errors.general}</p>
                )}

                <form onSubmit={handleUpdate}>
                    <div style={fieldStyle}>
                        <div style={rowStyle}>
                            <label style={labelStyle}>이메일</label>
                            <input value={form.email} disabled style={inputStyle} />
                        </div>
                    </div>

                    <div style={fieldStyle}>
                        <div style={rowStyle}>
                            <label style={labelStyle}>비밀번호</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="변경 시 입력"
                                value={form.password}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>
                        {errors.password && <div style={errorStyle}>{errors.password}</div>}
                    </div>

                    <div style={fieldStyle}>
                        <div style={rowStyle}>
                            <label style={labelStyle}>비밀번호 확인</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="변경 시 입력"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>
                        {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword}</div>}
                    </div>

                    <div style={fieldStyle}>
                        <div style={rowStyle}>
                            <label style={labelStyle}>이름</label>
                            <input name="full_name" value={form.full_name} onChange={handleChange} style={inputStyle} />
                        </div>
                        {errors.full_name && <div style={errorStyle}>{errors.full_name}</div>}
                    </div>

                    <div style={fieldStyle}>
                        <div style={rowStyle}>
                            <label style={labelStyle}>주소</label>
                            <input name="address" value={form.address} onChange={handleChange} style={inputStyle} />
                        </div>
                        {errors.address && <div style={errorStyle}>{errors.address}</div>}
                    </div>

                    <div style={fieldStyle}>
                        <div style={rowStyle}>
                            <label style={labelStyle}>전화번호</label>
                            <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle} />
                        </div>
                        {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
                    </div>

                    <div style={fieldStyle}>
                        <div style={rowStyle}>
                            <label style={labelStyle}>권한</label>
                            <input value={form.role} disabled style={inputStyle} />
                        </div>
                    </div>

                    <div style={fieldStyle}>
                        <div style={rowStyle}>
                            <label style={labelStyle}>브랜드 ID</label>
                            <input type="number" value={form.brand_id} disabled style={inputStyle} />
                        </div>
                    </div>

                    <div style={fieldStyle}>
                        <div style={rowStyle}>
                            <label style={labelStyle}>기본 스토어 ID</label>
                            <input type="number" value={form.default_popup_store_id} disabled style={inputStyle} />
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <button type="submit" style={{ flex: 1 }}>정보 수정</button>
                        <button type="button" style={{ flex: 1 }} onClick={handleLogout}>로그아웃</button>
                    </div>

                    <button
                        type="button"
                        onClick={handleDeleteAccount}
                        style={{
                            width: "100%",
                            marginTop: "20px",
                            backgroundColor: "#ff4d4f",
                            color: "white",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer"
                        }}
                    >
                        회원 탈퇴
                    </button>
                </form>
            </div>
        </div>
    );
}
