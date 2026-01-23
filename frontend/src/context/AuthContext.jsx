// src/context/AuthContext.jsx
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
        const response = await api.post("/auth/login", { email, password }); // 이미 axios.js에 api 인스턴스를 만들어두었으므로, 하드코딩수정 대신 여기서 재사용한것
        // 200이면 여기까지 옴, 401이면 axios가 throw

        const { accessToken, user } = response.data;

        // 상태 및 세션 저장
        setUser(user);
        setAccessToken(accessToken);

        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("accessToken", accessToken);

        return response.data;
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
