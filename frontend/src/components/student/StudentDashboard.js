import React from 'react';

export default function StudentDashboard() {
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>🎓 Student Dashboard</h1>

      <div style={cardStyle}>
        <p><b>Name:</b> Keerthika</p>
        <p><b>Roll No:</b> 101</p>
        <p><b>Attendance:</b> 92%</p>
        <p><b>Grade:</b> A+</p>
        <p><b>Status:</b> Pass</p>
      </div>
    </div>
  );
}

const containerStyle = {
  textAlign: 'center',
  padding: '30px',
  minHeight: '100vh',
  background: '#f4f7fc'
};

const titleStyle = {
  marginBottom: '30px'
};

const cardStyle = {
  width: '350px',
  margin: 'auto',
  padding: '25px',
  borderRadius: '15px',
  background: 'white',
  boxShadow: '0 2px 10px #ccc'
};