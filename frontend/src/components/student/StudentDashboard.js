import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const API = axios.create({ baseURL: 'http://localhost:5000/api' });
    API.interceptors.request.use((req) => {
      req.headers['x-auth-token'] = localStorage.getItem('token');
      return req;
    });
    
    API.get('/student/dashboard').then(res => setStudent(res.data.student));
  }, []);

  if (!student) return <div className="loading">Loading...</div>;

  return (
    <div>
      <h2>Student Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card"><h3>👨‍🎓 Name</h3><div className="number">{student.name}</div></div>
        <div className="card"><h3>📚 Roll No</h3><div className="number">{student.rollNumber}</div></div>
        <div className="card"><h3>📊 CGPA</h3><div className="number">{student.cgpa || 0}</div></div>
      </div>
    </div>
  );
};

export default StudentDashboard;
