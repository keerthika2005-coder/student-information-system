import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffDashboard = () => {
  const [stats, setStats] = useState({ totalStudents: 0, totalCourses: 0 });

  useEffect(() => {
    const API = axios.create({ baseURL: 'http://localhost:5000/api' });
    API.interceptors.request.use((req) => {
      req.headers['x-auth-token'] = localStorage.getItem('token');
      return req;
    });
    
    API.get('/staff/dashboard/stats').then(res => setStats(res.data));
  }, []);

  return (
    <div>
      <h2>Staff Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card"><h3>👨‍🎓 Students</h3><div className="number">{stats.totalStudents}</div></div>
        <div className="card"><h3>📚 Courses</h3><div className="number">{stats.totalCourses}</div></div>
      </div>
    </div>
  );
};

export default StaffDashboard;
