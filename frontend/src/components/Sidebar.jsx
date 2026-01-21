import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
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
                    <a href="#" className="nav-item">
                        <span className="nav-icon"></span>
                        CRM / Clients
                    </a>
                </div>

                {/* Section: Operations */}
                <div className="nav-section">
                    <span className="nav-title">Operations</span>
                    <a href="#" className="nav-item">
                        <span className="nav-icon"></span>
                        Inventory
                    </a>
                    <a href="#" className="nav-item">
                        <span className="nav-icon"></span>
                        Brands
                    </a>
                    <a href="#" className="nav-item">
                        <span className="nav-icon"></span>
                        Orders
                    </a>
                    <a href="#" className="nav-item">
                        <span className="nav-icon"></span>
                        Invoices
                    </a>
                </div>

                {/* Section: Admin */}
                <div className="nav-section">
                    <span className="nav-title">Admin</span>
                    <a href="#" className="nav-item">
                        <span className="nav-icon"></span>
                        Settings
                    </a>
                    <a href="#" className="nav-item">
                        <span className="nav-icon"></span>
                        User Roles
                    </a>
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
