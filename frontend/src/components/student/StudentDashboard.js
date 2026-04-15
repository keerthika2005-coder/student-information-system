import React, { useState } from 'react';
import axios from 'axios';

export default function StudentDashboard() {
  const [rollNumber, setRollNumber] = useState('');
  const [student, setStudent] = useState(null);

  const fetchStudent = async () => {
    try {
      const res = await axios.get(
        `https://student-information-system-f2js.onrender.com/api/student/${rollNumber}`
      );

      setStudent(res.data);
    } catch (error) {
      alert('❌ Student not found');
      setStudent(null);
    }
  };

  return (
    <div style={container}>
      <h1>🎓 Student Dashboard</h1>

      <div style={searchBox}>
        <input
          style={input}
          placeholder="Enter Roll Number"
          value={rollNumber}
          onChange={(e) =>
            setRollNumber(e.target.value)
          }
        />

        <button
          style={button}
          onClick={fetchStudent}
        >
          🔍 View Details
        </button>
      </div>

      {student && (
        <div style={card}>
          <h2>📘 Student Details</h2>

          <p><b>Name:</b> {student.name}</p>
          <p><b>Roll No:</b> {student.rollNumber}</p>
          <p><b>Department:</b> {student.department}</p>
          <p><b>Subject:</b> {student.subject}</p>
          <p><b>Attendance:</b> {student.attendance}%</p>

          <p>
            <b>Assignment Marks:</b>{' '}
            {student.assignmentMarks}
          </p>

          <p>
            <b>Internal Marks:</b>{' '}
            {student.internalMarks}
          </p>

          <p><b>Total:</b> {student.total}</p>
          <p><b>Grade:</b> {student.grade}</p>
        </div>
      )}
    </div>
  );
}

const container = {
  width: '80%',
  margin: '30px auto',
  textAlign: 'center'
};

const searchBox = {
  padding: '25px',
  boxShadow: '0 2px 10px #ccc',
  borderRadius: '15px',
  marginBottom: '30px'
};

const input = {
  width: '60%',
  padding: '12px',
  marginRight: '10px',
  borderRadius: '8px',
  border: '1px solid #ccc'
};

const button = {
  padding: '12px 20px',
  border: 'none',
  borderRadius: '8px',
  background: '#2196F3',
  color: 'white',
  cursor: 'pointer'
};

const card = {
  width: '60%',
  margin: '20px auto',
  padding: '25px',
  border: '1px solid #ddd',
  borderRadius: '15px',
  textAlign: 'left',
  boxShadow: '0 2px 10px #ccc'
};