import React, { useState } from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://student-information-system-f2js.onrender.com/api'
});

export default function StudentDashboard() {
  const [rollNumber, setRollNumber] = useState('');
  const [student, setStudent] = useState(null);

  const fetchStudent = async () => {
    try {
      const res = await API.get(
        `/student/${rollNumber}`
      );

      setStudent(res.data);
    } catch (error) {
      alert('Student not found');
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>
        🎓 Student Dashboard
      </h1>

      <input
        placeholder="Enter Roll Number"
        value={rollNumber}
        onChange={(e) =>
          setRollNumber(e.target.value)
        }
        style={inputStyle}
      />

      <button
        onClick={fetchStudent}
        style={buttonStyle}
      >
        View Result
      </button>

      {student && (
        <div style={cardStyle}>
          <p>
            <b>Name:</b> {student.name}
          </p>
          <p>
            <b>Roll No:</b>{' '}
            {student.rollNumber}
          </p>
          <p>
            <b>Subject:</b>{' '}
            {student.subject}
          </p>
          <p>
            <b>Marks:</b> {student.marks}
          </p>
          <p>
            <b>Attendance:</b>{' '}
            {student.attendance}%
          </p>
          <p>
            <b>Grade:</b> {student.grade}
          </p>
          <p>
            <b>Exam Date:</b>{' '}
            {student.examDate}
          </p>
        </div>
      )}
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
  padding: '10px 20px',
  marginBottom: '20px'
};

const cardStyle = {
  padding: '20px',
  boxShadow: '0 0 10px #ccc',
  borderRadius: '10px'
};