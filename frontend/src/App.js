import React, { useState } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import StaffDashboard from './components/staff/StaffDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import './App.css';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));

  const handleLogin = (userRole) => {
    localStorage.setItem('role', userRole);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    setRole(null);
  };

  if (!role) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <button
        onClick={handleLogout}
        style={{
          float: 'right',
          margin: '20px',
          padding: '10px'
        }}
      >
        Logout
      </button>

      {role === 'admin' && <AdminDashboard />}
      {role === 'staff' && <StaffDashboard />}
      {role === 'student' && <StudentDashboard />}
    </div>
  );
}

export default App;