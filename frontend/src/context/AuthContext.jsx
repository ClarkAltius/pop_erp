import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // axios를 사용해 API 호출

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
            const response = await axios.post("http://localhost:9980/api/auth/login",
                { email, password });
            const { accessToken, user } = response.data;

            // 상태 및 세션 저장
            setUser(user);
            setAccessToken(accessToken);
            sessionStorage.setItem("user", JSON.stringify(user));
            sessionStorage.setItem("accessToken", accessToken);

            return { success: true };
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

// 훅
export const useAuth = () => useContext(AuthContext);
