import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        'https://student-information-system-f2js.onrender.com/api/admin/students'
      );
      setStudents(res.data);
    } catch (error) {
      alert('Failed to fetch students');
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>🎓 Learn Bridge - Admin Dashboard</h1>

      <div style={gridStyle}>
        {students.map((student) => (
          <div key={student._id} style={cardStyle}>
            <h3>{student.name}</h3>
            <p><b>Roll No:</b> {student.rollNumber}</p>
            <p><b>Department:</b> {student.department}</p>
            <p><b>Subject:</b> {student.subject}</p>

            <button style={buttonStyle}>✏ Update</button>
            <button style={deleteButtonStyle}>🗑 Delete</button>
          </div>
        ))}
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

const gridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '20px'
};

const cardStyle = {
  width: '280px',
  padding: '20px',
  borderRadius: '15px',
  boxShadow: '0 2px 10px #ccc',
  background: 'white'
};

const buttonStyle = {
  padding: '8px 15px',
  marginRight: '10px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};

const deleteButtonStyle = {
  ...buttonStyle
};