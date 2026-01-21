import React, { useState } from 'react';
import './Brands.css';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const Brands = () => {

    const [brands, setBrands] = useState([]); // 브랜드 목록을 저장할 state
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    // API 호출
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get("/api/brands"); // API 엔드포인트
                setBrands(response.data); // 받아온 데이터로 브랜드 목록 업데이트
            } catch (err) {
                setError("브랜드 목록을 불러오는 데 실패했습니다."); // 에러 처리
            } finally {
                setLoading(false); // 로딩 끝
            }
        };

        fetchBrands();
    }, []); // 빈 배열을 넣으면 컴포넌트가 처음 렌더링될 때만 호출됨

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
                                <h1 className="page-title">브랜드 일람</h1>
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
                                                    {/* Fix: Check if 1, set class to 'active', otherwise 'inactive' */}
                                                    <span className={`badge status-${brand.is_active === 1 ? 'active' : 'expired'}`}>
                                                        {/* Fix: Display text instead of the number 1 */}
                                                        {brand.is_active === 1 ? '활동중' : '만료'}
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
                                <span className="footer-text">24개 중 3개 표기</span>
                                <div className="pagination-btns">
                                    <button disabled className="page-btn">이전</button>
                                    <button className="page-btn">다음</button>
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