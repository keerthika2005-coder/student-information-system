import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [examDate, setExamDate] = useState('');
  const [hall, setHall] = useState('');

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
      console.log(error);
    }
  };

  const conductExam = () => {
    alert(
      `Exam Scheduled\nDate: ${examDate}\nHall: ${hall}`
    );
  };

  return (
    <div style={container}>
      <h1 style={heading}>🛠️ Admin Dashboard</h1>

      <div style={card}>
        <h3>📝 Conduct Exam</h3>

        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          style={input}
        />

        <input
          placeholder="Hall Number"
          value={hall}
          onChange={(e) => setHall(e.target.value)}
          style={input}
        />

        <button style={button} onClick={conductExam}>
          Conduct Exam
        </button>
      </div>

      <div style={card}>
        <h3>🎓 Student List</h3>

        {students.length === 0 ? (
          <p>No student data found</p>
        ) : (
          students.map((student) => (
            <div key={student._id} style={studentCard}>
              <p><b>Name:</b> {student.name}</p>
              <p><b>Roll No:</b> {student.rollNumber}</p>
              <p><b>Department:</b> {student.department}</p>
              <p><b>Subject:</b> {student.subject}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const container = {
  width: '80%',
  margin: '30px auto',
  textAlign: 'center'
};

const heading = {
  marginBottom: '20px'
};

const card = {
  background: 'white',
  padding: '25px',
  borderRadius: '15px',
  boxShadow: '0 2px 10px #ccc',
  marginBottom: '30px'
};

const input = {
  width: '80%',
  padding: '12px',
  margin: '10px auto',
  display: 'block',
  borderRadius: '8px',
  border: '1px solid #ccc'
};

const button = {
  padding: '12px 20px',
  border: 'none',
  borderRadius: '8px',
  background: '#4CAF50',
  color: 'white',
  cursor: 'pointer'
};

const studentCard = {
  border: '1px solid #ddd',
  padding: '15px',
  margin: '15px auto',
  width: '70%',
  borderRadius: '10px',
  textAlign: 'left'
};