import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get('https://student-information-system-f2js.onrender.com/api/admin/students')
      .then((res) => {
        console.log("API DATA:", res.data);
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to fetch students');
      });
  }, []);

  return (
    <div style={containerStyle}>
      <h1>🛠️ Admin Dashboard</h1>

      {students.length === 0 ? (
        <h3>No data found</h3>
      ) : (
        students.map((student) => (
          <div key={student._id} style={cardStyle}>
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

const containerStyle = {
  textAlign: 'center',
  padding: '30px'
};

const cardStyle = {
  width: '60%',
  margin: '15px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '10px'
};