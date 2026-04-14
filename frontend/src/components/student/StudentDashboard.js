import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://student-information-system-f2js.onrender.com/api'
});

API.interceptors.request.use((req) => {
  req.headers['x-auth-token'] = localStorage.getItem('token');
  return req;
});

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const res = await API.get('/student/dashboard');
      setStudent(res.data.student);
    } catch (error) {
      console.error(error);
    }
  };

  const viewCertificate = () => {
    alert(
      `🎓 CERTIFICATE\n\n` +
      `Name: ${student.name}\n` +
      `Subject: ${student.subject}\n` +
      `Grade: ${student.grade}`
    );
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1>🎓 Learn Bridge Student Dashboard</h1>

      <div style={cardStyle}>
        <p><b>Name:</b> {student.name}</p>
        <p><b>Roll No:</b> {student.rollNumber}</p>
        <p><b>Department:</b> {student.department}</p>
        <p><b>Subject:</b> {student.subject}</p>
        <p><b>Marks:</b> {student.marks}</p>
        <p><b>Attendance:</b> {student.attendance}%</p>
        <p><b>Grade:</b> {student.grade}</p>
        <p><b>Exam Date:</b> {student.examDate}</p>

        <button
          onClick={viewCertificate}
          style={buttonStyle}
        >
          🎓 View Certificate
        </button>
      </div>
    </div>
  );
};

const containerStyle = {
  maxWidth: '800px',
  margin: 'auto',
  padding: '30px'
};

const cardStyle = {
  padding: '20px',
  boxShadow: '0 0 10px #ccc',
  borderRadius: '12px',
  background: '#fff'
};

const buttonStyle = {
  padding: '10px 20px',
  marginTop: '20px',
  cursor: 'pointer'
};

export default StudentDashboard;