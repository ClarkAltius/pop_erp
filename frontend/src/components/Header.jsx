
import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="top-header">
            {/* Search Bar */}
            <div className="header-left">
                <div className="search-box">
                    <span className="search-icon"></span>
                    <input
                        type="text"
                        placeholder="Search orders, clients, items..."
                        className="search-input"
                    />
                </div>
            </div>

            {/* Right Side Icons & Profile */}
            <div className="header-right">

                {/* Notifications */}
                <button className="icon-btn">
                    <span className="icon"></span>
                </button>

                {/* User Profile */}
                <div className="user-profile">
                    <div className="user-info">
                        <span className="user-name">홍길동</span>
                        <span className="user-role">관리자</span>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;