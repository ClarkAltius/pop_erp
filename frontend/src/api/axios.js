// src/api/axios.js json 기반 api 연동
import axios from "axios";

const api = axios.create({     //axios 인스턴스 생성.모든 API 호출(로그인, 회원가입,사용자 정보 조회 등)에서 공통 설정의 반복을 피하기 위함
    baseURL: import.meta.env.VITE_API_BASE_URL,   // 모든 API 요청의 기본 URL
    headers: {                // 모든 api 요청에 Content-Type: application/json 헤더가 자동 적용
        "Content-Type": "application/json",
    },

});

export default api;
