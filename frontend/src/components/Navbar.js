import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const handleLogout = () => { onLogout(); navigate('/'); };
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">🎓 Student Information System</div>
      <div className="nav-links">
        {user?.role === 'admin' && <Link to="/admin">Dashboard</Link>}
        {user?.role === 'staff' && <Link to="/staff">Dashboard</Link>}
        {user?.role === 'student' && <Link to="/student">Dashboard</Link>}
        <div className="user-info">
          <span>👋 {user?.fullName || user?.username}</span>
          <span className="role-badge">{user?.role?.toUpperCase()}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
