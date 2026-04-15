import React, { useState } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import StaffDashboard from './components/staff/StaffDashboard';
import StudentDashboard from './components/student/StudentDashboard';

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

  return (
    <div>
      {role && (
        <button
          onClick={handleLogout}
          style={{
            float: 'right',
            margin: '20px',
            padding: '10px 20px',
            borderRadius: '8px'
          }}
        >
          Logout
        </button>
      )}

      {!role && <Login onLogin={handleLogin} />}

      {role === 'admin' && <AdminDashboard />}
      {role === 'staff' && <StaffDashboard />}
      {role === 'student' && <StudentDashboard />}
    </div>
  );
}

export default App;