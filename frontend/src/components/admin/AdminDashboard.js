import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalStudents: 0, totalStaff: 0, totalCourses: 0 });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const API = axios.create({ baseURL: 'http://localhost:5000/api' });
  API.interceptors.request.use((req) => {
    req.headers['x-auth-token'] = localStorage.getItem('token');
    return req;
  });

  const fetchData = async () => {
    try {
      const statsRes = await API.get('/admin/dashboard/stats');
      const studentsRes = await API.get('/admin/students');
      setStats(statsRes.data);
      setStudents(studentsRes.data);
    } catch (error) {
      toast.error('Error fetching data');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card"><h3>👨‍🎓 Students</h3><div className="number">{stats.totalStudents}</div></div>
        <div className="card"><h3>👨‍🏫 Staff</h3><div className="number">{stats.totalStaff}</div></div>
        <div className="card"><h3>📚 Courses</h3><div className="number">{stats.totalCourses}</div></div>
      </div>
      <h3>Recent Students</h3>
      <table className="data-table">
        <thead><tr><th>Roll No</th><th>Name</th><th>Email</th><th>Department</th></tr></thead>
        <tbody>
          {students.slice(0, 5).map(s => (
            <tr key={s._id}><td>{s.rollNumber}</td><td>{s.name}</td><td>{s.email}</td><td>{s.department}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
