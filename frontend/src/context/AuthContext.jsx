import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios"; // axios 인스턴스 재사용

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null); // JWT 저장용

    // 초기 세션 정보 불러오기
    useEffect(() => {
        const savedUser = sessionStorage.getItem("user");
        const savedToken = sessionStorage.getItem("accessToken");
        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setAccessToken(savedToken);
        }
    }, []);

    // 로그인 함수: 서버 API 호출
    const login = async (email, password) => {
        try {
            const response = await api.post("/auth/login", { email, password }); // 이미 axios.js에 api 인스턴스를 만들어두었으므로, 하드코딩수정 대신 여기서 재사용한것
            const { accessToken, user } = response.data;

            // 상태 및 세션 저장
            setUser(user);
            setAccessToken(accessToken);
            sessionStorage.setItem("user", JSON.stringify(user));
            sessionStorage.setItem("accessToken", accessToken);

            return { success: true };   // 서버 응답에 따라 상태를 쉽게 처리하기 위함. 성공/실패 여부를 쉽게 확인하려고 만든 구조. 편의상 만들어 놓은 체크용 값
            // 서버는 HTTP 상태 코드 + 실제 데이터만 반환하고, 프론트는 그걸 success: true/false 형태로 바꿔서 사용자 인터페이스에서 처리하기 쉽게 만든 것
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "로그인 실패" };
        }
    };

    // 로그아웃 함수
    const logout = () => {
        setUser(null);
        setAccessToken(null);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("accessToken");
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
