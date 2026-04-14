import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://student-information-system-f2js.onrender.com/api'
});

API.interceptors.request.use((req) => {
  req.headers['x-auth-token'] =
    localStorage.getItem('token');
  return req;
});

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);
  const [examDate, setExamDate] = useState('');
  const [examHall, setExamHall] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentsRes = await API.get(
        '/admin/students'
      );

      const usersRes = await API.get(
        '/admin/users'
      );

      setStudents(studentsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      alert('Error fetching admin data');
    }
  };

  const deleteStudent = async (id) => {
    try {
      await API.delete(
        `/admin/student/${id}`
      );

      alert('Student deleted');
      fetchData();
    } catch (error) {
      alert('Delete failed');
    }
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/admin/user/${id}`);

      alert('User deleted');
      fetchData();
    } catch (error) {
      alert('Delete failed');
    }
  };

  const conductExam = async () => {
    try {
      await API.post('/admin/conduct-exam', {
        examDate,
        examHall
      });

      alert(
        'Exam scheduled and hall tickets generated'
      );
    } catch (error) {
      alert('Exam schedule failed');
    }
  };

  const generateHallTicket = (student) => {
    alert(
      `🎫 HALL TICKET\n\n` +
        `Name: ${student.name}\n` +
        `Roll No: ${student.rollNumber}\n` +
        `Department: ${student.department}\n` +
        `Exam Date: ${examDate}\n` +
        `Hall: ${examHall}`
    );
  };

  return (
    <div style={containerStyle}>
      <h1>
        🛠️ Learn Bridge Admin Dashboard
      </h1>

      <div style={cardStyle}>
        <h2>📝 Conduct Exam</h2>

        <input
          type="date"
          value={examDate}
          onChange={(e) =>
            setExamDate(e.target.value)
          }
          style={inputStyle}
        />

        <input
          placeholder="Exam Hall"
          value={examHall}
          onChange={(e) =>
            setExamHall(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={conductExam}
          style={buttonStyle}
        >
          Schedule Exam
        </button>
      </div>

      <h2>🎓 Manage Students</h2>

      {students.map((student) => (
        <div
          key={student._id}
          style={cardStyle}
        >
          <p>
            <b>Name:</b> {student.name}
          </p>
          <p>
            <b>Roll No:</b>{' '}
            {student.rollNumber}
          </p>
          <p>
            <b>Department:</b>{' '}
            {student.department}
          </p>

          <button
            onClick={() =>
              generateHallTicket(student)
            }
            style={buttonStyle}
          >
            🎫 Hall Ticket
          </button>

          <button
            onClick={() =>
              deleteStudent(student._id)
            }
            style={deleteButtonStyle}
          >
            ❌ Delete Student
          </button>
        </div>
      ))}

      <h2>👩‍🏫 Manage Staff / Users</h2>

      {users.map((user) => (
        <div
          key={user._id}
          style={cardStyle}
        >
          <p>
            <b>Username:</b>{' '}
            {user.username}
          </p>
          <p>
            <b>Role:</b> {user.role}
          </p>

          <button
            onClick={() =>
              deleteUser(user._id)
            }
            style={deleteButtonStyle}
          >
            ❌ Delete User
          </button>
        </div>
      ))}
    </div>
  );
};

const containerStyle = {
  maxWidth: '1000px',
  margin: 'auto',
  padding: '30px'
};

const cardStyle = {
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '12px',
  boxShadow: '0 0 10px #ccc',
  background: '#fff'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px'
};

const buttonStyle = {
  padding: '10px 20px',
  marginRight: '10px',
  cursor: 'pointer'
};

const deleteButtonStyle = {
  padding: '10px 20px',
  cursor: 'pointer'
};

export default AdminDashboard;