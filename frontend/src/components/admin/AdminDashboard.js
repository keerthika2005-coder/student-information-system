import React, { useState, useEffect } from 'react';
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
      console.log(error);
      alert('Failed to fetch students');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>🛠️ Learn Bridge Admin Dashboard</h2>

      {students.length === 0 ? (
        <p>No student data found</p>
      ) : (
        students.map((student) => (
          <div
            key={student._id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              margin: '10px auto',
              width: '60%',
              borderRadius: '10px',
              boxShadow: '0 0 10px #ddd'
            }}
          >
            <p><b>Name:</b> {student.name}</p>
            <p><b>Roll No:</b> {student.rollNumber}</p>
            <p><b>Department:</b> {student.department}</p>
            <p><b>Subject:</b> {student.subject}</p>
          </div>
        ))
      )}
    </div>
  );
}