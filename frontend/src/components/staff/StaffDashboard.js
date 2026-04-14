import React, { useState } from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://student-information-system-f2js.onrender.com/api'
});

API.interceptors.request.use((req) => {
  req.headers['x-auth-token'] = localStorage.getItem('token');
  return req;
});

export default function StaffDashboard() {
  const [formData, setFormData] = useState({
    rollNumber: '',
    subject: '',
    marks: '',
    attendance: '',
    examDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getGrade = (marks) => {
    const m = Number(marks);

    if (m >= 90) return 'A+';
    if (m >= 80) return 'A';
    if (m >= 70) return 'B+';
    if (m >= 60) return 'B';
    if (m >= 50) return 'C';
    return 'F';
  };

  const saveRecord = async () => {
    try {
      const grade = getGrade(formData.marks);

      await API.post('/staff/update-student', {
        ...formData,
        grade
      });

      alert('Student record updated successfully');
    } catch (error) {
      alert('Save failed');
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>
        👩‍🏫 Staff Dashboard
      </h1>

      <input
        name="rollNumber"
        placeholder="Roll Number"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="subject"
        placeholder="Subject"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="marks"
        placeholder="Marks"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="attendance"
        placeholder="Attendance %"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="date"
        name="examDate"
        onChange={handleChange}
        style={inputStyle}
      />

      <button
        onClick={saveRecord}
        style={buttonStyle}
      >
        Save Record
      </button>
    </div>
  );
}

const containerStyle = {
  maxWidth: '700px',
  margin: 'auto',
  padding: '30px',
  textAlign: 'center'
};

const headingStyle = {
  marginBottom: '30px'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px'
};

const buttonStyle = {
  padding: '10px 20px'
};