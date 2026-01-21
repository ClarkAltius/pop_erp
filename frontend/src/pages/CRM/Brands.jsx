import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Brands.css';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

function Brands() {

    const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);       // 현재 페이지
    const [limit, setLimit] = useState(10);    // 페이지당 아이템 수
    const [total, setTotal] = useState(0);     // 총 브랜드 개수

    useEffect(() => {
        const fetchBrands = async () => {
            setLoading(true);  // 요청 시작 시 로딩 true
            try {
                const response = await axios.get(`${BACKEND_URL}/brands`, {
                    params: {
                        page: page,
                        limit: limit
                    }
                });
                setBrands(response.data.brands); // 브랜드 목록 업데이트
                setTotal(response.data.total);   // 총 데이터 수 업데이트
            } catch (err) {
                setError("브랜드 목록을 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, [page, limit]); // page 또는 limit 변경 시 API 재호출

    const totalPages = Math.ceil(total / limit);

    const handlePrev = () => {
        setPage(prev => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setPage(prev => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="dashboard-container">

            {/* Sidebar Wrapper */}
            <div className="sidebar-wrapper">
                <Sidebar />
            </div>

            {/* Main Content Wrapper */}
            <div className="main-content-wrapper">
                <Header />

                <main className="dashboard-main">
                    <div className="container">

                        {/* Page Header */}
                        <div className="page-header">
                            <div>
                                <h1 className="page-title">브랜드 관리</h1>
                                <p className="page-subtitle">파트너 관계와 계약 관리</p>
                            </div>
                            <div className="header-actions">
                                <button className="btn-secondary">csv 추출</button>
                                <button className="btn-primary">신규 브랜드 추가</button>
                            </div>
                        </div>

                        {/* Brands Table */}
                        <div className="table-container">
                            <div style={{ overflowX: 'auto' }}>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>브랜드명</th>
                                            <th>담당자</th>
                                            <th>수수료</th>
                                            <th>상태</th>
                                            <th className="text-right">액션</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {brands.map((brand) => (
                                            <tr key={brand.id}>
                                                {/* Brand Column with Logo */}
                                                <td>
                                                    <div className="brand-cell">
                                                        <span className="brand-name">{brand.name}</span>
                                                    </div>
                                                </td>

                                                {/* Contact Info */}
                                                <td>
                                                    <div className="contact-cell">
                                                        <span className="contact-email">{brand.contact_email}</span>
                                                    </div>
                                                </td>

                                                {/* 수수료 */}
                                                <td style={{ fontWeight: 600, color: '#374151' }}>
                                                    {brand.commission_rate}
                                                </td>

                                                <td>
                                                    <span className={`badge status-${brand.active ? 'active' : 'expired'}`}>
                                                        {brand.active ? '활동중' : '만료'}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="text-right">
                                                    <button className="action-icon">✏️</button>
                                                    <button className="action-icon">🗑️</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Placeholder */}
                            <div className="table-footer">
                                <span className="footer-text">{total}개 중 {brands.length}개 표기</span>
                                <div className="pagination-btns">
                                    <button onClick={handlePrev} disabled={page === 1} className="page-btn">이전</button>
                                    <span className="page-info">{page} / {totalPages}</span>
                                    <button onClick={handleNext} disabled={page === totalPages} className="page-btn">다음</button>
                                </div>
                            </div>

                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Brands;