import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {

    const [isCRMOpen, setIsCRMOpen] = useState(false);
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [isAccountingOpen, setIsAccountingOpen] = useState(false);
    const [isStaffOpen, setIsStaffOpen] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [isSettingOpen, setIsSettingOpen] = useState(false);


    return (
        <aside className="sidebar">
            {/* Brand Logo */}
            <div className="sidebar-header">
                <div className="brand-logo">POP<span className="brand-lite">ERP</span></div>
            </div>

            {/* Navigation Links */}
            <nav className="sidebar-nav">

                {/* Section: Main */}
                <div className="nav-section">
                    <span className="nav-title">Main</span>
                    <a href="#" className="nav-item active">
                        <span className="nav-icon"></span>
                        Dashboard
                    </a>
                    <a
                        href="#"
                        className="nav-item"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsCRMOpen(!isCRMOpen);
                        }}
                    >
                        <span className="nav-icon"></span>
                        CRM / Clients
                    </a>

                    {isCRMOpen && (
                        <div className="sub-menu">
                            <a href="/Projects" className="nav-item sub-item">프로젝트 관리</a>
                            <a href="/Brands" className="nav-item sub-item">브랜드 관리</a>
                        </div>
                    )}
                </div>

                {/* Section: Operations */}
                <div className="nav-section">
                    <span className="nav-title">Operations</span>
                    <a
                        href="#"
                        className="nav-item"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsInventoryOpen(!isInventoryOpen);
                        }}
                    >
                        <span className="nav-icon"></span>
                        Inventory
                    </a>

                    {isInventoryOpen && (
                        <div className="sub-menu">
                            <a href="/Products" className="nav-item sub-item">상품 조회</a>
                            <a href="/IncomingRequests" className="nav-item sub-item">입고/출고 요청</a>
                            <a href="/StockStatus" className="nav-item sub-item">재고 현황</a>
                        </div>
                    )}

                    <a
                        href="#"
                        className="nav-item"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsAccountingOpen(!isAccountingOpen);
                        }}
                    >
                        <span className="nav-icon"></span>
                        Accounting
                    </a>

                    {isAccountingOpen && (
                        <div className="sub-menu">
                            <a href="#" className="nav-item sub-item">매출 현황</a>
                            <a href="#" className="nav-item sub-item">정산 현황</a>
                        </div>
                    )}

                    <a
                        href="#"
                        className="nav-item"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsStaffOpen(!isStaffOpen);
                        }}
                    >
                        <span className="nav-icon"></span>
                        Staff Management
                    </a>

                    {isStaffOpen && (
                        <div className="sub-menu">
                            <a href="#" className="nav-item sub-item">스태프 등록</a>
                            <a href="#" className="nav-item sub-item">출근/퇴근 관리</a>
                            <a href="#" className="nav-item sub-item">근무 스케줄표</a>
                        </div>
                    )}

                    <a
                        href="#"
                        className="nav-item"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsReportOpen(!isReportOpen);
                        }}
                    >
                        <span className="nav-icon"></span>
                        Report
                    </a>

                    {isReportOpen && (
                        <div className="sub-menu">
                            <a href="#" className="nav-item sub-item">방문자 통계</a>
                            <a href="#" className="nav-item sub-item">종료 리포트</a>                        </div>
                    )}
                </div>

                {/* Section: Admin */}
                <div className="nav-section">
                    <span className="nav-title">Admin</span>
                    <a
                        href="#"
                        className="nav-item"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsSettingOpen(!isSettingOpen);
                        }}
                    >
                        <span className="nav-icon"></span>
                        Setting
                    </a>

                    {isSettingOpen && (
                        <div className="sub-menu">
                            <a href="#" className="nav-item sub-item">접속 로그</a>
                            <a href="#" className="nav-item sub-item">권한 관리</a>                        </div>
                    )}

                </div>
            </nav>

            {/* Sidebar Footer */}
            <div className="sidebar-footer">
                <button className="logout-btn">
                    <span className="nav-icon"></span> Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
