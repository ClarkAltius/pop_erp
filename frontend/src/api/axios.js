// src/api/axios.js json 기반 api 연동
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // 세션 쿠키 기반 인증 사용시 true
});

export default api;
