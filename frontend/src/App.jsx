import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

// Auth & Components
import { useAuth } from "./context/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

// Pages
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import FindPass from "./pages/FindPass.jsx";
import MyPage from "./pages/MyPage.jsx";
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import Brands from './pages/CRM/Brands.jsx';
import Projects from './pages/CRM/Projects.jsx';
import IncomingRequests from './pages/Inventory/IncomingRequests.jsx';
import Products from './pages/Inventory/Products.jsx';
import StockStatus from './pages/Inventory/StockStatus.jsx';
import Sales from './pages/Accounting/Sales.jsx';
import Settlement from './pages/Accounting/Settlement.jsx';
import Attendance from './pages/StaffManagement/Attendance.jsx';
import StaffRegistration from './pages/StaffManagement/StaffRegistration.jsx';
import WorkSchedule from './pages/StaffManagement/WorkSchedule.jsx';
import VisitorStatistics from './pages/Reports/VisitorStatistics.jsx';
import Analysis from './pages/Reports/Analysis.jsx';
import AccessLog from './pages/Setting/AccessLog.jsx';
import Permission from './pages/Setting/Permission.jsx';

function App() {
  const [isDevMenuOpen, setIsDevMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {/* --- DEV MENU START --- */}
      <div style={styles.devMenuContainer}>
        <button onClick={() => setIsDevMenuOpen(!isDevMenuOpen)} style={styles.devButton}>
          🛠️ Dev Menu {isDevMenuOpen ? '▼' : '▲'}
        </button>
        {isDevMenuOpen && (
          <div style={styles.dropdown}>
            <Link to="/AdminDashboard" style={styles.link} onClick={() => setIsDevMenuOpen(false)}>Admin Dash</Link>
            <Link to="/login" style={styles.link} onClick={() => setIsDevMenuOpen(false)}>Login Page</Link>
          </div>
        )}
      </div>
      {/* --- DEV MENU END --- */}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/findpass" element={<FindPass />} />

        {/* Private Routes Group (Requires Login) */}
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        {/* CRM */}
        <Route path="/Brands" element={<Brands />} />
        <Route path="/Projects" element={<Projects />} />

        {/* Inventory */}
        <Route path="/IncomingRequests" element={<IncomingRequests />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/StockStatus" element={<StockStatus />} />

        {/* Management */}
        <Route path="/Sales" element={<Sales />} />
        <Route path="/Settlement" element={<Settlement />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/StaffRegistration" element={<StaffRegistration />} />
        <Route path="/WorkSchedule" element={<WorkSchedule />} />

        {/* Reports & Settings */}
        <Route path="/VisitorStatistics" element={<VisitorStatistics />} />
        <Route path="/Analysis" element={<Analysis />} />
        <Route path="/AccessLog" element={<AccessLog />} />
        <Route path="/Permission" element={<Permission />} />
        {/* </Route> */}

        {/* Home Logic: Redirect based on auth */}
        <Route path="/" element={<Navigate to={user ? "/AdminDashboard" : "/login"} replace />} />

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  devMenuContainer: { position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 },
  devButton: { backgroundColor: '#000', color: '#0f0', border: '2px solid #0f0', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  dropdown: { position: 'absolute', bottom: '100%', right: '0', marginBottom: '10px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px', display: 'flex', flexDirection: 'column', width: '180px', overflow: 'hidden' },
  link: { padding: '12px', textDecoration: 'none', color: '#333', borderBottom: '1px solid #eee', fontSize: '14px' }
};

export default App;