import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AdminDashboard from './components/admin/AdminDashboard';
import StaffDashboard from './components/staff/StaffDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  if (!token) return <Login setToken={setToken} setUser={setUser} />;

  return (
    <BrowserRouter>
      <div className="app">
        <Toaster position="top-right" />
        <Navbar user={user} onLogout={handleLogout} />
        <div className="container">
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/staff" element={<StaffDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/" element={<Navigate to={user?.role === 'admin' ? '/admin' : user?.role === 'staff' ? '/staff' : '/student'} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
