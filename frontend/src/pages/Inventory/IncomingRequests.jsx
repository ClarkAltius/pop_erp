import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Inventory.css';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

function IncomingRequests() {


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
                                <h1 className="page-title">입고/출고 관리</h1>
                                <p className="page-subtitle">프로젝트 생성/수정/삭제</p>
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
                                </table>
                            </div>

                            <div className="table-footer">
                                <span className="footer-text">10개 중 2개 표기</span>
                                <div className="pagination-btns">
                                    <button className="page-btn">이전</button>
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

export default IncomingRequests;