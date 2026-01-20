import React from 'react';
import './AdminDashboard.css'; // Import the separate CSS file

// Placeholder Imports
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const AdminDashboard = () => {


    return (
        <div className="dashboard-container">

            {/* Sidebar Wrapper */}
            <div className="sidebar-wrapper">
                <Sidebar />
            </div>

            {/* Main Content Wrapper */}
            <div className="main-content-wrapper">

                {/* Top Header */}
                <Header />

                {/* Scrollable Main Area */}
                <main className="dashboard-main">
                    <div className="container">

                        {/* Page Title & Actions */}
                        <div className="page-header">
                            <h1 className="page-title">대시보드</h1>
                            {/* <button className="btn-primary">
                                + New Order
                            </button> */}
                        </div>

                        {/* KPI Stats Grid */}
                        {/* <div className="stats-grid">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-card">
                                    <h2 className="stat-title">{stat.title}</h2>
                                    <div className="stat-value-wrapper">
                                        <span className="stat-value">{stat.value}</span>
                                        <span className={`stat-change ${stat.type === 'positive' ? 'text-green' :
                                            stat.type === 'negative' ? 'text-red' : 'text-gray'
                                            }`}>
                                            {stat.change}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div> */}

                        {/* Charts & Notifications Grid */}
                        <div className="content-grid">

                            {/* Main Chart Area */}
                            {/* <div className="card">
                                <div className="chart-placeholder">
                                    <span style={{ fontSize: '1.2rem', fontWeight: 500 }}>[ Chart.js / Recharts Component ]</span>
                                    <span style={{ fontSize: '0.9rem', marginTop: '10px' }}>Monthly Revenue Analytics</span>
                                </div>
                            </div> */}

                            {/* Notifications / Tasks */}
                            {/* <div className="card">
                                <h3 className="table-title" style={{ marginBottom: '16px' }}>System Notifications</h3>
                                <ul className="notification-list">
                                    <li className="notification-item">
                                        <div className="dot" style={{ backgroundColor: '#ef4444' }}></div>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#4b5563' }}>Server maintenance Sunday 2 AM.</p>
                                    </li>
                                    <li className="notification-item">
                                        <div className="dot" style={{ backgroundColor: '#eab308' }}></div>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#4b5563' }}>5 pending user approvals.</p>
                                    </li>
                                    <li className="notification-item">
                                        <div className="dot" style={{ backgroundColor: '#22c55e' }}></div>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#4b5563' }}>Backup completed successfully.</p>
                                    </li>
                                </ul>
                            </div> */}
                        </div>

                        {/* Recent Orders Table */}
                        <div className="table-container">
                            {/* <div className="table-header">
                                <h3 className="table-title">Recent Transactions</h3>
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Client</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map((order) => (
                                            <tr key={order.id}>
                                                <td style={{ fontWeight: 500, color: '#111827' }}>{order.id}</td>
                                                <td>{order.client}</td>
                                                <td>{order.amount}</td>
                                                <td>
                                                    <span className={`badge ${order.status === 'Completed' ? 'badge-completed' :
                                                        order.status === 'Processing' ? 'badge-processing' :
                                                            'badge-pending'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="action-link">View</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> */}
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;