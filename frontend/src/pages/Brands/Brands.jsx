import React, { useState } from 'react';
import './Brands.css';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const Brands = () => {
    // Mock Data: Brands & Contract Details
    const [brands] = useState([
        {
            id: 1,
            name: "Nike",
            contact_email: "procurement@nike.com",
            is_active: 1, // 1 = active
            commission_rate: 0.15,
        },
        {
            id: 2,
            name: "카카오프렌즈",
            contact_email: "procurement@kakao.com",
            is_active: 1, // 1 = active
            commission_rate: 0.15,
        },
        {
            id: 3,
            name: "먼작귀",
            contact_email: "procurement@chiikawa.com",
            is_active: 1, // 1 = active
            commission_rate: 0.15,
        },
    ]);
    // Mock Data End

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