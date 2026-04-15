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
    } catch {
      alert('Student not found');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h1>🎓 Student Dashboard</h1>

      <input
        placeholder="Enter Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
      />

      <button onClick={fetchStudent}>🔍 View</button>

      {student && (
        <div style={card}>
          <p><b>Name:</b> {student.name}</p>
          <p><b>Subject:</b> {student.subject}</p>
          <p><b>Attendance:</b> {student.attendance}%</p>
          <p><b>Assignment:</b> {student.assignmentMarks}</p>
          <p><b>Internal:</b> {student.internalMarks}</p>
          <p><b>Total:</b> {student.total}</p>
          <p><b>Grade:</b> {student.grade}</p>
        </div>
      )}
    </div>
  );
}

const card = {
  margin: '20px auto',
  padding: '20px',
  width: '60%',
  border: '1px solid #ccc',
  borderRadius: '10px'
};