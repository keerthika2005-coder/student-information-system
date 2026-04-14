import React, { useState } from 'react';

export default function AdminDashboard() {
  const [examDate, setExamDate] = useState('');
  const [hall, setHall] = useState('');

  const scheduleExam = () => {
    alert(
      `Exam Scheduled\nDate: ${examDate}\nHall: ${hall}`
    );
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>
        🛠️ Admin Dashboard
      </h1>

      <input
        type="date"
        onChange={(e) =>
          setExamDate(e.target.value)
        }
        style={inputStyle}
      />

      <input
        placeholder="Hall Number"
        onChange={(e) =>
          setHall(e.target.value)
        }
        style={inputStyle}
      />

      <button
        onClick={scheduleExam}
        style={buttonStyle}
      >
        Conduct Exam
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