import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// 페이지 import
import Test1 from './test1';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import Brands from './pages/CRM/Brands.jsx';
import Projects from './pages/CRM/Projects.jsx';
import IncomingRequests from './pages/Inventory/IncomingRequests.jsx';
import Products from './pages/Inventory/Products.jsx';
import StockStatus from './pages/Inventory/StockStatus.jsx';

function App() {
  // State to toggle the dropdown visibility
  const [isDevMenuOpen, setIsDevMenuOpen] = useState(false);

  return (
    <BrowserRouter>

      {/* --- 개발자 메뉴 START --- */}
      <div style={styles.devMenuContainer}>
        <button
          onClick={() => setIsDevMenuOpen(!isDevMenuOpen)}
          style={styles.devButton}
        >
          🛠️ 개발자용 페이지 링크 {isDevMenuOpen ? '▼' : '▲'}
        </button>

        {isDevMenuOpen && (
          <div style={styles.dropdown}>
            <Link to="/test1" style={styles.link} onClick={() => setIsDevMenuOpen(false)}>
              Test Page 1
            </Link>
            <Link to="/AdminDashboard" style={styles.link} onClick={() => setIsDevMenuOpen(false)}>
              Admin Dashboard
            </Link>
            <Link to="/Brands" style={styles.link} onClick={() => setIsDevMenuOpen(false)}>
              Brands List
            </Link>
          </div>
        )}
      </div>
      {/* --- 개발자 메뉴 end --- */}


      {/* Route Definitions */}
      <Routes>
        <Route path="/test1" element={<Test1 />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        {/* CRM */}
        <Route path="/Brands" element={<Brands />} />
        <Route path="/Projects" element={<Projects />} />
        {/* Inventory */}
        <Route path="/IncomingRequests" element={<IncomingRequests />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/StockStatus" element={<StockStatus />} />

      </Routes>

    </BrowserRouter>
  );
}

//  App css 파일과 독립된 개발자 버튼 형식)
const styles = {
  devMenuContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 9999,
    fontFamily: 'sans-serif',
  },
  devButton: {
    backgroundColor: '#000',
    color: '#0f0', // Hacker green text
    border: '2px solid #0f0',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
  },
  dropdown: {
    position: 'absolute',
    bottom: '100%', // Opens upwards
    right: '0',
    marginBottom: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '200px',
  },
  link: {
    padding: '12px 16px',
    textDecoration: 'none',
    color: '#333',
    borderBottom: '1px solid #eee',
    fontSize: '14px',
    transition: 'background 0.2s',
  }
};

export default App;