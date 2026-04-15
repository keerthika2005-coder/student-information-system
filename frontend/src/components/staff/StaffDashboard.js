import React, { useState } from 'react';

export default function StaffDashboard() {
  const [subject, setSubject] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [attendance, setAttendance] = useState('');
  const [assignment, setAssignment] = useState('');
  const [internal, setInternal] = useState('');

  const calculateGrade = () => {
    const total = Number(assignment) + Number(internal);

    if (total >= 90) return 'A+';
    if (total >= 80) return 'A';
    if (total >= 70) return 'B+';
    if (total >= 60) return 'B';
    if (total >= 50) return 'C';
    return 'F';
  };

  const saveData = () => {
    alert(`Grade: ${calculateGrade()}`);
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>👩‍🏫 Staff Dashboard</h1>

      <div style={cardStyle}>
        <input style={inputStyle} placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
        <input style={inputStyle} placeholder="Roll Number" onChange={(e) => setRollNo(e.target.value)} />
        <input style={inputStyle} placeholder="Attendance %" onChange={(e) => setAttendance(e.target.value)} />
        <input style={inputStyle} placeholder="Assignment Marks" onChange={(e) => setAssignment(e.target.value)} />
        <input style={inputStyle} placeholder="Internal Marks" onChange={(e) => setInternal(e.target.value)} />

        <button style={buttonStyle} onClick={saveData}>
          💾 Save Record
        </button>
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
  width: '400px',
  margin: 'auto',
  padding: '25px',
  borderRadius: '15px',
  background: 'white',
  boxShadow: '0 2px 10px #ccc'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '8px'
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer'
};